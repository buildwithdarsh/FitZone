"use client";

import Image from "next/image";
import { useAsyncData } from "@/lib/hooks";
import { DELAYS } from "@/lib/delay";
import { nutritionData } from "@/lib/mock-data";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { DashboardSkeleton } from "@/components/ui/Skeleton";
import { Utensils, Flame, Beef, Wheat, Droplets, Plus } from "lucide-react";

function MacroRing({ label, current, target, color, icon: Icon }: { label: string; current: number; target: number; color: string; icon: React.ElementType }) {
  const pct = Math.round((current / target) * 100);
  return (
    <div className="text-center">
      <div className="relative h-20 w-20 mx-auto mb-2">
        <svg className="h-20 w-20 -rotate-90" viewBox="0 0 36 36">
          <path d="M18 2.0845a 15.9155 15.9155 0 0 1 0 31.831 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#f3f4f6" strokeWidth="3" />
          <path d="M18 2.0845a 15.9155 15.9155 0 0 1 0 31.831 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke={color} strokeWidth="3" strokeDasharray={`${pct}, 100`} strokeLinecap="round" />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <Icon size={18} style={{ color }} />
        </div>
      </div>
      <div className="text-sm font-bold text-foreground">{current}g</div>
      <div className="text-xs text-muted">/ {target}g {label}</div>
    </div>
  );
}

export default function NutritionPage() {
  const { data, loading } = useAsyncData(async () => {
    await DELAYS.pageLoad();
    return nutritionData;
  }, []);

  if (loading) return <DashboardSkeleton />;
  const d = data!;

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="hidden sm:block text-2xl font-bold text-foreground">Nutrition Tracker</h1>
          <p className="text-sm text-muted mt-1">Diet Plan: <span className="font-medium text-foreground">{d.dietPlan}</span></p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-colors">
          <Plus size={16} /> Log Meal
        </button>
      </div>

      {/* Calorie Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Today&apos;s Overview</CardTitle>
          <Badge variant="warning">{d.dailyTarget.calories - d.todayIntake.calories} cal remaining</Badge>
        </CardHeader>
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="text-center">
            <div className="relative h-32 w-32 mx-auto">
              <svg className="h-32 w-32 -rotate-90" viewBox="0 0 36 36">
                <path d="M18 2.0845a 15.9155 15.9155 0 0 1 0 31.831 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#f3f4f6" strokeWidth="2.5" />
                <path d="M18 2.0845a 15.9155 15.9155 0 0 1 0 31.831 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#6d28d9" strokeWidth="2.5" strokeDasharray={`${Math.round((d.todayIntake.calories / d.dailyTarget.calories) * 100)}, 100`} strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <Flame size={20} className="text-primary mb-1" />
                <div className="text-xl font-bold text-foreground">{d.todayIntake.calories}</div>
                <div className="text-[10px] text-muted">/ {d.dailyTarget.calories} cal</div>
              </div>
            </div>
          </div>
          <div className="flex gap-8">
            <MacroRing label="Protein" current={d.todayIntake.protein} target={d.dailyTarget.protein} color="#6d28d9" icon={Beef} />
            <MacroRing label="Carbs" current={d.todayIntake.carbs} target={d.dailyTarget.carbs} color="#3b82f6" icon={Wheat} />
            <MacroRing label="Fat" current={d.todayIntake.fat} target={d.dailyTarget.fat} color="#f59e0b" icon={Droplets} />
          </div>
        </div>
      </Card>

      {/* Meals */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Today&apos;s Meals</h2>
        {d.meals.map((meal) => {
          const totalCal = meal.items.reduce((s, i) => s + i.calories, 0);
          return (
            <Card key={meal.id} className="fade-in">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Utensils size={16} className="text-primary" />
                  <CardTitle>{meal.name}</CardTitle>
                  <span className="text-xs text-muted">{meal.time}</span>
                </div>
                <span className="text-sm font-bold text-foreground">{totalCal} cal</span>
              </CardHeader>
              <div className="space-y-3">
                {meal.items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-lg overflow-hidden relative shrink-0">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-foreground">{item.name}</div>
                      <div className="text-xs text-muted">{item.calories} cal — P: {item.protein}g · C: {item.carbs}g · F: {item.fat}g</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Weekly Average */}
      <Card>
        <CardHeader>
          <CardTitle>Weekly Average</CardTitle>
        </CardHeader>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <div className="text-xs text-muted mb-1">Calories</div>
            <div className="text-lg font-bold text-foreground">{d.weeklyAverage.calories}</div>
            <ProgressBar value={d.weeklyAverage.calories} max={d.dailyTarget.calories} showPercentage={false} size="sm" color="primary" />
          </div>
          <div>
            <div className="text-xs text-muted mb-1">Protein</div>
            <div className="text-lg font-bold text-foreground">{d.weeklyAverage.protein}g</div>
            <ProgressBar value={d.weeklyAverage.protein} max={d.dailyTarget.protein} showPercentage={false} size="sm" color="success" />
          </div>
          <div>
            <div className="text-xs text-muted mb-1">Carbs</div>
            <div className="text-lg font-bold text-foreground">{d.weeklyAverage.carbs}g</div>
            <ProgressBar value={d.weeklyAverage.carbs} max={d.dailyTarget.carbs} showPercentage={false} size="sm" color="info" />
          </div>
          <div>
            <div className="text-xs text-muted mb-1">Fat</div>
            <div className="text-lg font-bold text-foreground">{d.weeklyAverage.fat}g</div>
            <ProgressBar value={d.weeklyAverage.fat} max={d.dailyTarget.fat} showPercentage={false} size="sm" color="warning" />
          </div>
        </div>
      </Card>
    </div>
  );
}

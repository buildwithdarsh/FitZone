"use client";

import Image from "next/image";
import { useAsyncData } from "@/lib/hooks";
import { DELAYS } from "@/lib/delay";
import { workoutPlans, exercises } from "@/lib/mock-data";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { DashboardSkeleton } from "@/components/ui/Skeleton";
import { ClipboardList, Dumbbell, Calendar, Plus, Users, Copy } from "lucide-react";

export default function PlansPage() {
  const { data, loading } = useAsyncData(async () => {
    await DELAYS.pageLoad();
    return workoutPlans;
  }, []);

  if (loading) return <DashboardSkeleton />;

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="hidden sm:block text-2xl font-bold text-foreground">Workout Plans</h1>
          <p className="text-sm text-muted mt-1">Create, assign, and manage client workout plans</p>
        </div>
        <button className="h-9 px-4 rounded-lg bg-primary text-sm text-white font-medium hover:bg-primary-dark transition-colors flex items-center gap-2">
          <Plus size={14} /> Create Plan
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data!.map((plan) => (
          <Card key={plan.id} hover className="fade-in">
            <div className="flex items-start gap-4">
              <div className="h-16 w-16 rounded-xl overflow-hidden relative shrink-0">
                <Image src={plan.image} alt={plan.name} fill className="object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-foreground">{plan.name}</h3>
                <p className="text-xs text-muted mt-1 line-clamp-2">{plan.description}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge variant="primary">{plan.goal}</Badge>
                  <Badge variant="default">{plan.difficulty}</Badge>
                  <Badge variant="default"><Calendar size={10} /> {plan.duration}</Badge>
                  <Badge variant="default"><Dumbbell size={10} /> {plan.daysPerWeek}x/week</Badge>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-border">
              <div className="text-xs text-muted mb-2">{plan.days.length} training days:</div>
              <div className="flex flex-wrap gap-1.5">
                {plan.days.map((d) => (
                  <span key={d.day} className="text-[10px] px-2 py-1 rounded bg-surface text-foreground font-medium">
                    {d.day}: {d.name} ({d.exercises.length} exercises)
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-3 flex gap-2">
              <button className="flex-1 h-9 rounded-lg bg-primary text-white text-xs font-medium hover:bg-primary-dark transition-colors flex items-center justify-center gap-1.5">
                <Users size={12} /> Assign to Client
              </button>
              <button className="h-9 px-3 rounded-lg bg-surface text-foreground text-xs font-medium hover:bg-surface-hover transition-colors flex items-center gap-1.5">
                <Copy size={12} /> Duplicate
              </button>
            </div>
          </Card>
        ))}
      </div>

      {/* Templates */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Templates</CardTitle>
        </CardHeader>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { name: "Beginner Full Body", goal: "General Fitness", days: 3 },
            { name: "PPL Split", goal: "Muscle Gain", days: 6 },
            { name: "HIIT Fat Burner", goal: "Fat Loss", days: 4 },
            { name: "5x5 Strength", goal: "Strength", days: 3 },
            { name: "Upper/Lower", goal: "Muscle Gain", days: 4 },
            { name: "Cardio + Core", goal: "Endurance", days: 5 },
            { name: "Yoga Flow", goal: "Flexibility", days: 5 },
            { name: "Post-Injury Rehab", goal: "Recovery", days: 3 },
          ].map((t) => (
            <div key={t.name} className="p-3 rounded-xl border border-border hover:border-primary/30 hover:bg-primary/5 transition-colors cursor-pointer">
              <ClipboardList size={16} className="text-primary mb-2" />
              <div className="text-sm font-medium text-foreground">{t.name}</div>
              <div className="text-xs text-muted">{t.goal} — {t.days}x/week</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

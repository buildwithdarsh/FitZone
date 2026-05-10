"use client";

import { useAsyncData, useLazyLoad } from "@/lib/hooks";
import { DELAYS } from "@/lib/delay";
import { bodyMetrics, currentMember } from "@/lib/mock-data";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { DashboardSkeleton, Skeleton } from "@/components/ui/Skeleton";
import { TrendingDown, TrendingUp, Scale, Ruler, Activity, Target, Camera } from "lucide-react";

function WeightChart() {
  const weights = bodyMetrics.weightHistory;
  const min = Math.min(...weights.map((w) => w.value));
  const max = Math.max(...weights.map((w) => w.value));
  const range = max - min || 1;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Weight Trend</CardTitle>
        <Badge variant="success"><TrendingDown size={12} /> {(weights[0].value - weights[weights.length - 1].value).toFixed(1)} kg lost</Badge>
      </CardHeader>
      <div className="flex items-end gap-1.5 h-40 mt-4">
        {weights.map((w, i) => {
          const height = ((w.value - min) / range) * 100;
          const isLatest = i === weights.length - 1;
          return (
            <div key={i} className="flex-1 flex flex-col items-center gap-1 group relative">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-foreground text-white text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {w.value} kg
              </div>
              <div
                className={`w-full rounded-t transition-colors ${isLatest ? "bg-primary" : "bg-primary/30 hover:bg-primary/50"}`}
                style={{ height: `${Math.max(8, height)}%` }}
              />
              <span className="text-[8px] text-muted">{w.date.slice(5)}</span>
            </div>
          );
        })}
      </div>
      {/* Goal line */}
      <div className="flex items-center gap-2 mt-4 pt-3 border-t border-border">
        <Target size={14} className="text-success" />
        <span className="text-xs text-muted">Goal: {currentMember.targetWeight} kg — Current: {weights[weights.length - 1].value} kg — Remaining: {(weights[weights.length - 1].value - currentMember.targetWeight).toFixed(1)} kg</span>
      </div>
    </Card>
  );
}

function BodyFatChart() {
  const bfHistory = bodyMetrics.bodyFatHistory;
  return (
    <Card>
      <CardHeader>
        <CardTitle>Body Fat %</CardTitle>
        <Badge variant="success"><TrendingDown size={12} /> {(bfHistory[0].value - bfHistory[bfHistory.length - 1].value).toFixed(1)}% down</Badge>
      </CardHeader>
      <div className="text-3xl font-bold text-foreground">{bfHistory[bfHistory.length - 1].value}%</div>
      <div className="text-xs text-muted mb-4">Started at {bfHistory[0].value}%</div>
      <div className="space-y-2">
        {bfHistory.map((bf, i) => (
          <div key={i} className="flex items-center gap-3">
            <span className="text-xs text-muted w-20">{bf.date}</span>
            <ProgressBar value={30 - bf.value} max={15} showPercentage={false} size="sm" color="info" className="flex-1" />
            <span className="text-xs font-medium text-foreground w-12 text-right">{bf.value}%</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

function MeasurementsSection() {
  const { data, loading } = useLazyLoad(async () => {
    await DELAYS.slowSection();
    return bodyMetrics.measurements;
  }, []);

  if (loading) return <Skeleton variant="chart" />;

  const measurements = data!;

  return (
    <Card className="fade-in">
      <CardHeader>
        <CardTitle>Body Measurements (cm)</CardTitle>
        <Badge variant="default"><Ruler size={12} /> Last updated: Mar 2026</Badge>
      </CardHeader>
      <div className="space-y-4">
        {Object.entries(measurements).map(([key, values]) => {
          const first = values[0].value;
          const last = values[values.length - 1].value;
          const diff = last - first;
          const isGain = diff > 0;
          const isWaistOrHip = key === "waist" || key === "hips";
          const isPositive = isWaistOrHip ? !isGain : isGain;

          return (
            <div key={key} className="flex items-center gap-4">
              <span className="text-sm font-medium text-foreground capitalize w-16">{key}</span>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-muted">{first} cm → {last} cm</span>
                  <span className={`text-xs font-medium flex items-center gap-1 ${isPositive ? "text-success" : "text-danger"}`}>
                    {isGain ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                    {isGain ? "+" : ""}{diff} cm
                  </span>
                </div>
                <div className="h-2 bg-surface rounded-full overflow-hidden">
                  <div className="h-full bg-primary/60 rounded-full" style={{ width: `${(last / 120) * 100}%` }} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

function BodyComposition() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Body Composition</CardTitle>
      </CardHeader>
      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="p-3 rounded-xl bg-surface">
          <Activity size={20} className="mx-auto text-info mb-2" />
          <div className="text-lg font-bold text-foreground">{bodyMetrics.bmi}</div>
          <div className="text-xs text-muted">BMI</div>
          <Badge variant="warning" className="mt-1">Overweight</Badge>
        </div>
        <div className="p-3 rounded-xl bg-surface">
          <Scale size={20} className="mx-auto text-primary mb-2" />
          <div className="text-lg font-bold text-foreground">{bodyMetrics.muscleMass} kg</div>
          <div className="text-xs text-muted">Muscle Mass</div>
          <Badge variant="success" className="mt-1">Good</Badge>
        </div>
        <div className="p-3 rounded-xl bg-surface">
          <Activity size={20} className="mx-auto text-warning mb-2" />
          <div className="text-lg font-bold text-foreground">{bodyMetrics.bmr}</div>
          <div className="text-xs text-muted">BMR (kcal)</div>
          <Badge variant="info" className="mt-1">Normal</Badge>
        </div>
      </div>
    </Card>
  );
}

function PersonalRecords() {
  const prs = currentMember.personalRecords;
  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Records</CardTitle>
        <Badge variant="warning">🏆 PRs</Badge>
      </CardHeader>
      <div className="space-y-3">
        {Object.entries(prs).map(([exercise, weight]) => (
          <div key={exercise} className="flex items-center justify-between p-3 rounded-lg bg-surface">
            <span className="text-sm font-medium text-foreground capitalize">{exercise.replace(/([A-Z])/g, " $1").trim()}</span>
            <span className="text-lg font-bold text-primary">{weight} kg</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

function ProgressPhotos() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Progress Photos</CardTitle>
        <button className="text-xs text-primary font-medium flex items-center gap-1"><Camera size={12} /> Add Photo</button>
      </CardHeader>
      <div className="text-center py-8">
        <Camera size={40} className="mx-auto text-muted mb-3" />
        <p className="text-sm text-muted">Take your first progress photo to start tracking your transformation visually.</p>
        <button className="mt-4 px-6 py-2 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-colors">
          Take Photo
        </button>
      </div>
    </Card>
  );
}

export default function ProgressPage() {
  const { loading } = useAsyncData(async () => {
    await DELAYS.pageLoad();
    return true;
  }, []);

  if (loading) return <DashboardSkeleton />;

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h1 className="hidden sm:block text-2xl font-bold text-foreground">Progress Tracker</h1>
        <p className="text-sm text-muted mt-1">Monitor your body transformation journey</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <WeightChart />
        <BodyFatChart />
      </div>

      <BodyComposition />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MeasurementsSection />
        <div className="space-y-6">
          <PersonalRecords />
          <ProgressPhotos />
        </div>
      </div>
    </div>
  );
}

"use client";

import Image from "next/image";
import { useState } from "react";
import { useAsyncData } from "@/lib/hooks";
import { DELAYS } from "@/lib/delay";
import { workoutPlans, exercises } from "@/lib/mock-data";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Tabs } from "@/components/ui/Tabs";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { DashboardSkeleton } from "@/components/ui/Skeleton";
import { Dumbbell, Clock, Calendar, ChevronDown, ChevronUp, Play, CheckCircle2 } from "lucide-react";

function ExerciseRow({ ex, index }: { ex: { exerciseId: string; sets: number; reps: string; rest: string }; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const exercise = exercises.find((e) => e.id === ex.exerciseId);
  if (!exercise) return null;

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <button onClick={() => setExpanded(!expanded)} className="w-full flex items-center gap-3 p-3 hover:bg-surface transition-colors text-left">
        <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-sm font-bold text-primary shrink-0">{index + 1}</div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium text-foreground">{exercise.name}</div>
          <div className="text-xs text-muted">{exercise.muscleGroup} — {exercise.equipment}</div>
        </div>
        <div className="text-right shrink-0 mr-2">
          <div className="text-xs font-medium text-foreground">{ex.sets} × {ex.reps}</div>
          <div className="text-[10px] text-muted">Rest {ex.rest}</div>
        </div>
        {expanded ? <ChevronUp size={16} className="text-muted" /> : <ChevronDown size={16} className="text-muted" />}
      </button>
      {expanded && (
        <div className="p-3 border-t border-border bg-surface/50 fade-in">
          <div className="flex gap-4">
            <div className="h-24 w-32 rounded-lg overflow-hidden relative shrink-0">
              <Image src={exercise.image} alt={exercise.name} fill className="object-cover" />
            </div>
            <div className="space-y-2 flex-1">
              <Badge variant={exercise.difficulty === "Beginner" ? "success" : exercise.difficulty === "Intermediate" ? "warning" : "danger"}>{exercise.difficulty}</Badge>
              <div className="text-xs text-muted">Equipment: {exercise.equipment}</div>
              <div className="text-xs text-muted">Target: {exercise.muscleGroup}</div>
              {/* Simulated log */}
              <div className="mt-2 grid grid-cols-4 gap-2 text-xs">
                <div className="font-medium text-muted">Set</div>
                <div className="font-medium text-muted">Weight</div>
                <div className="font-medium text-muted">Reps</div>
                <div className="font-medium text-muted">Done</div>
                {Array.from({ length: ex.sets }).map((_, i) => (
                  <div key={i} className="contents">
                    <div className="text-foreground">{i + 1}</div>
                    <div className="text-foreground">{60 + i * 5} kg</div>
                    <div className="text-foreground">{ex.reps}</div>
                    <CheckCircle2 size={14} className="text-success" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function WorkoutPlanCard({ plan }: { plan: typeof workoutPlans[0] }) {
  const [selectedDay, setSelectedDay] = useState(0);

  return (
    <Card className="fade-in">
      <div className="flex items-start gap-4 mb-4">
        <div className="h-16 w-16 rounded-xl overflow-hidden relative shrink-0">
          <Image src={plan.image} alt={plan.name} fill className="object-cover" />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-foreground text-lg">{plan.name}</h3>
          <p className="text-sm text-muted mt-1">{plan.description}</p>
          <div className="flex flex-wrap gap-2 mt-2">
            <Badge variant="primary">{plan.goal}</Badge>
            <Badge variant="default">{plan.difficulty}</Badge>
            <Badge variant="default"><Calendar size={10} /> {plan.duration}</Badge>
            <Badge variant="default"><Dumbbell size={10} /> {plan.daysPerWeek} days/week</Badge>
          </div>
        </div>
      </div>

      <div className="flex gap-2 mb-4 overflow-x-auto scrollbar-hide pb-1">
        {plan.days.map((day, i) => (
          <button
            key={i}
            onClick={() => setSelectedDay(i)}
            className={`px-4 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
              selectedDay === i ? "bg-primary text-white" : "bg-surface text-muted hover:text-foreground"
            }`}
          >
            {day.day} — {day.name}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {plan.days[selectedDay]?.exercises.map((ex, i) => (
          <ExerciseRow key={i} ex={ex} index={i} />
        ))}
      </div>

      <button className="mt-4 w-full h-11 rounded-xl bg-primary text-white font-semibold flex items-center justify-center gap-2 hover:bg-primary-dark transition-colors">
        <Play size={16} /> Start Workout
      </button>
    </Card>
  );
}

function ExerciseLibrary() {
  const grouped = exercises.reduce<Record<string, typeof exercises>>((acc, ex) => {
    (acc[ex.muscleGroup] ??= []).push(ex);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      {Object.entries(grouped).map(([group, exs]) => (
        <Card key={group}>
          <CardHeader>
            <CardTitle>{group}</CardTitle>
            <Badge variant="default">{exs.length} exercises</Badge>
          </CardHeader>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {exs.map((ex) => (
              <div key={ex.id} className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-surface transition-colors">
                <div className="h-12 w-12 rounded-lg overflow-hidden relative shrink-0">
                  <Image src={ex.image} alt={ex.name} fill className="object-cover" />
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">{ex.name}</div>
                  <div className="text-xs text-muted">{ex.equipment}</div>
                  <Badge variant={ex.difficulty === "Beginner" ? "success" : ex.difficulty === "Intermediate" ? "warning" : "danger"} className="mt-1">{ex.difficulty}</Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
}

export default function WorkoutsPage() {
  const { data, loading } = useAsyncData(async () => {
    await DELAYS.pageLoad();
    return workoutPlans;
  }, []);

  if (loading) return <DashboardSkeleton />;

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h1 className="hidden sm:block text-2xl font-bold text-foreground">My Workouts</h1>
        <p className="text-sm text-muted mt-1">Follow your plan, log your sets, crush your goals</p>
      </div>
      <Tabs
        tabs={[
          {
            id: "plans",
            label: "My Plans",
            count: data?.length,
            content: (
              <div className="space-y-6">
                {data?.map((plan) => <WorkoutPlanCard key={plan.id} plan={plan} />)}
              </div>
            ),
          },
          { id: "library", label: "Exercise Library", count: exercises.length, content: <ExerciseLibrary /> },
          {
            id: "history",
            label: "Workout History",
            content: (
              <Card>
                <div className="text-center py-12">
                  <Clock size={40} className="mx-auto text-muted mb-3" />
                  <h3 className="font-semibold text-foreground">Workout History</h3>
                  <p className="text-sm text-muted mt-1">Your last 156 workouts are logged here</p>
                  <div className="mt-4 space-y-2 max-w-md mx-auto">
                    {["Mar 26 — Lower B — 52 min", "Mar 25 — Upper B — 48 min", "Mar 24 — Rest Day", "Mar 23 — Lower A — 55 min", "Mar 22 — Upper A — 50 min"].map((w, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-surface text-sm">
                        <span className="text-foreground">{w}</span>
                        <CheckCircle2 size={16} className="text-success" />
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            ),
          },
        ]}
      />
    </div>
  );
}

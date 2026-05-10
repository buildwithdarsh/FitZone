"use client";

import Image from "next/image";
import Link from "next/link";
import { useAsyncData, useLazyLoad } from "@/lib/hooks";
import { DELAYS } from "@/lib/delay";
import { currentMember, classes, workoutPlans, bodyMetrics, badges, leaderboard, notifications } from "@/lib/mock-data";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { StatCard } from "@/components/ui/StatCard";
import { DashboardSkeleton, Skeleton } from "@/components/ui/Skeleton";
import {
  Flame, Dumbbell, CalendarDays, TrendingDown, Target, Trophy,
  ChevronRight, Users, Zap, QrCode, Calendar, Play,
} from "lucide-react";

function QuickStats() {
  const { data, loading } = useAsyncData(async () => {
    await DELAYS.pageLoad();
    return currentMember;
  }, []);

  if (loading) return <DashboardSkeleton />;

  const m = data!;
  return (
    <div className="space-y-4 sm:space-y-6 fade-in">
      {/* Welcome — compact on mobile */}
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <h1 className="text-lg sm:text-2xl font-bold text-foreground truncate">Hey, {m.name.split(" ")[0]}! 💪</h1>
          <p className="text-xs text-muted mt-0.5">{m.streak}-day streak — {m.totalWorkouts} total workouts</p>
        </div>
        <Link href="/member/membership" className="h-10 w-10 sm:h-auto sm:w-auto sm:px-4 sm:py-2.5 rounded-xl bg-primary text-white flex items-center justify-center gap-2 shrink-0 active:scale-95 transition-all">
          <QrCode size={18} />
          <span className="hidden sm:inline text-sm font-medium">QR Check-in</span>
        </Link>
      </div>

      {/* Stats — horizontal scroll on mobile, grid on desktop */}
      <div className="flex gap-3 overflow-x-auto scrollbar-hide snap-x -mx-3 px-3 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-4 scroll-fade-r sm:[mask-image:none]">
        <div className="min-w-[160px] sm:min-w-0 snap-start"><StatCard label="Streak" value={`${m.streak} days`} icon={Flame} iconColor="warning" trend={20} trendLabel="vs last month" /></div>
        <div className="min-w-[160px] sm:min-w-0 snap-start"><StatCard label="Workouts" value={m.totalWorkouts} icon={Dumbbell} iconColor="primary" trend={12} trendLabel="this month" /></div>
        <div className="min-w-[160px] sm:min-w-0 snap-start"><StatCard label="Calories" value={m.caloriesBurnedThisWeek.toLocaleString()} icon={Zap} iconColor="danger" trendLabel="this week" /></div>
        <div className="min-w-[160px] sm:min-w-0 snap-start"><StatCard label="Classes" value={`${m.classesThisMonth}/mo`} icon={CalendarDays} iconColor="info" /></div>
      </div>
    </div>
  );
}

function TodayWorkout() {
  const { data, loading } = useLazyLoad(async () => {
    await DELAYS.lazySection();
    return workoutPlans[0].days[0];
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Today&apos;s Workout</CardTitle>
        <Badge variant="primary">Upper A</Badge>
      </CardHeader>
      {loading ? (
        <div className="space-y-2">
          {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} variant="table-row" />)}
        </div>
      ) : (
        <div className="space-y-2">
          {data?.exercises.map((ex, i) => {
            const exercise = exerciseName(ex.exerciseId);
            return (
              <div key={i} className="flex items-center gap-3 p-2.5 sm:p-3 rounded-lg bg-surface active:bg-surface-hover transition-colors">
                <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-sm font-bold text-primary shrink-0">{i + 1}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-foreground truncate">{exercise}</div>
                  <div className="text-xs text-muted">{ex.sets} × {ex.reps} — {ex.rest}</div>
                </div>
              </div>
            );
          })}
          <Link href="/member/workouts" className="flex items-center justify-center gap-2 h-11 rounded-xl bg-primary text-white text-sm font-semibold mt-2 active:scale-[0.98] transition-all">
            <Play size={16} /> Start Workout
          </Link>
        </div>
      )}
    </Card>
  );
}

function UpcomingClasses() {
  const { data, loading } = useLazyLoad(async () => {
    await DELAYS.lazySection();
    return classes.filter((c) => c.gymId === "gym-1").slice(0, 3);
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Classes</CardTitle>
        <Link href="/member/classes" className="text-xs text-primary font-medium">View All</Link>
      </CardHeader>
      {loading ? (
        <div className="space-y-2">
          {Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} variant="table-row" />)}
        </div>
      ) : (
        <div className="space-y-1">
          {data?.map((cls) => (
            <div key={cls.id} className="flex items-center gap-3 p-2.5 rounded-xl active:bg-surface transition-colors">
              <div className="h-11 w-11 rounded-xl overflow-hidden shrink-0 relative">
                <Image src={cls.image} alt={cls.name} fill className="object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-foreground truncate">{cls.name}</div>
                <div className="text-xs text-muted">{cls.trainer}</div>
              </div>
              <div className="text-right shrink-0">
                <div className="text-xs font-semibold text-foreground">{cls.time}</div>
                <div className="text-[10px] text-muted">{cls.day.split(",")[0]}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}

function WeightProgress() {
  const weights = bodyMetrics.weightHistory;
  const first = weights[0].value;
  const last = weights[weights.length - 1].value;
  const lost = (first - last).toFixed(1);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Weight</CardTitle>
        <Badge variant="success"><TrendingDown size={12} /> {lost} kg</Badge>
      </CardHeader>
      <div className="space-y-3">
        <div className="flex items-end justify-between">
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-foreground">{last} kg</div>
            <div className="text-[10px] sm:text-xs text-muted">Goal: {currentMember.targetWeight} kg</div>
          </div>
          <div className="text-right">
            <div className="text-[10px] text-muted">Started</div>
            <div className="text-sm font-medium text-foreground">{first} kg</div>
          </div>
        </div>
        <ProgressBar value={first - last} max={first - currentMember.targetWeight} label="To goal" color="success" />
        {/* Sparkline */}
        <div className="flex items-end gap-0.5 sm:gap-1 h-14 sm:h-16">
          {weights.map((w, i) => {
            const min = Math.min(...weights.map((x) => x.value));
            const max = Math.max(...weights.map((x) => x.value));
            const height = max === min ? 50 : ((w.value - min) / (max - min)) * 100;
            return (
              <div key={i} className="flex-1 rounded-t bg-primary/20 hover:bg-primary/40 transition-colors" style={{ height: `${Math.max(8, 100 - height)}%` }} />
            );
          })}
        </div>
      </div>
    </Card>
  );
}

function BadgesSection() {
  const { data, loading } = useLazyLoad(async () => {
    await DELAYS.slowSection();
    return badges;
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Badges</CardTitle>
        <Link href="/member/challenges" className="text-xs text-primary font-medium">All</Link>
      </CardHeader>
      {loading ? (
        <div className="grid grid-cols-4 gap-2">
          {Array.from({ length: 8 }).map((_, i) => <Skeleton key={i} variant="avatar" className="h-12 w-12 mx-auto" />)}
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-2">
          {data?.map((b) => (
            <div key={b.id} className={`flex flex-col items-center gap-0.5 p-1.5 sm:p-2 rounded-xl transition-all ${b.earned ? "bg-surface active:bg-surface-hover" : "opacity-30"}`}>
              <span className="text-xl sm:text-2xl">{b.icon}</span>
              <span className="text-[9px] sm:text-[10px] text-center font-medium text-foreground leading-tight line-clamp-1">{b.name}</span>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}

function LeaderboardWidget() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Leaderboard</CardTitle>
        <Badge variant="primary"><Trophy size={10} /> Mar</Badge>
      </CardHeader>
      <div className="space-y-1">
        {leaderboard.slice(0, 5).map((entry) => {
          const isMe = entry.memberId === "member-1";
          return (
            <div key={entry.rank} className={`flex items-center gap-2.5 p-2 rounded-xl transition-colors ${isMe ? "bg-primary/5 ring-1 ring-primary/20" : "active:bg-surface"}`}>
              <div className={`h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${entry.rank <= 3 ? "bg-amber-100 text-amber-700" : "bg-surface text-muted"}`}>
                {entry.rank}
              </div>
              <div className="h-7 w-7 rounded-full overflow-hidden relative shrink-0">
                <Image src={entry.avatar} alt={entry.name} fill className="object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs sm:text-sm font-medium text-foreground truncate">
                  {entry.name} {isMe && <span className="text-primary text-[10px]">(You)</span>}
                </div>
              </div>
              <div className="text-sm font-bold text-foreground tabular-nums">{entry.score}</div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

function RecentNotifications() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Activity</CardTitle>
        <Link href="/member/notifications" className="text-xs text-primary font-medium">All</Link>
      </CardHeader>
      <div className="space-y-1">
        {notifications.slice(0, 4).map((n) => (
          <div key={n.id} className={`flex items-start gap-2.5 p-2.5 rounded-xl transition-colors active:bg-surface ${!n.read ? "bg-primary/5" : ""}`}>
            <div className="h-8 w-8 rounded-xl bg-surface flex items-center justify-center shrink-0">
              {n.type === "class" && <Calendar size={14} className="text-info" />}
              {n.type === "milestone" && <Flame size={14} className="text-warning" />}
              {n.type === "plan" && <Dumbbell size={14} className="text-primary" />}
              {n.type === "payment" && <Target size={14} className="text-success" />}
              {n.type === "achievement" && <Trophy size={14} className="text-amber-500" />}
              {n.type === "social" && <Users size={14} className="text-info" />}
              {n.type === "offer" && <Zap size={14} className="text-danger" />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs sm:text-sm font-medium text-foreground">{n.title}</div>
              <div className="text-[10px] sm:text-xs text-muted mt-0.5 line-clamp-1">{n.message}</div>
            </div>
            <span className="text-[9px] sm:text-[10px] text-muted whitespace-nowrap shrink-0 mt-0.5">{n.time}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

function exerciseName(id: string): string {
  const map: Record<string, string> = {
    "ex-1": "Barbell Bench Press", "ex-14": "Barbell Row",
    "ex-4": "Overhead Press", "ex-6": "Dumbbell Curl", "ex-7": "Tricep Dips",
  };
  return map[id] || "Exercise";
}

export default function MemberDashboard() {
  return (
    <div className="space-y-4 sm:space-y-6">
      <QuickStats />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          <TodayWorkout />
          <UpcomingClasses />
          <RecentNotifications />
        </div>
        <div className="space-y-4 sm:space-y-6">
          <WeightProgress />
          <BadgesSection />
          <LeaderboardWidget />
        </div>
      </div>
    </div>
  );
}

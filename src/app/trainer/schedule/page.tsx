"use client";

import { useAsyncData } from "@/lib/hooks";
import { DELAYS } from "@/lib/delay";
import { trainerSchedule } from "@/lib/mock-data";
import { Card } from "@/components/ui/Card";
import { Badge, StatusBadge } from "@/components/ui/Badge";
import { Tabs } from "@/components/ui/Tabs";
import { DashboardSkeleton } from "@/components/ui/Skeleton";
import { Clock, Calendar, CheckCircle } from "lucide-react";

function ScheduleList({ sessions }: { sessions: typeof trainerSchedule }) {
  if (sessions.length === 0) {
    return <div className="text-center py-12 text-sm text-muted">No sessions scheduled</div>;
  }

  return (
    <div className="space-y-2">
      {sessions.map((s) => (
        <div key={s.id} className="p-3 sm:p-4 rounded-lg border border-border hover:bg-surface/50 transition-colors">
          {/* Mobile layout */}
          <div className="sm:hidden space-y-2">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <Clock size={14} className="text-muted shrink-0" />
                <span className="text-sm font-bold text-foreground">{s.time}</span>
                <span className="text-xs text-muted">· {s.duration}min</span>
              </div>
              <StatusBadge status={s.status} />
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-semibold text-foreground">
                {s.type === "PT Session" ? s.client : s.class}
              </span>
              <Badge variant={s.type === "PT Session" ? "primary" : "info"}>{s.type}</Badge>
            </div>
            {s.type === "Group Class" && (
              <p className="text-xs text-muted">{s.participants} participants</p>
            )}
            {s.notes && <p className="text-xs text-muted italic line-clamp-2">📝 {s.notes}</p>}
            {s.status === "Upcoming" && (
              <button className="w-full h-8 rounded-lg bg-success text-white text-xs font-medium hover:bg-success/80 transition-colors flex items-center justify-center gap-1 mt-1">
                <CheckCircle size={12} /> Start Session
              </button>
            )}
          </div>

          {/* Desktop layout */}
          <div className="hidden sm:flex items-center gap-4">
            <div className="text-center shrink-0 w-16">
              <div className="text-sm font-bold text-foreground">{s.time}</div>
              <div className="text-xs text-muted">{s.duration} min</div>
            </div>
            <div className="w-px h-10 bg-border" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-foreground">
                  {s.type === "PT Session" ? s.client : s.class}
                </span>
                <Badge variant={s.type === "PT Session" ? "primary" : "info"}>{s.type}</Badge>
              </div>
              <div className="text-xs text-muted mt-0.5">
                {s.date} {s.type === "Group Class" && `— ${s.participants} participants`}
              </div>
              {s.notes && <div className="text-xs text-muted mt-1 italic">📝 {s.notes}</div>}
            </div>
            <StatusBadge status={s.status} />
            {s.status === "Upcoming" && (
              <button className="h-8 px-3 rounded-lg bg-success text-white text-xs font-medium hover:bg-success/80 transition-colors flex items-center gap-1 shrink-0">
                <CheckCircle size={12} /> Start
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function SchedulePage() {
  const { data, loading } = useAsyncData(async () => {
    await DELAYS.pageLoad();
    return trainerSchedule;
  }, []);

  if (loading) return <DashboardSkeleton />;

  const today = data!.filter((s) => s.date === "2026-03-27");
  const tomorrow = data!.filter((s) => s.date === "2026-03-28");
  const completed = data!.filter((s) => s.status === "Completed");

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="hidden sm:block text-2xl font-bold text-foreground">Schedule</h1>
          <p className="text-sm text-muted mt-1">{data!.filter((s) => s.status !== "Completed").length} upcoming sessions</p>
        </div>
        <button className="h-9 px-4 rounded-lg bg-primary text-sm text-white font-medium hover:bg-primary-dark transition-colors flex items-center gap-2 shrink-0">
          <Calendar size={14} /> <span className="hidden sm:inline">Block Time</span><span className="sm:hidden">Block</span>
        </button>
      </div>

      <div className="grid grid-cols-3 gap-2 sm:gap-4">
        <Card className="text-center">
          <div className="text-xl sm:text-2xl font-bold text-foreground">{today.length}</div>
          <div className="text-[11px] sm:text-xs text-muted">Today</div>
        </Card>
        <Card className="text-center">
          <div className="text-xl sm:text-2xl font-bold text-foreground">{tomorrow.length}</div>
          <div className="text-[11px] sm:text-xs text-muted">Tomorrow</div>
        </Card>
        <Card className="text-center">
          <div className="text-xl sm:text-2xl font-bold text-foreground">{data!.filter((s) => s.type === "PT Session").length}</div>
          <div className="text-[11px] sm:text-xs text-muted">PT Sessions</div>
        </Card>
      </div>

      <Tabs
        tabs={[
          { id: "today", label: "Today", count: today.length, content: <ScheduleList sessions={today} /> },
          { id: "tomorrow", label: "Tomorrow", count: tomorrow.length, content: <ScheduleList sessions={tomorrow} /> },
          { id: "completed", label: "Completed", count: completed.length, content: <ScheduleList sessions={completed} /> },
        ]}
      />
    </div>
  );
}

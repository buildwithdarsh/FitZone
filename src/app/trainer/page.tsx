"use client";

import Image from "next/image";
import Link from "next/link";
import { useAsyncData, useLazyLoad } from "@/lib/hooks";
import { DELAYS } from "@/lib/delay";
import { trainers, trainerEarnings, trainerSchedule, trainerClientNotes, members } from "@/lib/mock-data";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge, StatusBadge } from "@/components/ui/Badge";
import { StatCard } from "@/components/ui/StatCard";
import { DashboardSkeleton, Skeleton } from "@/components/ui/Skeleton";
import {
  Users, IndianRupee, CalendarDays, Star, Clock,
  ChevronRight, MessageSquare, TrendingUp,
} from "lucide-react";

const trainer = trainers[0]; // Coach Arjun

function TrainerStats() {
  const { data, loading } = useAsyncData(async () => {
    await DELAYS.pageLoad();
    return { trainer, earnings: trainerEarnings };
  }, []);

  if (loading) return <DashboardSkeleton />;
  const { trainer: t, earnings: e } = data!;

  return (
    <div className="space-y-4 sm:space-y-6 fade-in">
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-full overflow-hidden relative shrink-0 ring-2 ring-primary/20">
          <Image src={t.avatar} alt={t.name} fill className="object-cover" />
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="text-lg sm:text-2xl font-bold text-foreground truncate">Hey, {t.name.split(" ").pop()}!</h1>
          <p className="text-xs sm:text-sm text-muted truncate">{t.gym}</p>
        </div>
        <div className="flex items-center gap-1 shrink-0 bg-amber-50 px-2 py-1 rounded-lg">
          <Star size={14} className="text-amber-400 fill-amber-400" />
          <span className="text-sm font-bold text-foreground">{t.rating}</span>
        </div>
      </div>

      {/* Stats — horizontal scroll on mobile */}
      <div className="flex gap-3 overflow-x-auto scrollbar-hide snap-x -mx-3 px-3 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-4 scroll-fade-r sm:[mask-image:none]">
        <div className="min-w-[155px] sm:min-w-0 snap-start"><StatCard label="Clients" value={t.clients} icon={Users} iconColor="primary" /></div>
        <div className="min-w-[155px] sm:min-w-0 snap-start"><StatCard label="Sessions" value={e.currentMonth.totalSessions} trend={8} icon={CalendarDays} iconColor="info" /></div>
        <div className="min-w-[155px] sm:min-w-0 snap-start"><StatCard label="Earnings" value={`₹${(e.currentMonth.totalEarnings / 1000).toFixed(1)}K`} trend={5.2} icon={IndianRupee} iconColor="success" /></div>
        <div className="min-w-[155px] sm:min-w-0 snap-start"><StatCard label="Commission" value={`₹${(e.currentMonth.commission / 1000).toFixed(1)}K`} icon={TrendingUp} iconColor="warning" /></div>
      </div>
    </div>
  );
}

function TodaySchedule() {
  const todaySessions = trainerSchedule.filter((s) => s.date === "2026-03-27");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Today&apos;s Schedule</CardTitle>
        <Link href="/trainer/schedule" className="text-xs text-primary font-medium hover:underline">Full Schedule →</Link>
      </CardHeader>
      <div className="space-y-2">
        {todaySessions.map((s) => (
          <div key={s.id} className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-surface transition-colors">
            <div className="text-center shrink-0 w-14">
              <div className="text-sm font-bold text-foreground">{s.time}</div>
              <div className="text-[10px] text-muted">{s.duration} min</div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-foreground">
                {s.type === "PT Session" ? s.client : s.class}
              </div>
              <div className="text-xs text-muted">
                {s.type} {s.type === "Group Class" && `— ${s.participants} participants`}
              </div>
              {s.notes && <div className="text-xs text-muted mt-0.5 italic">📝 {s.notes}</div>}
            </div>
            <StatusBadge status={s.status} />
          </div>
        ))}
      </div>
    </Card>
  );
}

function ClientRoster() {
  const clientIds = ["member-1", "member-7", "member-17", "member-2", "member-8"];
  const clients = members.filter((m) => clientIds.includes(m.id));

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Clients</CardTitle>
        <Link href="/trainer/clients" className="text-xs text-primary font-medium hover:underline">All Clients →</Link>
      </CardHeader>
      <div className="space-y-2">
        {clients.map((c) => (
          <div key={c.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-surface transition-colors">
            <div className="h-9 w-9 rounded-full overflow-hidden bg-primary/10 flex items-center justify-center shrink-0">
              {c.avatar ? <Image src={c.avatar} alt={c.name} width={36} height={36} className="object-cover" /> : <span className="text-xs font-bold text-primary">{c.name.charAt(0)}</span>}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-foreground truncate">{c.name}</div>
              <div className="text-xs text-muted">{c.plan} — {c.visits} visits</div>
            </div>
            <Badge variant="primary">{c.branch}</Badge>
          </div>
        ))}
      </div>
    </Card>
  );
}

function RecentNotes() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Client Notes</CardTitle>
      </CardHeader>
      <div className="space-y-3">
        {trainerClientNotes.map((cn) => (
          <div key={cn.clientId} className="p-3 rounded-lg bg-surface">
            <div className="text-sm font-medium text-foreground mb-1">{cn.clientName}</div>
            {cn.notes.slice(0, 1).map((note, i) => (
              <div key={i}>
                <div className="text-[10px] text-muted mb-0.5">{note.date}</div>
                <div className="text-xs text-muted">{note.text}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </Card>
  );
}

function EarningsOverview() {
  const { data, loading } = useLazyLoad(async () => {
    await DELAYS.slowSection();
    return trainerEarnings;
  }, []);

  if (loading) return <Skeleton variant="chart" />;

  const e = data!;
  const max = Math.max(...e.history.map((h) => h.earnings));

  return (
    <Card className="fade-in">
      <CardHeader>
        <CardTitle>Earnings (6 Months)</CardTitle>
        <Link href="/trainer/earnings" className="text-xs text-primary font-medium hover:underline">Details →</Link>
      </CardHeader>
      <div className="flex items-end gap-2 h-32">
        {e.history.map((h) => (
          <div key={h.month} className="flex-1 flex flex-col items-center gap-1">
            <div className="text-[10px] text-muted">₹{(h.earnings / 1000).toFixed(0)}K</div>
            <div className="w-full bg-success/20 rounded-t hover:bg-success/40 transition-colors" style={{ height: `${(h.earnings / max) * 100}%` }} />
            <div className="text-[9px] text-muted">{h.month.slice(0, 3)}</div>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
        <div>
          <span className="text-xs text-muted">Next payout: </span>
          <span className="text-xs font-medium text-foreground">{e.nextPayout}</span>
        </div>
        <span className="text-sm font-bold text-success">₹{(e.nextPayoutAmount / 1000).toFixed(1)}K</span>
      </div>
    </Card>
  );
}

export default function TrainerDashboard() {
  return (
    <div className="space-y-4 sm:space-y-6">
      <TrainerStats />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          <TodaySchedule />
          <EarningsOverview />
        </div>
        <div className="space-y-4 sm:space-y-6">
          <ClientRoster />
          <RecentNotes />
        </div>
      </div>
    </div>
  );
}

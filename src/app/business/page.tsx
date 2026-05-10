"use client";

import Image from "next/image";
import Link from "next/link";
import { useAsyncData, useLazyLoad } from "@/lib/hooks";
import { DELAYS } from "@/lib/delay";
import { businessStats, revenueData, members, leads, attendanceHeatmap, classes } from "@/lib/mock-data";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge, StatusBadge } from "@/components/ui/Badge";
import { StatCard } from "@/components/ui/StatCard";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { DashboardSkeleton, Skeleton } from "@/components/ui/Skeleton";
import {
  Users, IndianRupee, TrendingUp, UserPlus, CalendarDays,
  AlertCircle, Target, Activity, ChevronRight, Clock,
} from "lucide-react";

function OverviewStats() {
  const { data, loading } = useAsyncData(async () => {
    await DELAYS.pageLoad();
    return businessStats;
  }, []);

  if (loading) return <DashboardSkeleton />;
  const s = data!;

  return (
    <div className="space-y-4 sm:space-y-6 fade-in">
      <div className="flex items-center justify-between gap-2">
        <div className="min-w-0">
          <h1 className="text-lg sm:text-2xl font-bold text-foreground truncate">Business Dashboard</h1>
          <p className="text-[10px] sm:text-sm text-muted mt-0.5 truncate">Iron Paradise — 3 Branches</p>
        </div>
        <Badge variant="success" className="shrink-0">All Branches</Badge>
      </div>

      {/* Stats — horizontal scroll on mobile */}
      <div className="flex gap-3 overflow-x-auto scrollbar-hide snap-x -mx-3 px-3 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-4 scroll-fade-r sm:[mask-image:none]">
        <div className="min-w-[160px] sm:min-w-0 snap-start"><StatCard label="Active Members" value={s.activeMembers} trend={s.memberGrowth} trendLabel="vs last month" icon={Users} iconColor="primary" /></div>
        <div className="min-w-[160px] sm:min-w-0 snap-start"><StatCard label="Revenue" value={`₹${(revenueData.totalRevenue / 1000).toFixed(0)}K`} trend={revenueData.mrrGrowth} trendLabel="MRR growth" icon={IndianRupee} iconColor="success" /></div>
        <div className="min-w-[160px] sm:min-w-0 snap-start"><StatCard label="New Members" value={s.newMembersThisMonth} trend={15} trendLabel="vs last month" icon={UserPlus} iconColor="info" /></div>
        <div className="min-w-[160px] sm:min-w-0 snap-start"><StatCard label="Daily Check-ins" value={s.avgDailyCheckIns} icon={Activity} iconColor="warning" /></div>
      </div>
    </div>
  );
}


function RevenueChart() {
  const { data, loading } = useLazyLoad(async () => {
    await DELAYS.lazySection();
    return revenueData;
  }, []);

  if (loading) return <Skeleton variant="chart" />;

  const d = data!;
  const maxRev = Math.max(...d.monthlyRevenue.map((m) => m.revenue));

  return (
    <Card className="fade-in">
      <CardHeader>
        <CardTitle>Revenue Trend (6 Months)</CardTitle>
        <Link href="/business/revenue" className="text-xs text-primary font-medium hover:underline">Details →</Link>
      </CardHeader>
      <div className="flex items-end gap-3 h-48 mt-2">
        {d.monthlyRevenue.map((m) => (
          <div key={m.month} className="flex-1 flex flex-col items-center gap-1">
            <div className="text-[10px] text-muted font-medium">₹{(m.revenue / 1000).toFixed(0)}K</div>
            <div className="w-full flex gap-0.5">
              <div className="flex-1 bg-success/20 rounded-t" style={{ height: `${(m.revenue / maxRev) * 160}px` }}>
                <div className="w-full bg-success rounded-t" style={{ height: `${((m.revenue - m.expenses) / m.revenue) * 100}%` }} />
              </div>
            </div>
            <div className="text-xs text-muted">{m.month}</div>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-4 mt-4 pt-3 border-t border-border text-xs text-muted">
        <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-success" /> Revenue</span>
        <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-success/20" /> Expenses</span>
      </div>
    </Card>
  );
}

function RevenueBreakdown() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue Breakdown</CardTitle>
      </CardHeader>
      <div className="space-y-3">
        {revenueData.breakdown.map((b) => (
          <div key={b.category}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-foreground">{b.category}</span>
              <span className="text-sm font-medium text-foreground">₹{(b.amount / 1000).toFixed(0)}K ({b.percentage}%)</span>
            </div>
            <ProgressBar value={b.percentage} max={100} showPercentage={false} size="sm" color="primary" />
          </div>
        ))}
      </div>
    </Card>
  );
}

function RecentMembers() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Members</CardTitle>
        <Link href="/business/members" className="text-xs text-primary font-medium hover:underline">View All →</Link>
      </CardHeader>
      <div className="space-y-2">
        {members.slice(0, 6).map((m) => (
          <div key={m.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-surface transition-colors">
            <div className="h-8 w-8 rounded-full overflow-hidden bg-primary/10 flex items-center justify-center shrink-0">
              {m.avatar ? <Image src={m.avatar} alt={m.name} width={32} height={32} className="object-cover" /> : <span className="text-xs font-bold text-primary">{m.name.charAt(0)}</span>}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-foreground truncate">{m.name}</div>
              <div className="text-xs text-muted">{m.plan || "No plan"} — {m.branch}</div>
            </div>
            <StatusBadge status={m.status} />
          </div>
        ))}
      </div>
    </Card>
  );
}

function LeadPipeline() {
  const stages: Record<string, number> = {};
  leads.forEach((l) => { stages[l.stage] = (stages[l.stage] || 0) + 1; });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lead Pipeline</CardTitle>
        <Link href="/business/leads" className="text-xs text-primary font-medium hover:underline">Manage →</Link>
      </CardHeader>
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
        {["New", "Contacted", "Trial Booked", "Trial Complete", "Follow-up", "Converted", "Lost"].map((stage) => (
          <div key={stage} className="flex-1 min-w-[90px] text-center p-3 rounded-xl bg-surface">
            <div className="text-lg font-bold text-foreground">{stages[stage] || 0}</div>
            <div className="text-[10px] text-muted leading-tight">{stage}</div>
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-2 text-sm">
        <Target size={14} className="text-success" />
        <span className="text-muted">Trial → Member conversion: <span className="font-bold text-foreground">{businessStats.trialConversionRate}%</span></span>
      </div>
    </Card>
  );
}

function AttendanceWidget() {
  const { data, loading } = useLazyLoad(async () => {
    await DELAYS.slowSection();
    return attendanceHeatmap;
  }, []);

  if (loading) return <Skeleton variant="chart" />;

  return (
    <Card className="fade-in">
      <CardHeader>
        <CardTitle>Attendance Today</CardTitle>
        <Badge variant="info">{data!.todayTotal} check-ins</Badge>
      </CardHeader>
      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="p-3 rounded-xl bg-surface">
          <div className="text-lg font-bold text-foreground">{data!.todayTotal}</div>
          <div className="text-xs text-muted">Today</div>
        </div>
        <div className="p-3 rounded-xl bg-surface">
          <div className="text-lg font-bold text-foreground">{data!.weekTotal}</div>
          <div className="text-xs text-muted">This Week</div>
        </div>
        <div className="p-3 rounded-xl bg-surface">
          <div className="text-lg font-bold text-foreground">{data!.monthTotal}</div>
          <div className="text-xs text-muted">This Month</div>
        </div>
      </div>
      <div className="mt-3 text-xs text-muted flex items-center gap-1">
        <Clock size={12} /> Peak hour: <span className="font-medium text-foreground">{data!.peakHour}</span>
      </div>
    </Card>
  );
}

function AlertsWidget() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Alerts & Actions</CardTitle>
      </CardHeader>
      <div className="space-y-2">
        {[
          { icon: AlertCircle, text: `${businessStats.expiringThisMonth} memberships expiring this month`, color: "text-warning", bg: "bg-warning/10" },
          { icon: IndianRupee, text: `${revenueData.overdueCount} overdue payments (₹${(revenueData.overduePayments / 1000).toFixed(0)}K)`, color: "text-danger", bg: "bg-danger/10" },
          { icon: UserPlus, text: `${leads.filter((l) => l.stage === "New").length} new leads need follow-up`, color: "text-info", bg: "bg-info/10" },
          { icon: CalendarDays, text: `${classes.filter((c) => c.booked / c.capacity < 0.3).length} under-filled classes tomorrow`, color: "text-muted", bg: "bg-surface" },
        ].map((alert, i) => (
          <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-surface transition-colors cursor-pointer">
            <div className={`h-8 w-8 rounded-lg ${alert.bg} flex items-center justify-center shrink-0`}>
              <alert.icon size={14} className={alert.color} />
            </div>
            <span className="text-sm text-foreground">{alert.text}</span>
            <ChevronRight size={14} className="text-muted ml-auto" />
          </div>
        ))}
      </div>
    </Card>
  );
}

function ClassFillRates() {
  const topClasses = classes.sort((a, b) => b.booked / b.capacity - a.booked / a.capacity).slice(0, 5);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Class Fill Rates</CardTitle>
        <Link href="/business/classes" className="text-xs text-primary font-medium hover:underline">All Classes →</Link>
      </CardHeader>
      <div className="space-y-3">
        {topClasses.map((cls) => {
          const pct = Math.round((cls.booked / cls.capacity) * 100);
          return (
            <div key={cls.id}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-foreground">{cls.name}</span>
                <span className="text-xs text-muted">{cls.booked}/{cls.capacity}</span>
              </div>
              <ProgressBar value={pct} max={100} showPercentage={false} size="sm" color={pct >= 100 ? "danger" : pct > 75 ? "warning" : "primary"} />
            </div>
          );
        })}
      </div>
    </Card>
  );
}

export default function BusinessDashboard() {
  return (
    <div className="space-y-4 sm:space-y-6">
      <OverviewStats />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          <RevenueChart />
          <LeadPipeline />
          <RecentMembers />
        </div>
        <div className="space-y-4 sm:space-y-6">
          <RevenueBreakdown />
          <AttendanceWidget />
          <AlertsWidget />
          <ClassFillRates />
        </div>
      </div>
    </div>
  );
}

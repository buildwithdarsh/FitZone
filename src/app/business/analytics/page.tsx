"use client";

import { useAsyncData } from "@/lib/hooks";
import { DELAYS } from "@/lib/delay";
import { businessStats, attendanceHeatmap, revenueData, members } from "@/lib/mock-data";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { StatCard } from "@/components/ui/StatCard";
import { DashboardSkeleton } from "@/components/ui/Skeleton";
import {
  Users, TrendingUp, Activity, Clock, Target,
  BarChart3, Percent, UserCheck, UserMinus, Timer,
} from "lucide-react";

export default function AnalyticsPage() {
  const { data, loading } = useAsyncData(async () => {
    await DELAYS.pageLoad();
    return { stats: businessStats, heatmap: attendanceHeatmap, revenue: revenueData, members };
  }, []);

  if (loading) return <DashboardSkeleton />;

  const { stats, heatmap, revenue } = data!;
  const planDist = [
    { plan: "Basic", count: 180, pct: 21 },
    { plan: "Starter", count: 250, pct: 29 },
    { plan: "Pro", count: 310, pct: 36 },
    { plan: "Elite", count: 110, pct: 13 },
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h1 className="hidden sm:block text-2xl font-bold text-foreground">Analytics</h1>
        <p className="text-sm text-muted mt-1">Key metrics and business insights</p>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <StatCard icon={Users} label="Active Members" value={stats.activeMembers} trend={stats.memberGrowth} />
        <StatCard icon={Percent} label="Retention Rate" value={`${stats.memberRetentionRate}%`} trend={2.1} />
        <StatCard icon={Activity} label="Avg Daily Check-ins" value={stats.avgDailyCheckIns} trend={6.4} />
        <StatCard icon={Target} label="Trial Conversion" value={`${stats.trialConversionRate}%`} trend={4} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Attendance heatmap */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock size={18} className="text-primary" /> Attendance Heatmap
            </CardTitle>
          </CardHeader>
          <div className="mt-4 overflow-x-auto momentum-scroll">
            <table className="w-full text-xs min-w-[500px]">
              <thead>
                <tr>
                  <th className="text-left py-1.5 px-2 text-muted font-medium">Hour</th>
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
                    <th key={d} className="text-center py-1.5 px-2 text-muted font-medium">{d}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {heatmap.hourly.map((row) => (
                  <tr key={row.hour}>
                    <td className="py-1 px-2 text-muted font-medium whitespace-nowrap">{row.hour}</td>
                    {[row.mon, row.tue, row.wed, row.thu, row.fri, row.sat, row.sun].map((v, i) => (
                      <td key={i} className="py-1 px-1 text-center">
                        <div
                          className="mx-auto w-8 h-7 rounded flex items-center justify-center text-[10px] font-medium"
                          style={{
                            backgroundColor: `rgba(99, 102, 241, ${Math.min(v / 50, 1)})`,
                            color: v > 25 ? "white" : "inherit",
                          }}
                        >
                          {v}
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-wrap gap-4 mt-4 pt-3 border-t border-border text-xs text-muted">
            <span>Today: <strong className="text-foreground">{heatmap.todayTotal}</strong></span>
            <span>This Week: <strong className="text-foreground">{heatmap.weekTotal.toLocaleString()}</strong></span>
            <span>This Month: <strong className="text-foreground">{heatmap.monthTotal.toLocaleString()}</strong></span>
            <span>Peak: <strong className="text-foreground">{heatmap.peakHour}</strong></span>
          </div>
        </Card>

        {/* Revenue trend */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp size={18} className="text-primary" /> Revenue Trend
            </CardTitle>
          </CardHeader>
          <div className="mt-4 space-y-3">
            {revenue.monthlyRevenue.map((m) => {
              const profit = m.revenue - m.expenses;
              return (
                <div key={m.month}>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-muted w-8">{m.month}</span>
                    <span className="text-foreground font-medium">{(m.revenue / 1000).toFixed(0)}K</span>
                  </div>
                  <div className="flex gap-1">
                    <div className="flex-1">
                      <ProgressBar value={(m.revenue / 850000) * 100} color="primary" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex items-center justify-between mt-4 pt-3 border-t border-border text-xs">
            <span className="text-muted">MRR</span>
            <span className="font-bold text-foreground">{(revenue.mrr / 1000).toFixed(0)}K <span className="text-success text-[10px]">+{revenue.mrrGrowth}%</span></span>
          </div>
        </Card>

        {/* Membership distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 size={18} className="text-primary" /> Plan Distribution
            </CardTitle>
          </CardHeader>
          <div className="mt-4 space-y-3">
            {planDist.map((p) => (
              <div key={p.plan}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-foreground font-medium">{p.plan}</span>
                  <span className="text-xs text-muted">{p.count} members ({p.pct}%)</span>
                </div>
                <ProgressBar value={p.pct} color="primary" />
              </div>
            ))}
          </div>
        </Card>

        {/* Key metrics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity size={18} className="text-primary" /> Key Metrics
            </CardTitle>
          </CardHeader>
          <div className="mt-4 space-y-3">
            <MetricRow label="Net Promoter Score" value={stats.nps.toString()} suffix="/100" />
            <MetricRow label="New Members (This Month)" value={stats.newMembersThisMonth.toString()} />
            <MetricRow label="Expiring This Month" value={stats.expiringThisMonth.toString()} warn />
            <MetricRow label="Overdue Payments" value={stats.overduePayments.toString()} warn />
            <MetricRow label="Class Fill Rate" value={`${stats.classFillRate}%`} />
            <MetricRow label="Avg Revenue/Member" value={`₹${revenue.avgRevenuePerMember.toLocaleString()}`} />
          </div>
        </Card>

        {/* Revenue breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target size={18} className="text-primary" /> Revenue Breakdown
            </CardTitle>
          </CardHeader>
          <div className="mt-4 space-y-3">
            {revenue.breakdown.map((b) => (
              <div key={b.category}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-foreground">{b.category}</span>
                  <span className="text-xs text-muted">₹{(b.amount / 1000).toFixed(0)}K ({b.percentage}%)</span>
                </div>
                <ProgressBar value={b.percentage} color="primary" />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

function MetricRow({ label, value, suffix, warn }: { label: string; value: string; suffix?: string; warn?: boolean }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-border last:border-0">
      <span className="text-sm text-muted">{label}</span>
      <span className={`text-sm font-bold ${warn ? "text-warning" : "text-foreground"}`}>
        {value}{suffix && <span className="text-xs text-muted font-normal">{suffix}</span>}
      </span>
    </div>
  );
}

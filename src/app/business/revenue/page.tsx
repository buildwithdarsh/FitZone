"use client";

import { useAsyncData } from "@/lib/hooks";
import { DELAYS } from "@/lib/delay";
import { revenueData } from "@/lib/mock-data";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { StatCard } from "@/components/ui/StatCard";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { DashboardSkeleton } from "@/components/ui/Skeleton";
import { IndianRupee, TrendingUp, CreditCard, AlertCircle, RefreshCw, Users } from "lucide-react";

export default function RevenuePage() {
  const { data, loading } = useAsyncData(async () => {
    await DELAYS.pageLoad();
    return revenueData;
  }, []);

  if (loading) return <DashboardSkeleton />;
  const d = data!;

  return (
    <div className="space-y-4 sm:space-y-6">
      <h1 className="hidden sm:block text-2xl font-bold text-foreground">Revenue & Financials</h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Revenue" value={`₹${(d.totalRevenue / 1000).toFixed(0)}K`} trend={d.mrrGrowth} trendLabel="MRR growth" icon={IndianRupee} iconColor="success" />
        <StatCard label="MRR" value={`₹${(d.mrr / 1000).toFixed(0)}K`} trend={d.mrrGrowth} icon={TrendingUp} iconColor="primary" />
        <StatCard label="Overdue" value={`₹${(d.overduePayments / 1000).toFixed(0)}K`} icon={AlertCircle} iconColor="danger" />
        <StatCard label="Avg Per Member" value={`₹${d.avgRevenuePerMember.toLocaleString()}`} icon={Users} iconColor="info" />
      </div>

      {/* Revenue Trend */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Revenue vs Expenses</CardTitle>
        </CardHeader>
        <div className="space-y-4">
          {d.monthlyRevenue.map((m) => {
            const profit = m.revenue - m.expenses;
            return (
              <div key={m.month} className="flex items-center gap-4">
                <span className="text-sm font-medium text-foreground w-10">{m.month}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-success">Revenue: ₹{(m.revenue / 1000).toFixed(0)}K</span>
                    <span className="text-xs text-muted">Expenses: ₹{(m.expenses / 1000).toFixed(0)}K</span>
                    <span className="text-xs font-medium text-foreground">Profit: ₹{(profit / 1000).toFixed(0)}K</span>
                  </div>
                  <div className="flex gap-0.5 h-3">
                    <div className="bg-success rounded-l h-full" style={{ width: `${(profit / m.revenue) * 100}%` }} />
                    <div className="bg-danger/30 rounded-r h-full" style={{ width: `${(m.expenses / m.revenue) * 100}%` }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Revenue Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue by Category</CardTitle>
          </CardHeader>
          <div className="space-y-3">
            {d.breakdown.map((b) => (
              <div key={b.category}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-foreground">{b.category}</span>
                  <span className="text-sm font-medium text-foreground">₹{(b.amount / 1000).toFixed(0)}K <span className="text-xs text-muted">({b.percentage}%)</span></span>
                </div>
                <ProgressBar value={b.percentage} max={100} showPercentage={false} size="sm" color="primary" />
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Status</CardTitle>
          </CardHeader>
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 rounded-xl bg-success/5 border border-success/20">
              <CreditCard size={20} className="text-success" />
              <div>
                <div className="text-lg font-bold text-foreground">₹{((d.totalRevenue - d.overduePayments) / 1000).toFixed(0)}K</div>
                <div className="text-xs text-muted">Collected</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-xl bg-danger/5 border border-danger/20">
              <AlertCircle size={20} className="text-danger" />
              <div>
                <div className="text-lg font-bold text-foreground">₹{(d.overduePayments / 1000).toFixed(0)}K</div>
                <div className="text-xs text-muted">{d.overdueCount} overdue payments</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-xl bg-warning/5 border border-warning/20">
              <RefreshCw size={20} className="text-warning" />
              <div>
                <div className="text-lg font-bold text-foreground">₹{(d.refundsThisMonth / 1000).toFixed(0)}K</div>
                <div className="text-xs text-muted">Refunds this month</div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

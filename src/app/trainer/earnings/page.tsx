"use client";

import { useAsyncData } from "@/lib/hooks";
import { DELAYS } from "@/lib/delay";
import { trainerEarnings } from "@/lib/mock-data";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { StatCard } from "@/components/ui/StatCard";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { DashboardSkeleton } from "@/components/ui/Skeleton";
import { IndianRupee, TrendingUp, Calendar, Wallet, CreditCard, Clock } from "lucide-react";

export default function EarningsPage() {
  const { data, loading } = useAsyncData(async () => {
    await DELAYS.pageLoad();
    return trainerEarnings;
  }, []);

  if (loading) return <DashboardSkeleton />;
  const e = data!;

  return (
    <div className="space-y-4 sm:space-y-6">
      <h1 className="hidden sm:block text-2xl font-bold text-foreground">Earnings Dashboard</h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Earnings" value={`₹${(e.currentMonth.totalEarnings / 1000).toFixed(1)}K`} icon={IndianRupee} iconColor="success" />
        <StatCard label="Commission (85%)" value={`₹${(e.currentMonth.commission / 1000).toFixed(1)}K`} icon={Wallet} iconColor="primary" />
        <StatCard label="Pending" value={`₹${(e.currentMonth.pending / 1000).toFixed(1)}K`} icon={Clock} iconColor="warning" />
        <StatCard label="Sessions" value={e.currentMonth.totalSessions} icon={Calendar} iconColor="info" />
      </div>

      {/* Next Payout */}
      <Card className="bg-gradient-to-r from-success/10 to-success/5 border-success/20">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-muted">Next Payout</div>
            <div className="text-2xl font-bold text-foreground">₹{(e.nextPayoutAmount).toLocaleString()}</div>
            <div className="text-xs text-muted mt-1">Scheduled: {e.nextPayout} — Payout on {e.payoutSchedule}</div>
          </div>
          <CreditCard size={32} className="text-success" />
        </div>
      </Card>

      {/* Earnings History */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Earnings (6 Months)</CardTitle>
        </CardHeader>
        <div className="space-y-4">
          {e.history.map((h) => (
            <div key={h.month} className="flex items-center gap-4">
              <span className="text-sm font-medium text-foreground w-20">{h.month.split(" ")[0]}</span>
              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <span className="text-xs text-muted">{h.sessions} sessions</span>
                  <span className="text-xs font-medium text-foreground">₹{(h.commission).toLocaleString()}</span>
                </div>
                <ProgressBar value={h.commission} max={50000} showPercentage={false} size="sm" color="success" />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Commission Details */}
      <Card>
        <CardHeader>
          <CardTitle>Commission Structure</CardTitle>
        </CardHeader>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-surface">
            <div className="text-xs text-muted">Commission Rate</div>
            <div className="text-2xl font-bold text-primary">{e.commissionRate}%</div>
            <div className="text-xs text-muted mt-1">of session fees</div>
          </div>
          <div className="p-4 rounded-xl bg-surface">
            <div className="text-xs text-muted">Per Session Rate</div>
            <div className="text-2xl font-bold text-foreground">₹1,200</div>
            <div className="text-xs text-muted mt-1">Commission: ₹1,020</div>
          </div>
        </div>
      </Card>
    </div>
  );
}

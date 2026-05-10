"use client";

import { useAsyncData } from "@/lib/hooks";
import { DELAYS } from "@/lib/delay";
import { currentMember, membershipPlans } from "@/lib/mock-data";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { DashboardSkeleton } from "@/components/ui/Skeleton";
import { QrCode, CreditCard, Calendar, Shield, ArrowUpRight, Pause, Users } from "lucide-react";

export default function MembershipPage() {
  const { data, loading } = useAsyncData(async () => {
    await DELAYS.pageLoad();
    return currentMember;
  }, []);

  if (loading) return <DashboardSkeleton />;
  const m = data!;

  const expiryDate = new Date(m.membershipExpiry);
  const today = new Date("2026-03-27");
  const daysLeft = Math.ceil((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  const totalDays = 365;
  const usedDays = totalDays - daysLeft;

  return (
    <div className="space-y-4 sm:space-y-6">
      <h1 className="hidden sm:block text-2xl font-bold text-foreground">My Membership</h1>

      {/* QR Card */}
      <Card className="bg-gradient-to-br from-primary to-primary-dark text-white">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="h-40 w-40 bg-white rounded-2xl flex items-center justify-center shrink-0">
            <div className="text-center p-4">
              <QrCode size={64} className="text-primary mx-auto" />
              <div className="text-[10px] text-muted mt-2 font-mono">{m.qrCode}</div>
            </div>
          </div>
          <div className="flex-1 text-center sm:text-left">
            <div className="text-sm opacity-80">Member ID</div>
            <div className="text-lg font-mono font-bold">{m.qrCode}</div>
            <div className="text-2xl font-bold mt-2">{m.name}</div>
            <div className="flex flex-wrap gap-2 mt-3 justify-center sm:justify-start">
              <Badge variant="warning">{m.plan} Plan</Badge>
              <Badge variant="success">Active</Badge>
            </div>
            <div className="text-sm opacity-80 mt-3">{m.gym} — {m.branch}</div>
          </div>
        </div>
      </Card>

      {/* Membership Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Membership Details</CardTitle>
          </CardHeader>
          <div className="space-y-3">
            {[
              { icon: Shield, label: "Plan", value: `${m.plan} Plan` },
              { icon: Calendar, label: "Member Since", value: m.memberSince },
              { icon: Calendar, label: "Expires", value: m.membershipExpiry },
              { icon: CreditCard, label: "Monthly", value: "₹3,999" },
              { icon: Users, label: "Trainer", value: m.trainer },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-surface flex items-center justify-center">
                  <item.icon size={14} className="text-muted" />
                </div>
                <div className="flex-1">
                  <div className="text-xs text-muted">{item.label}</div>
                  <div className="text-sm font-medium text-foreground">{item.value}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Membership Status</CardTitle>
            <Badge variant={daysLeft > 30 ? "success" : daysLeft > 7 ? "warning" : "danger"}>{daysLeft} days left</Badge>
          </CardHeader>
          <ProgressBar value={usedDays} max={totalDays} label="Usage" color={daysLeft > 30 ? "primary" : "warning"} />
          <div className="mt-4 space-y-2">
            <button className="w-full h-10 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-colors flex items-center justify-center gap-2">
              <CreditCard size={14} /> Renew Membership
            </button>
            <div className="grid grid-cols-2 gap-2">
              <button className="h-10 rounded-xl bg-surface text-foreground text-sm font-medium hover:bg-surface-hover transition-colors flex items-center justify-center gap-2">
                <ArrowUpRight size={14} /> Upgrade
              </button>
              <button className="h-10 rounded-xl bg-surface text-foreground text-sm font-medium hover:bg-surface-hover transition-colors flex items-center justify-center gap-2">
                <Pause size={14} /> Freeze
              </button>
            </div>
          </div>
        </Card>
      </div>

      {/* Plan Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Plan Comparison</CardTitle>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-2 text-xs text-muted font-medium">Feature</th>
                {membershipPlans.map((p) => (
                  <th key={p.id} className="text-center py-3 px-2">
                    <span className="font-semibold text-foreground">{p.name}</span>
                    <div className="text-xs text-muted mt-0.5">₹{p.price.toLocaleString()}/mo</div>
                    {p.name === m.plan && <Badge variant="primary" className="mt-1">Current</Badge>}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {membershipPlans[0].features.map((f, i) => (
                <tr key={i} className="border-b border-border last:border-0">
                  <td className="py-2.5 px-2 text-xs text-foreground">{f.name}</td>
                  {membershipPlans.map((p) => (
                    <td key={p.id} className="text-center py-2.5">
                      <span className={p.features[i].included ? "text-success" : "text-gray-300"}>
                        {p.features[i].included ? "✓" : "✕"}
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

"use client";

import { useAsyncData } from "@/lib/hooks";
import { DELAYS } from "@/lib/delay";
import { equipment } from "@/lib/mock-data";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge, StatusBadge } from "@/components/ui/Badge";
import { StatCard } from "@/components/ui/StatCard";
import { DashboardSkeleton } from "@/components/ui/Skeleton";
import { Wrench, CheckCircle, AlertTriangle, XCircle, Plus, Calendar } from "lucide-react";

export default function EquipmentPage() {
  const { data, loading } = useAsyncData(async () => {
    await DELAYS.pageLoad();
    return equipment;
  }, []);

  if (loading) return <DashboardSkeleton />;

  const eq = data!;
  const working = eq.filter((e) => e.status === "Working").length;
  const maintenance = eq.filter((e) => e.status === "Under Maintenance").length;
  const outOfService = eq.filter((e) => e.status === "Out of Service").length;

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="hidden sm:block text-2xl font-bold text-foreground">Equipment Inventory</h1>
          <p className="text-sm text-muted mt-1">{eq.length} items tracked across Koramangala branch</p>
        </div>
        <button className="h-9 px-4 rounded-lg bg-primary text-sm text-white font-medium hover:bg-primary-dark transition-colors flex items-center gap-2 shrink-0">
          <Plus size={14} /> <span className="hidden sm:inline">Add Equipment</span><span className="sm:hidden">Add</span>
        </button>
      </div>

      <div className="flex gap-3 overflow-x-auto momentum-scroll -mx-3 px-3 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-3 sm:gap-4">
        <div className="min-w-[38%] shrink-0 sm:min-w-0"><StatCard label="Working" value={working} icon={CheckCircle} iconColor="success" /></div>
        <div className="min-w-[38%] shrink-0 sm:min-w-0"><StatCard label="Maintenance" value={maintenance} icon={AlertTriangle} iconColor="warning" /></div>
        <div className="min-w-[38%] shrink-0 sm:min-w-0"><StatCard label="Out of Service" value={outOfService} icon={XCircle} iconColor="danger" /></div>
      </div>

      {/* Mobile: card list */}
      <div className="space-y-3 sm:hidden">
        {eq.map((item) => {
          const warrantyExpired = item.warrantyExpiry && new Date(item.warrantyExpiry) < new Date("2026-03-27");
          return (
            <Card key={item.id} className="fade-in">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2 min-w-0">
                  <Wrench size={14} className="text-muted shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">{item.name}</p>
                    <p className="text-xs text-muted truncate">{item.model}</p>
                  </div>
                </div>
                <StatusBadge status={item.status} />
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
                <div>
                  <span className="text-muted">Location</span>
                  <p className="font-medium text-foreground">{item.location}</p>
                </div>
                <div>
                  <span className="text-muted">Qty</span>
                  <p className="font-medium text-foreground">{item.working}/{item.quantity} working</p>
                </div>
                <div>
                  <span className="text-muted">Warranty</span>
                  <p>{warrantyExpired
                    ? <Badge variant="danger">Expired</Badge>
                    : <Badge variant="success">Until {item.warrantyExpiry}</Badge>
                  }</p>
                </div>
                <div>
                  <span className="text-muted">Next Service</span>
                  <p className="font-medium text-foreground">{item.nextMaintenance || "Needs replacement"}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Desktop: table */}
      <Card padding={false} className="hidden sm:block">
        <div className="overflow-x-auto momentum-scroll">
          <table className="w-full text-sm min-w-[800px]">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-xs text-muted font-medium">Equipment</th>
                <th className="text-left py-3 px-4 text-xs text-muted font-medium">Model</th>
                <th className="text-center py-3 px-4 text-xs text-muted font-medium">Qty</th>
                <th className="text-left py-3 px-4 text-xs text-muted font-medium">Status</th>
                <th className="text-left py-3 px-4 text-xs text-muted font-medium">Location</th>
                <th className="text-left py-3 px-4 text-xs text-muted font-medium">Warranty</th>
                <th className="text-left py-3 px-4 text-xs text-muted font-medium">Last Maintenance</th>
                <th className="text-left py-3 px-4 text-xs text-muted font-medium">Next Due</th>
              </tr>
            </thead>
            <tbody>
              {eq.map((item) => {
                const warrantyExpired = item.warrantyExpiry && new Date(item.warrantyExpiry) < new Date("2026-03-27");
                return (
                  <tr key={item.id} className="border-b border-border last:border-0 hover:bg-surface/50 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Wrench size={14} className="text-muted" />
                        <span className="font-medium text-foreground">{item.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-muted">{item.model}</td>
                    <td className="py-3 px-4 text-center">
                      <span className="font-medium text-foreground">{item.working}</span>
                      <span className="text-muted">/{item.quantity}</span>
                    </td>
                    <td className="py-3 px-4"><StatusBadge status={item.status} /></td>
                    <td className="py-3 px-4 text-muted">{item.location}</td>
                    <td className="py-3 px-4">
                      {warrantyExpired
                        ? <Badge variant="danger">Expired</Badge>
                        : <Badge variant="success">Until {item.warrantyExpiry}</Badge>
                      }
                    </td>
                    <td className="py-3 px-4 text-muted">{item.lastMaintenance}</td>
                    <td className="py-3 px-4">
                      {item.nextMaintenance ? (
                        <span className="flex items-center gap-1 text-muted">
                          <Calendar size={12} /> {item.nextMaintenance}
                        </span>
                      ) : (
                        <Badge variant="danger">Needs Replacement</Badge>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

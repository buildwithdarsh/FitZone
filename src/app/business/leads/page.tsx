"use client";

import { useAsyncData } from "@/lib/hooks";
import { DELAYS } from "@/lib/delay";
import { leads, businessStats } from "@/lib/mock-data";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge, StatusBadge } from "@/components/ui/Badge";
import { StatCard } from "@/components/ui/StatCard";
import { DashboardSkeleton } from "@/components/ui/Skeleton";
import { Target, UserPlus, Phone, Mail, MessageSquare, Calendar, Plus } from "lucide-react";

export default function LeadsPage() {
  const { data, loading } = useAsyncData(async () => {
    await DELAYS.pageLoad();
    return leads;
  }, []);

  if (loading) return <DashboardSkeleton />;

  const allLeads = data!;

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="hidden sm:block text-2xl font-bold text-foreground">Lead Management</h1>
          <p className="text-sm text-muted mt-1">{allLeads.length} leads in pipeline</p>
        </div>
        <button className="h-9 px-4 rounded-lg bg-primary text-sm text-white font-medium hover:bg-primary-dark transition-colors flex items-center gap-2">
          <Plus size={14} /> Add Lead
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Leads" value={allLeads.length} icon={UserPlus} iconColor="info" />
        <StatCard label="Active Pipeline" value={allLeads.filter((l) => !["Converted", "Lost"].includes(l.stage)).length} icon={Target} iconColor="primary" />
        <StatCard label="Conversion Rate" value={`${businessStats.trialConversionRate}%`} trend={5} icon={Target} iconColor="success" />
        <StatCard label="Converted" value={allLeads.filter((l) => l.stage === "Converted").length} icon={UserPlus} iconColor="success" />
      </div>

      {/* Pipeline Kanban */}
      <div className="flex gap-3 sm:gap-4 overflow-x-auto scrollbar-hide pb-2 -mx-3 px-3 sm:mx-0 sm:px-0 snap-x snap-mandatory momentum-scroll">
        {["New", "Contacted", "Trial Booked", "Trial Complete", "Follow-up", "Converted", "Lost"].map((stage) => {
          const stageLeads = allLeads.filter((l) => l.stage === stage);
          return (
            <div key={stage} className="min-w-[240px] sm:min-w-[260px] flex-1 snap-start">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-foreground">{stage}</h3>
                <Badge variant="default">{stageLeads.length}</Badge>
              </div>
              <div className="space-y-2">
                {stageLeads.map((lead) => (
                  <Card key={lead.id} hover className="fade-in">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-sm font-semibold text-foreground">{lead.name}</h4>
                      <StatusBadge status={lead.stage} />
                    </div>
                    <div className="space-y-1.5 text-xs text-muted">
                      <div className="flex items-center gap-1.5"><Phone size={11} /> {lead.phone}</div>
                      <div className="flex items-center gap-1.5"><Mail size={11} /> {lead.email}</div>
                      <div className="flex items-center gap-1.5"><Target size={11} /> Source: {lead.source}</div>
                      <div className="flex items-center gap-1.5"><Calendar size={11} /> {lead.date}</div>
                    </div>
                    {lead.notes && (
                      <div className="mt-2 p-2 rounded bg-surface text-xs text-muted">
                        <MessageSquare size={10} className="inline mr-1" /> {lead.notes}
                      </div>
                    )}
                    <div className="mt-2 text-[10px] text-muted">Assigned: {lead.assignedTo}</div>
                  </Card>
                ))}
                {stageLeads.length === 0 && (
                  <div className="text-center py-8 text-xs text-muted border-2 border-dashed border-border rounded-xl">No leads</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

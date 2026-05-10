"use client";

import Image from "next/image";
import { useState } from "react";
import { useAsyncData } from "@/lib/hooks";
import { DELAYS } from "@/lib/delay";
import { members } from "@/lib/mock-data";
import { Card } from "@/components/ui/Card";
import { Badge, StatusBadge } from "@/components/ui/Badge";
import { Tabs } from "@/components/ui/Tabs";
import { DashboardSkeleton } from "@/components/ui/Skeleton";
import { Search, Download, Plus } from "lucide-react";

function MemberCards({ filtered }: { filtered: typeof members }) {
  return (
    <div className="space-y-2 p-3 sm:hidden">
      {filtered.map((m) => (
        <div key={m.id} className="p-3 rounded-xl border border-border hover:bg-surface/50 transition-colors">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-9 w-9 rounded-full overflow-hidden bg-primary/10 flex items-center justify-center shrink-0">
              {m.avatar ? <Image src={m.avatar} alt={m.name} width={36} height={36} className="object-cover" /> : <span className="text-xs font-bold text-primary">{m.name.charAt(0)}</span>}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground truncate">{m.name}</p>
              <p className="text-xs text-muted truncate">{m.email}</p>
            </div>
            <StatusBadge status={m.status} />
          </div>
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div>
              <span className="text-muted">Plan</span>
              <p className="font-medium text-foreground">{m.plan || "—"}</p>
            </div>
            <div>
              <span className="text-muted">Visits</span>
              <p className="font-medium text-foreground">{m.visits}</p>
            </div>
            <div>
              <span className="text-muted">Revenue</span>
              <p className="font-medium text-foreground">₹{m.revenue.toLocaleString()}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function MemberTable({ filtered }: { filtered: typeof members }) {
  return (
    <div className="overflow-x-auto momentum-scroll hidden sm:block">
      <table className="w-full text-sm min-w-[700px]">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-3 px-3 text-xs text-muted font-medium">Member</th>
            <th className="text-left py-3 px-3 text-xs text-muted font-medium">Plan</th>
            <th className="text-left py-3 px-3 text-xs text-muted font-medium">Status</th>
            <th className="text-left py-3 px-3 text-xs text-muted font-medium">Branch</th>
            <th className="text-left py-3 px-3 text-xs text-muted font-medium">Trainer</th>
            <th className="text-left py-3 px-3 text-xs text-muted font-medium">Last Visit</th>
            <th className="text-left py-3 px-3 text-xs text-muted font-medium">Visits</th>
            <th className="text-right py-3 px-3 text-xs text-muted font-medium">Revenue</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((m) => (
            <tr key={m.id} className="border-b border-border last:border-0 hover:bg-surface/50 transition-colors cursor-pointer">
              <td className="py-3 px-3">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full overflow-hidden bg-primary/10 flex items-center justify-center shrink-0">
                    {m.avatar ? <Image src={m.avatar} alt={m.name} width={32} height={32} className="object-cover" /> : <span className="text-xs font-bold text-primary">{m.name.charAt(0)}</span>}
                  </div>
                  <div>
                    <div className="font-medium text-foreground">{m.name}</div>
                    <div className="text-xs text-muted">{m.email}</div>
                  </div>
                </div>
              </td>
              <td className="py-3 px-3">{m.plan ? <Badge variant="primary">{m.plan}</Badge> : <span className="text-xs text-muted">—</span>}</td>
              <td className="py-3 px-3"><StatusBadge status={m.status} /></td>
              <td className="py-3 px-3 text-muted">{m.branch}</td>
              <td className="py-3 px-3 text-muted">{m.trainer || "—"}</td>
              <td className="py-3 px-3 text-muted">{m.lastVisit || "—"}</td>
              <td className="py-3 px-3 text-foreground font-medium">{m.visits}</td>
              <td className="py-3 px-3 text-right text-foreground font-medium">₹{m.revenue.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function MemberList({ filtered }: { filtered: typeof members }) {
  return (
    <>
      <MemberCards filtered={filtered} />
      <MemberTable filtered={filtered} />
    </>
  );
}

export default function MembersPage() {
  const [search, setSearch] = useState("");
  const { data, loading } = useAsyncData(async () => {
    await DELAYS.pageLoad();
    return members;
  }, []);

  if (loading) return <DashboardSkeleton />;

  const allMembers = data!;
  const filtered = search
    ? allMembers.filter((m) => m.name.toLowerCase().includes(search.toLowerCase()) || m.email.toLowerCase().includes(search.toLowerCase()))
    : allMembers;

  const byStatus = (status: string) => filtered.filter((m) => m.status === status);

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="hidden sm:block text-2xl font-bold text-foreground">Members</h1>
          <p className="text-sm text-muted mt-1">{allMembers.length} total members across all branches</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="h-9 px-3 sm:px-4 rounded-lg bg-surface text-sm text-foreground font-medium hover:bg-surface-hover transition-colors flex items-center gap-2">
            <Download size={14} /> <span className="hidden sm:inline">Export</span>
          </button>
          <button className="h-9 px-3 sm:px-4 rounded-lg bg-primary text-sm text-white font-medium hover:bg-primary-dark transition-colors flex items-center gap-2">
            <Plus size={14} /> <span className="hidden sm:inline">Add Member</span><span className="sm:hidden">Add</span>
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
        <input
          type="text"
          placeholder="Search members by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:max-w-md h-10 pl-9 pr-4 rounded-lg border border-border text-sm focus:outline-none focus:border-primary/50"
        />
      </div>

      <Card padding={false}>
        <Tabs
          tabs={[
            { id: "all", label: "All", count: filtered.length, content: <MemberList filtered={filtered} /> },
            { id: "active", label: "Active", count: byStatus("Active").length, content: <MemberList filtered={byStatus("Active")} /> },
            { id: "expired", label: "Expired", count: byStatus("Expired").length, content: <MemberList filtered={byStatus("Expired")} /> },
            { id: "frozen", label: "Frozen", count: byStatus("Frozen").length, content: <MemberList filtered={byStatus("Frozen")} /> },
            { id: "trial", label: "Trial", count: byStatus("Trial").length, content: <MemberList filtered={byStatus("Trial")} /> },
            { id: "leads", label: "Leads", count: byStatus("Lead").length, content: <MemberList filtered={byStatus("Lead")} /> },
          ]}
        />
      </Card>
    </div>
  );
}

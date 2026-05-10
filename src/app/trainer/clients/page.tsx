"use client";

import Image from "next/image";
import { useAsyncData } from "@/lib/hooks";
import { DELAYS } from "@/lib/delay";
import { members, trainerClientNotes } from "@/lib/mock-data";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge, StatusBadge } from "@/components/ui/Badge";
import { DashboardSkeleton } from "@/components/ui/Skeleton";
import { Users, Target, Calendar, MessageSquare, TrendingUp } from "lucide-react";

export default function ClientsPage() {
  const { data, loading } = useAsyncData(async () => {
    await DELAYS.pageLoad();
    const clientIds = ["member-1", "member-2", "member-7", "member-8", "member-17"];
    return members.filter((m) => clientIds.includes(m.id));
  }, []);

  if (loading) return <DashboardSkeleton />;

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h1 className="hidden sm:block text-2xl font-bold text-foreground">My Clients</h1>
        <p className="text-sm text-muted mt-1">{data!.length} active clients assigned to you</p>
      </div>

      <div className="space-y-4">
        {data!.map((client) => {
          const notes = trainerClientNotes.find((n) => n.clientId === client.id);
          return (
            <Card key={client.id} hover className="fade-in">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex items-center gap-4 flex-1">
                  <div className="h-14 w-14 rounded-full overflow-hidden bg-primary/10 flex items-center justify-center shrink-0">
                    {client.avatar ? <Image src={client.avatar} alt={client.name} width={56} height={56} className="object-cover" /> : <span className="text-lg font-bold text-primary">{client.name.charAt(0)}</span>}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{client.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="primary">{client.plan}</Badge>
                      <StatusBadge status={client.status} />
                    </div>
                    <div className="flex items-center gap-3 mt-2 text-xs text-muted">
                      <span className="flex items-center gap-1"><Calendar size={12} /> Joined {client.joinDate}</span>
                      <span className="flex items-center gap-1"><TrendingUp size={12} /> {client.visits} visits</span>
                      <span className="flex items-center gap-1"><Target size={12} /> Last: {client.lastVisit}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2 shrink-0">
                  <button className="h-8 px-4 rounded-lg bg-primary text-white text-xs font-medium hover:bg-primary-dark transition-colors flex items-center gap-1.5">
                    <MessageSquare size={12} /> Message
                  </button>
                  <button className="h-8 px-4 rounded-lg bg-surface text-foreground text-xs font-medium hover:bg-surface-hover transition-colors">
                    View Progress
                  </button>
                </div>
              </div>

              {notes && notes.notes.length > 0 && (
                <div className="mt-3 pt-3 border-t border-border">
                  <div className="text-xs font-medium text-muted mb-1">Latest Note — {notes.notes[0].date}</div>
                  <div className="text-xs text-muted">{notes.notes[0].text}</div>
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}

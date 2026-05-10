"use client";

import { useState } from "react";
import { useAsyncData } from "@/lib/hooks";
import { DELAYS } from "@/lib/delay";
import { notifications } from "@/lib/mock-data";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { DashboardSkeleton } from "@/components/ui/Skeleton";
import {
  Bell, Calendar, Trophy, ClipboardList, CreditCard,
  Award, BarChart3, Tag, CheckCheck,
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  calendar: <Calendar size={18} />,
  trophy: <Trophy size={18} />,
  clipboard: <ClipboardList size={18} />,
  "credit-card": <CreditCard size={18} />,
  award: <Award size={18} />,
  "bar-chart": <BarChart3 size={18} />,
  tag: <Tag size={18} />,
};

const typeColors: Record<string, string> = {
  class: "bg-blue-50 text-blue-600",
  milestone: "bg-orange-50 text-orange-600",
  plan: "bg-purple-50 text-purple-600",
  payment: "bg-green-50 text-green-600",
  achievement: "bg-yellow-50 text-yellow-600",
  social: "bg-indigo-50 text-indigo-600",
  offer: "bg-pink-50 text-pink-600",
};

export default function NotificationsPage() {
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const { data, loading } = useAsyncData(async () => {
    await DELAYS.pageLoad();
    return notifications;
  }, []);

  if (loading) return <DashboardSkeleton />;

  const items = filter === "unread" ? data!.filter((n) => !n.read) : data!;
  const unreadCount = data!.filter((n) => !n.read).length;

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="hidden sm:block text-2xl font-bold text-foreground">Notifications</h1>
          <p className="text-sm text-muted mt-1">
            {unreadCount > 0 ? `${unreadCount} unread` : "All caught up!"}
          </p>
        </div>
        <button className="flex items-center gap-1.5 text-xs text-primary font-medium hover:text-primary/80 transition-colors">
          <CheckCheck size={14} />
          Mark all read
        </button>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setFilter("all")}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
            filter === "all" ? "bg-primary text-white" : "bg-surface text-muted hover:text-foreground"
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter("unread")}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
            filter === "unread" ? "bg-primary text-white" : "bg-surface text-muted hover:text-foreground"
          }`}
        >
          Unread {unreadCount > 0 && <Badge variant="danger" className="ml-1.5">{unreadCount}</Badge>}
        </button>
      </div>

      {/* Notification list */}
      <div className="space-y-2">
        {items.length === 0 ? (
          <Card className="py-12 text-center">
            <Bell size={32} className="mx-auto text-muted mb-3" />
            <p className="text-sm text-muted">No unread notifications</p>
          </Card>
        ) : (
          items.map((n) => (
            <Card
              key={n.id}
              hover
              className={`flex items-start gap-3 p-4 transition-all ${!n.read ? "border-l-3 border-l-primary bg-primary/[0.02]" : ""}`}
            >
              <div className={`h-9 w-9 rounded-lg flex items-center justify-center shrink-0 ${typeColors[n.type] ?? "bg-surface text-muted"}`}>
                {iconMap[n.icon] ?? <Bell size={18} />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h3 className={`text-sm ${!n.read ? "font-semibold text-foreground" : "font-medium text-foreground/80"}`}>
                    {n.title}
                  </h3>
                  {!n.read && <span className="h-2 w-2 rounded-full bg-primary shrink-0 mt-1.5" />}
                </div>
                <p className="text-xs text-muted mt-0.5 line-clamp-2">{n.message}</p>
                <span className="text-[11px] text-muted/70 mt-1 block">{n.time}</span>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

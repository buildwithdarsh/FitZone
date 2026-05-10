"use client";

import Image from "next/image";
import { useState } from "react";
import { useAsyncData } from "@/lib/hooks";
import { DELAYS } from "@/lib/delay";
import { classes } from "@/lib/mock-data";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Tabs } from "@/components/ui/Tabs";
import { DashboardSkeleton } from "@/components/ui/Skeleton";
import {
  Users, Clock, MapPin, Search, Plus, Calendar, Filter,
} from "lucide-react";

const classTypes = ["All", ...Array.from(new Set(classes.map((c) => c.type)))];

export default function ClassesPage() {
  const [typeFilter, setTypeFilter] = useState("All");

  const { data, loading } = useAsyncData(async () => {
    await DELAYS.pageLoad();
    return classes;
  }, []);

  if (loading) return <DashboardSkeleton />;

  const filtered = typeFilter === "All" ? data! : data!.filter((c) => c.type === typeFilter);
  const totalCapacity = data!.reduce((s, c) => s + c.capacity, 0);
  const totalBooked = data!.reduce((s, c) => s + c.booked, 0);
  const fillRate = Math.round((totalBooked / totalCapacity) * 100);

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="hidden sm:block text-2xl font-bold text-foreground">Classes</h1>
          <p className="text-sm text-muted mt-1">{data!.length} classes · {fillRate}% avg fill rate</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-medium rounded-xl hover:bg-primary/90 transition-colors">
          <Plus size={16} /> Add Class
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {classTypes.map((t) => (
          <button
            key={t}
            onClick={() => setTypeFilter(t)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              typeFilter === t ? "bg-primary text-white" : "bg-surface text-muted hover:text-foreground"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Class grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((c) => {
          const fillPct = Math.round((c.booked / c.capacity) * 100);
          const isFull = c.booked >= c.capacity;
          return (
            <Card key={c.id} hover padding={false} className="overflow-hidden fade-in">
              <div className="h-32 relative">
                <Image src={c.image} alt={c.name} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute top-2 right-2">
                  <Badge variant={isFull ? "danger" : "primary"}>
                    {isFull ? "Full" : `${c.capacity - c.booked} spots`}
                  </Badge>
                </div>
                <div className="absolute bottom-2 left-3 right-3">
                  <h3 className="text-sm font-bold text-white">{c.name}</h3>
                  <p className="text-xs text-white/80 mt-0.5">{c.trainer}</p>
                </div>
              </div>
              <div className="p-4 space-y-3">
                <div className="flex flex-wrap gap-2 text-xs text-muted">
                  <span className="flex items-center gap-1"><Calendar size={12} /> {c.day}</span>
                  <span className="flex items-center gap-1"><Clock size={12} /> {c.time} · {c.duration}min</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted">
                  <MapPin size={12} /> {c.gym} — {c.room}
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="default">{c.type}</Badge>
                  <Badge variant="default">{c.difficulty}</Badge>
                </div>
                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-muted flex items-center gap-1"><Users size={12} /> {c.booked}/{c.capacity}</span>
                    <span className="font-medium text-foreground">{fillPct}%</span>
                  </div>
                  <ProgressBar value={fillPct} color={isFull ? "danger" : fillPct > 80 ? "warning" : "primary"} />
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

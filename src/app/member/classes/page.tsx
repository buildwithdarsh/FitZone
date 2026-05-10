"use client";

import Image from "next/image";
import { useState } from "react";
import { useAsyncData } from "@/lib/hooks";
import { DELAYS } from "@/lib/delay";
import { classes } from "@/lib/mock-data";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { DashboardSkeleton } from "@/components/ui/Skeleton";
import { Clock, Users, MapPin, Filter } from "lucide-react";

const classTypes = ["All", "Yoga", "HIIT", "CrossFit", "Zumba", "Pilates", "Boxing", "Meditation", "Boot Camp"];

export default function ClassesPage() {
  const [filter, setFilter] = useState("All");
  const { data, loading } = useAsyncData(async () => {
    await DELAYS.pageLoad();
    return classes;
  }, []);

  if (loading) return <DashboardSkeleton />;

  const filtered = filter === "All" ? data! : data!.filter((c) => c.type === filter || c.name.includes(filter));

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h1 className="hidden sm:block text-2xl font-bold text-foreground">Group Classes</h1>
        <p className="text-sm text-muted mt-1">Book your spot in upcoming group sessions</p>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-1">
        <Filter size={16} className="text-muted shrink-0" />
        {classTypes.map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
              filter === type ? "bg-primary text-white" : "bg-surface text-muted hover:bg-surface-hover"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Class Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((cls) => {
          const isFull = cls.booked >= cls.capacity;
          const fillPct = Math.round((cls.booked / cls.capacity) * 100);
          return (
            <Card key={cls.id} hover className="fade-in">
              <div className="flex gap-4">
                <div className="h-24 w-24 rounded-xl overflow-hidden shrink-0 relative">
                  <Image src={cls.image} alt={cls.name} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-foreground text-sm">{cls.name}</h3>
                    <Badge variant={isFull ? "danger" : fillPct > 80 ? "warning" : "success"}>
                      {isFull ? "Full" : `${cls.capacity - cls.booked} left`}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted mt-1">{cls.trainer}</p>
                  <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-muted">
                    <span className="flex items-center gap-1"><Clock size={12} /> {cls.time} ({cls.duration} min)</span>
                    <span className="flex items-center gap-1"><Users size={12} /> {cls.booked}/{cls.capacity}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1 text-xs text-muted">
                    <MapPin size={12} /> {cls.room} — {cls.gym}
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="default">{cls.difficulty}</Badge>
                    <Badge variant="default">{cls.day}</Badge>
                  </div>
                  <ProgressBar value={cls.booked} max={cls.capacity} showPercentage={false} size="sm" color={isFull ? "danger" : fillPct > 80 ? "warning" : "success"} className="mt-2" />
                </div>
              </div>
              <button
                disabled={isFull}
                className={`mt-3 w-full h-9 rounded-lg text-sm font-medium transition-colors ${
                  isFull ? "bg-surface text-muted cursor-not-allowed" : "bg-primary text-white hover:bg-primary-dark"
                }`}
              >
                {isFull ? "Join Waitlist" : "Book Now"}
              </button>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

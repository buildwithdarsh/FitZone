"use client";

import Image from "next/image";
import { useAsyncData } from "@/lib/hooks";
import { DELAYS } from "@/lib/delay";
import { gyms } from "@/lib/mock-data";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { StarRating } from "@/components/ui/StarRating";
import { DashboardSkeleton } from "@/components/ui/Skeleton";
import {
  MapPin, Phone, Mail, Clock, Users, Dumbbell,
  Star, Plus, ExternalLink,
} from "lucide-react";

export default function BranchesPage() {
  const { data, loading } = useAsyncData(async () => {
    await DELAYS.pageLoad();
    return gyms;
  }, []);

  if (loading) return <DashboardSkeleton />;

  const totalMembers = data!.reduce((s, g) => s + g.memberCount, 0);
  const totalTrainers = data!.reduce((s, g) => s + g.trainersCount, 0);

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="hidden sm:block text-2xl font-bold text-foreground">Branches</h1>
          <p className="text-sm text-muted mt-1">{data!.length} locations · {totalMembers.toLocaleString()} members · {totalTrainers} trainers</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-medium rounded-xl hover:bg-primary/90 transition-colors">
          <Plus size={16} /> Add Branch
        </button>
      </div>

      {/* Branch cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {data!.map((g) => (
          <Card key={g.id} hover padding={false} className="overflow-hidden fade-in">
            <div className="h-40 relative">
              <Image src={g.image} alt={g.name} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute top-3 right-3 flex gap-2">
                <Badge variant={g.isOpen ? "success" : "danger"}>
                  {g.isOpen ? "Open" : "Closed"}
                </Badge>
                {g.isPremium && <Badge variant="warning">Premium</Badge>}
              </div>
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <h3 className="text-base font-bold">{g.name}</h3>
                <p className="text-xs text-white/80 mt-0.5">{g.tagline}</p>
              </div>
            </div>
            <div className="p-4 space-y-3">
              <div className="flex items-center gap-2">
                <StarRating rating={g.rating} />
                <span className="text-xs text-muted">{g.rating} ({g.reviewCount} reviews)</span>
              </div>

              <div className="space-y-2 text-sm text-muted">
                <div className="flex items-start gap-2"><MapPin size={14} className="shrink-0 mt-0.5" /> <span>{g.address}</span></div>
                <div className="flex items-center gap-2"><Phone size={14} /> {g.phone}</div>
                <div className="flex items-center gap-2"><Clock size={14} /> {g.operatingHours.open} – {g.operatingHours.close}</div>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {g.branches.map((b) => (
                  <Badge key={b} variant="default">{b}</Badge>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-2 pt-3 border-t border-border">
                <div className="text-center">
                  <p className="text-sm font-bold text-foreground">{g.memberCount}</p>
                  <p className="text-[11px] text-muted">Members</p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-bold text-foreground">{g.trainersCount}</p>
                  <p className="text-[11px] text-muted">Trainers</p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-bold text-foreground">{g.established}</p>
                  <p className="text-[11px] text-muted">Est.</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-1">
                {g.amenities.slice(0, 5).map((a) => (
                  <span key={a} className="text-[10px] px-2 py-0.5 rounded-full bg-surface text-muted">{a}</span>
                ))}
                {g.amenities.length > 5 && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-surface text-muted">+{g.amenities.length - 5}</span>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

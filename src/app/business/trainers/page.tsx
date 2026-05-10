"use client";

import Image from "next/image";
import { useAsyncData } from "@/lib/hooks";
import { DELAYS } from "@/lib/delay";
import { trainers } from "@/lib/mock-data";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { DashboardSkeleton } from "@/components/ui/Skeleton";
import { StarRating } from "@/components/ui/StarRating";
import {
  Users, Calendar, Award, Star, CheckCircle, Search,
  Plus, MapPin, Clock, IndianRupee,
} from "lucide-react";

export default function TrainersPage() {
  const { data, loading } = useAsyncData(async () => {
    await DELAYS.pageLoad();
    return trainers;
  }, []);

  if (loading) return <DashboardSkeleton />;

  const totalClients = data!.reduce((s, t) => s + t.clients, 0);
  const avgRating = (data!.reduce((s, t) => s + t.rating, 0) / data!.length).toFixed(1);

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="hidden sm:block text-2xl font-bold text-foreground">Trainers</h1>
          <p className="text-sm text-muted mt-1">{data!.length} trainers · {totalClients} active clients · {avgRating} avg rating</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-medium rounded-xl hover:bg-primary/90 transition-colors">
          <Plus size={16} /> Add Trainer
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
        <input
          type="text"
          placeholder="Search trainers..."
          className="w-full h-9 pl-9 pr-4 rounded-lg bg-surface border border-border text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20"
        />
      </div>

      {/* Trainer grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {data!.map((t) => (
          <Card key={t.id} hover className="fade-in">
            <div className="flex items-start gap-3">
              <div className="h-14 w-14 rounded-xl overflow-hidden bg-primary/10 shrink-0">
                <Image src={t.avatar} alt={t.name} width={56} height={56} className="object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-foreground truncate">{t.name}</h3>
                  {t.isVerified && <CheckCircle size={14} className="text-primary shrink-0" />}
                </div>
                <div className="flex items-center gap-1 mt-0.5">
                  <StarRating rating={t.rating} />
                  <span className="text-xs text-muted">({t.reviewCount})</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted mt-1">
                  <MapPin size={11} /> {t.gym}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 mt-3">
              {t.specializations.slice(0, 3).map((s) => (
                <Badge key={s} variant="default">{s}</Badge>
              ))}
              {t.specializations.length > 3 && (
                <Badge variant="default">+{t.specializations.length - 3}</Badge>
              )}
            </div>

            <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-border">
              <div className="text-center">
                <p className="text-sm font-bold text-foreground">{t.clients}</p>
                <p className="text-[11px] text-muted">Clients</p>
              </div>
              <div className="text-center">
                <p className="text-sm font-bold text-foreground">{t.experience}y</p>
                <p className="text-[11px] text-muted">Experience</p>
              </div>
              <div className="text-center">
                <p className="text-sm font-bold text-foreground">{t.sessionsCompleted.toLocaleString()}</p>
                <p className="text-[11px] text-muted">Sessions</p>
              </div>
            </div>

            <div className="flex items-center justify-between mt-3 pt-3 border-t border-border text-xs text-muted">
              <span className="flex items-center gap-1"><Clock size={11} /> {t.availability}</span>
              <span className="flex items-center gap-0.5 font-semibold text-foreground"><IndianRupee size={11} />{t.pricePerSession}/session</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

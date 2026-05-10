"use client";

import Image from "next/image";
import { useAsyncData } from "@/lib/hooks";
import { DELAYS } from "@/lib/delay";
import { trainers, trainerEarnings } from "@/lib/mock-data";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { StarRating } from "@/components/ui/StarRating";
import { DashboardSkeleton } from "@/components/ui/Skeleton";
import {
  User, Mail, MapPin, Clock, Award, Star, CheckCircle,
  Users, Dumbbell, IndianRupee, Calendar, Globe,
} from "lucide-react";

export default function TrainerProfilePage() {
  const { data, loading } = useAsyncData(async () => {
    await DELAYS.pageLoad();
    return { trainer: trainers[0], earnings: trainerEarnings };
  }, []);

  if (loading) return <DashboardSkeleton />;

  const t = data!.trainer;

  return (
    <div className="space-y-4 sm:space-y-6">
      <h1 className="hidden sm:block text-2xl font-bold text-foreground">My Profile</h1>

      {/* Profile header */}
      <Card className="overflow-hidden" padding={false}>
        <div className="h-28 bg-gradient-to-r from-primary to-primary/70" />
        <div className="px-4 sm:px-6 pb-5">
          <div className="-mt-10 mb-3">
            <div className="h-20 w-20 rounded-2xl overflow-hidden border-4 border-white shadow-lg bg-white">
              <Image src={t.avatar} alt={t.name} width={80} height={80} className="object-cover" />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl font-bold text-foreground">{t.name}</h2>
                {t.isVerified && <CheckCircle size={16} className="text-primary" />}
              </div>
              <div className="flex items-center gap-2 mt-1">
                <StarRating rating={t.rating} />
                <span className="text-sm text-muted">{t.rating} ({t.reviewCount} reviews)</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
              <IndianRupee size={14} />{t.pricePerSession}/session
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* About */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User size={18} className="text-primary" /> About
            </CardTitle>
          </CardHeader>
          <p className="text-sm text-muted mt-3 leading-relaxed">{t.bio}</p>
        </Card>

        {/* Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Dumbbell size={18} className="text-primary" /> Details
            </CardTitle>
          </CardHeader>
          <div className="space-y-3 mt-4">
            <InfoRow icon={<MapPin size={15} />} label="Gym" value={t.gym} />
            <InfoRow icon={<Clock size={15} />} label="Availability" value={t.availability} />
            <InfoRow icon={<Calendar size={15} />} label="Experience" value={`${t.experience} years`} />
            <InfoRow icon={<Globe size={15} />} label="Languages" value={t.languages.join(", ")} />
          </div>
        </Card>

        {/* Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star size={18} className="text-primary" /> Stats
            </CardTitle>
          </CardHeader>
          <div className="grid grid-cols-2 gap-3 mt-4">
            <StatBox label="Active Clients" value={t.clients.toString()} />
            <StatBox label="Sessions Done" value={t.sessionsCompleted.toLocaleString()} />
            <StatBox label="Rating" value={t.rating.toString()} />
            <StatBox label="Reviews" value={t.reviewCount.toString()} />
          </div>
        </Card>

        {/* Specializations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Dumbbell size={18} className="text-primary" /> Specializations
            </CardTitle>
          </CardHeader>
          <div className="flex flex-wrap gap-2 mt-4">
            {t.specializations.map((s) => (
              <Badge key={s} variant="primary">{s}</Badge>
            ))}
          </div>
        </Card>

        {/* Certifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award size={18} className="text-primary" /> Certifications
            </CardTitle>
          </CardHeader>
          <div className="space-y-2 mt-4">
            {t.certifications.map((c) => (
              <div key={c} className="flex items-center gap-2 text-sm">
                <CheckCircle size={14} className="text-success shrink-0" />
                <span className="text-foreground">{c}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 text-sm">
      <span className="text-muted">{icon}</span>
      <span className="text-muted w-24 shrink-0">{label}</span>
      <span className="text-foreground font-medium">{value}</span>
    </div>
  );
}

function StatBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-3 rounded-xl bg-surface">
      <p className="text-lg font-bold text-foreground">{value}</p>
      <p className="text-xs text-muted">{label}</p>
    </div>
  );
}

"use client";

import Image from "next/image";
import { useAsyncData } from "@/lib/hooks";
import { DELAYS } from "@/lib/delay";
import { currentMember, bodyMetrics } from "@/lib/mock-data";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { DashboardSkeleton } from "@/components/ui/Skeleton";
import {
  User, Mail, Phone, MapPin, Calendar, Dumbbell, Target,
  Flame, Trophy, QrCode, Crown, Ruler, Weight, Clock,
} from "lucide-react";

export default function ProfilePage() {
  const { data, loading } = useAsyncData(async () => {
    await DELAYS.pageLoad();
    return { member: currentMember, metrics: bodyMetrics };
  }, []);

  if (loading) return <DashboardSkeleton />;

  const m = data!.member;
  const memberSinceDate = new Date(m.memberSince).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const expiryDate = new Date(m.membershipExpiry).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="space-y-4 sm:space-y-6">
      <h1 className="hidden sm:block text-2xl font-bold text-foreground">My Profile</h1>

      {/* Profile header */}
      <Card className="overflow-hidden" padding={false}>
        <div className="h-28 bg-gradient-to-r from-primary to-primary/70" />
        <div className="px-4 sm:px-6 pb-5">
          <div className="-mt-10 mb-3">
            <div className="h-20 w-20 rounded-2xl overflow-hidden border-4 border-white shadow-lg bg-white">
              <Image src={m.avatar} alt={m.name} width={80} height={80} className="object-cover" />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl font-bold text-foreground">{m.name}</h2>
                <Badge variant="primary" className="flex items-center gap-1">
                  <Crown size={10} /> {m.plan}
                </Badge>
              </div>
              <p className="text-sm text-muted mt-0.5">{m.goal} · {m.experience}</p>
            </div>
            <div className="text-left sm:text-right">
              <p className="text-xs text-muted">Member ID</p>
              <div className="flex items-center gap-1.5 text-sm font-mono text-foreground">
                <QrCode size={14} className="text-primary" />
                {m.qrCode}
              </div>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Personal Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User size={18} className="text-primary" /> Personal Info
            </CardTitle>
          </CardHeader>
          <div className="space-y-3 mt-4">
            <InfoRow icon={<Mail size={15} />} label="Email" value={m.email} />
            <InfoRow icon={<Phone size={15} />} label="Phone" value={m.phone} />
            <InfoRow icon={<MapPin size={15} />} label="Gym" value={`${m.gym} — ${m.branch}`} />
            <InfoRow icon={<Dumbbell size={15} />} label="Trainer" value={m.trainer} />
            <InfoRow icon={<Calendar size={15} />} label="Member since" value={memberSinceDate} />
          </div>
        </Card>

        {/* Body Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Ruler size={18} className="text-primary" /> Body Stats
            </CardTitle>
          </CardHeader>
          <div className="grid grid-cols-2 gap-3 mt-4">
            <StatBox icon={<Ruler size={16} />} label="Height" value={`${m.height} cm`} />
            <StatBox icon={<Weight size={16} />} label="Current Weight" value={`${m.currentWeight} kg`} />
            <StatBox icon={<Target size={16} />} label="Target Weight" value={`${m.targetWeight} kg`} />
            <StatBox icon={<User size={16} />} label="Age" value={`${m.age} yrs`} />
          </div>
        </Card>

        {/* Fitness Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy size={18} className="text-primary" /> Fitness Stats
            </CardTitle>
          </CardHeader>
          <div className="grid grid-cols-2 gap-3 mt-4">
            <StatBox icon={<Flame size={16} />} label="Current Streak" value={`${m.streak} days`} color="text-orange-500" />
            <StatBox icon={<Dumbbell size={16} />} label="Total Workouts" value={`${m.totalWorkouts}`} color="text-blue-500" />
            <StatBox icon={<Flame size={16} />} label="Calories This Week" value={`${m.caloriesBurnedThisWeek.toLocaleString()}`} color="text-red-500" />
            <StatBox icon={<Calendar size={16} />} label="Classes This Month" value={`${m.classesThisMonth}`} color="text-purple-500" />
          </div>
        </Card>

        {/* Personal Records */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy size={18} className="text-primary" /> Personal Records
            </CardTitle>
          </CardHeader>
          <div className="space-y-3 mt-4">
            <PRRow label="Bench Press" value={`${m.personalRecords.benchPress} kg`} />
            <PRRow label="Squat" value={`${m.personalRecords.squat} kg`} />
            <PRRow label="Deadlift" value={`${m.personalRecords.deadlift} kg`} />
          </div>
        </Card>
      </div>

      {/* Membership */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock size={18} className="text-primary" /> Membership
          </CardTitle>
        </CardHeader>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-4 text-sm">
          <div>
            <span className="text-muted">Plan:</span>{" "}
            <span className="font-semibold text-foreground">{m.plan}</span>
          </div>
          <div>
            <span className="text-muted">Expires:</span>{" "}
            <span className="font-semibold text-foreground">{expiryDate}</span>
          </div>
          <div>
            <span className="text-muted">Branch:</span>{" "}
            <span className="font-semibold text-foreground">{m.branch}</span>
          </div>
        </div>
      </Card>
    </div>
  );
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 text-sm">
      <span className="text-muted">{icon}</span>
      <span className="text-muted w-28 shrink-0">{label}</span>
      <span className="text-foreground font-medium truncate">{value}</span>
    </div>
  );
}

function StatBox({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string; color?: string }) {
  return (
    <div className="p-3 rounded-xl bg-surface">
      <span className={color ?? "text-muted"}>{icon}</span>
      <p className="text-lg font-bold text-foreground mt-1">{value}</p>
      <p className="text-xs text-muted">{label}</p>
    </div>
  );
}

function PRRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-border last:border-0">
      <span className="text-sm text-muted">{label}</span>
      <span className="text-sm font-bold text-foreground">{value}</span>
    </div>
  );
}

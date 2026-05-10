"use client";

import Image from "next/image";
import { useAsyncData } from "@/lib/hooks";
import { DELAYS } from "@/lib/delay";
import { challenges, leaderboard, badges } from "@/lib/mock-data";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { DashboardSkeleton } from "@/components/ui/Skeleton";
import { Trophy, Users, Calendar, Medal } from "lucide-react";

export default function ChallengesPage() {
  const { data, loading } = useAsyncData(async () => {
    await DELAYS.pageLoad();
    return { challenges, leaderboard, badges };
  }, []);

  if (loading) return <DashboardSkeleton />;

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h1 className="hidden sm:block text-2xl font-bold text-foreground">Challenges & Achievements</h1>
        <p className="text-sm text-muted mt-1">Compete, earn badges, and climb the leaderboard</p>
      </div>

      {/* Active Challenges */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">Active Challenges</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data!.challenges.filter((c) => c.status === "Active").map((ch) => (
            <Card key={ch.id} hover className="overflow-hidden fade-in" padding={false}>
              <div className="h-36 relative">
                <Image src={ch.image} alt={ch.name} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h3 className="font-bold text-sm">{ch.name}</h3>
                  <p className="text-xs text-white/80 mt-0.5">{ch.description}</p>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-3 text-xs text-muted mb-3">
                  <span className="flex items-center gap-1"><Users size={12} /> {ch.participants} participants</span>
                  <span className="flex items-center gap-1"><Calendar size={12} /> Ends {ch.endDate}</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="primary">{ch.type}</Badge>
                  <span className="text-xs font-medium text-foreground">🏆 {ch.prize}</span>
                </div>
                <ProgressBar value={70} max={100} label="Your progress" size="sm" color="primary" />
                <button className="mt-3 w-full h-9 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-colors">
                  View Challenge
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Leaderboard */}
      <Card>
        <CardHeader>
          <CardTitle>March Leaderboard — Most Gym Visits</CardTitle>
          <Badge variant="warning"><Trophy size={12} /> Top 10</Badge>
        </CardHeader>
        <div className="space-y-2">
          {data!.leaderboard.map((entry) => (
            <div key={entry.rank} className={`flex items-center gap-3 p-3 rounded-lg ${entry.memberId === "member-1" ? "bg-primary/5 border border-primary/20" : "hover:bg-surface"} transition-colors`}>
              <div className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-bold ${entry.rank === 1 ? "bg-amber-100 text-amber-700" : entry.rank === 2 ? "bg-gray-100 text-gray-600" : entry.rank === 3 ? "bg-orange-100 text-orange-700" : "bg-surface text-muted"}`}>
                {entry.rank <= 3 ? <Medal size={16} /> : entry.rank}
              </div>
              <div className="h-9 w-9 rounded-full overflow-hidden relative shrink-0">
                <Image src={entry.avatar} alt={entry.name} fill className="object-cover" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-foreground">{entry.name} {entry.memberId === "member-1" && <span className="text-xs text-primary">(You)</span>}</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-foreground">{entry.score}</div>
                <div className="text-[10px] text-muted">{entry.metric}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Badges */}
      <Card>
        <CardHeader>
          <CardTitle>Your Badges</CardTitle>
          <span className="text-xs text-muted">{data!.badges.filter((b) => b.earned).length}/{data!.badges.length} earned</span>
        </CardHeader>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {data!.badges.map((b) => (
            <div key={b.id} className={`text-center p-4 rounded-xl border transition-colors ${b.earned ? "border-primary/20 bg-primary/5" : "border-border opacity-40"}`}>
              <span className="text-3xl">{b.icon}</span>
              <div className="text-sm font-medium text-foreground mt-2">{b.name}</div>
              <div className="text-[10px] text-muted mt-1">{b.description}</div>
              {b.earned && b.date && <div className="text-[10px] text-success mt-1">Earned {b.date}</div>}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

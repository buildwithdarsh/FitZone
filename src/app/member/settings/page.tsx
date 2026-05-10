"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import {
  Bell, Shield, Eye, Moon, Globe, Smartphone,
  Lock, Trash2, LogOut, ChevronRight,
} from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h1 className="hidden sm:block text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-sm text-muted mt-1">Manage your account preferences</p>
      </div>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell size={18} className="text-primary" /> Notifications
          </CardTitle>
        </CardHeader>
        <div className="space-y-1 mt-4">
          <ToggleRow label="Class reminders" description="Get notified before booked classes" defaultOn />
          <ToggleRow label="Workout reminders" description="Daily workout nudge at your preferred time" defaultOn />
          <ToggleRow label="Streak alerts" description="Warnings when you might break your streak" defaultOn />
          <ToggleRow label="Promotional offers" description="Deals, renewals, and membership offers" defaultOn={false} />
          <ToggleRow label="Community updates" description="Challenge results and leaderboard changes" defaultOn />
        </div>
      </Card>

      {/* Privacy */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye size={18} className="text-primary" /> Privacy
          </CardTitle>
        </CardHeader>
        <div className="space-y-1 mt-4">
          <ToggleRow label="Show profile on leaderboard" description="Others can see your name and rank" defaultOn />
          <ToggleRow label="Share workout activity" description="Trainers and friends can view your logs" defaultOn />
          <ToggleRow label="Allow check-in visibility" description="Show your gym check-in status" defaultOn={false} />
        </div>
      </Card>

      {/* Appearance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Moon size={18} className="text-primary" /> Appearance
          </CardTitle>
        </CardHeader>
        <div className="space-y-1 mt-4">
          <SelectRow label="Theme" options={["Light", "Dark", "System"]} defaultValue="Light" />
          <SelectRow label="Language" options={["English", "Hindi"]} defaultValue="English" />
          <SelectRow label="Units" options={["Metric (kg, cm)", "Imperial (lbs, in)"]} defaultValue="Metric (kg, cm)" />
        </div>
      </Card>

      {/* Security */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield size={18} className="text-primary" /> Security
          </CardTitle>
        </CardHeader>
        <div className="mt-4 space-y-2">
          <ActionRow icon={<Lock size={16} />} label="Change password" />
          <ActionRow icon={<Smartphone size={16} />} label="Two-factor authentication" badge="Off" />
          <ActionRow icon={<Globe size={16} />} label="Active sessions" badge="2 devices" />
        </div>
      </Card>

      {/* Danger zone */}
      <Card className="border-danger/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-danger">
            <Trash2 size={18} /> Danger Zone
          </CardTitle>
        </CardHeader>
        <div className="mt-4 space-y-2">
          <ActionRow icon={<LogOut size={16} />} label="Sign out of all devices" danger />
          <ActionRow icon={<Trash2 size={16} />} label="Delete account" danger />
        </div>
      </Card>
    </div>
  );
}

function ToggleRow({ label, description, defaultOn }: { label: string; description: string; defaultOn: boolean }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <div className="flex items-center justify-between py-3 border-b border-border last:border-0 gap-4">
      <div className="min-w-0">
        <p className="text-sm font-medium text-foreground">{label}</p>
        <p className="text-xs text-muted mt-0.5">{description}</p>
      </div>
      <button
        onClick={() => setOn(!on)}
        className={`relative h-6 w-11 rounded-full shrink-0 transition-colors ${on ? "bg-primary" : "bg-border"}`}
      >
        <span className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${on ? "translate-x-5" : ""}`} />
      </button>
    </div>
  );
}

function SelectRow({ label, options, defaultValue }: { label: string; options: string[]; defaultValue: string }) {
  const [value, setValue] = useState(defaultValue);
  return (
    <div className="flex items-center justify-between py-3 border-b border-border last:border-0 gap-4">
      <p className="text-sm font-medium text-foreground">{label}</p>
      <select
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="text-sm bg-surface border border-border rounded-lg px-3 py-1.5 text-foreground focus:outline-none focus:border-primary/50"
      >
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}

function ActionRow({ icon, label, badge, danger }: { icon: React.ReactNode; label: string; badge?: string; danger?: boolean }) {
  return (
    <button className={`w-full flex items-center justify-between py-3 px-1 rounded-lg hover:bg-surface transition-colors text-left ${danger ? "text-danger" : "text-foreground"}`}>
      <div className="flex items-center gap-3">
        {icon}
        <span className="text-sm font-medium">{label}</span>
      </div>
      <div className="flex items-center gap-2">
        {badge && <Badge variant="default">{badge}</Badge>}
        <ChevronRight size={14} className="text-muted" />
      </div>
    </button>
  );
}

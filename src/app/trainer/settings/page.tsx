"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import {
  Bell, Shield, Clock, CreditCard, Globe, Lock,
  ChevronRight, Trash2, LogOut, User,
} from "lucide-react";

export default function TrainerSettingsPage() {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h1 className="hidden sm:block text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-sm text-muted mt-1">Manage your trainer account preferences</p>
      </div>

      {/* Availability */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock size={18} className="text-primary" /> Availability
          </CardTitle>
        </CardHeader>
        <div className="space-y-1 mt-4">
          <ToggleRow label="Accept new clients" description="Show your profile to potential clients" defaultOn />
          <ToggleRow label="Allow direct booking" description="Let clients book sessions without approval" defaultOn={false} />
          <SelectRow label="Buffer between sessions" options={["15 minutes", "30 minutes", "1 hour"]} defaultValue="15 minutes" />
          <SelectRow label="Max daily sessions" options={["4", "6", "8", "Unlimited"]} defaultValue="6" />
        </div>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell size={18} className="text-primary" /> Notifications
          </CardTitle>
        </CardHeader>
        <div className="space-y-1 mt-4">
          <ToggleRow label="New bookings" description="When a client books a session" defaultOn />
          <ToggleRow label="Cancellations" description="When a client cancels" defaultOn />
          <ToggleRow label="Session reminders" description="30 minutes before each session" defaultOn />
          <ToggleRow label="Client messages" description="Push notifications for new messages" defaultOn />
          <ToggleRow label="Payment received" description="When a session payment is processed" defaultOn />
          <ToggleRow label="Monthly summary" description="Earnings and performance report" defaultOn />
        </div>
      </Card>

      {/* Earnings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard size={18} className="text-primary" /> Payout Settings
          </CardTitle>
        </CardHeader>
        <div className="space-y-1 mt-4">
          <FieldRow label="Commission rate" value="85%" />
          <FieldRow label="Payout schedule" value="1st and 15th of every month" />
          <FieldRow label="Bank account" value="HDFC ****4521" />
          <FieldRow label="UPI ID" value="coach.arjun@upi" />
        </div>
      </Card>

      {/* Profile Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User size={18} className="text-primary" /> Profile
          </CardTitle>
        </CardHeader>
        <div className="space-y-1 mt-4">
          <ToggleRow label="Show on public directory" description="Appear in gym's trainer listing" defaultOn />
          <ToggleRow label="Display earnings badge" description="Show your session count milestone" defaultOn />
          <SelectRow label="Language" options={["English", "Hindi"]} defaultValue="English" />
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
          <ActionRow icon={<Globe size={16} />} label="Active sessions" badge="1 device" />
        </div>
      </Card>

      {/* Danger */}
      <Card className="border-danger/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-danger">
            <Trash2 size={18} /> Danger Zone
          </CardTitle>
        </CardHeader>
        <div className="mt-4 space-y-2">
          <ActionRow icon={<LogOut size={16} />} label="Sign out everywhere" danger />
          <ActionRow icon={<Trash2 size={16} />} label="Deactivate account" danger />
        </div>
      </Card>
    </div>
  );
}

function FieldRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-border last:border-0 text-sm">
      <span className="text-muted">{label}</span>
      <span className="font-medium text-foreground">{value}</span>
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

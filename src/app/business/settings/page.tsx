"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import {
  Building2, Clock, CreditCard, Bell, Shield, Users,
  Globe, ChevronRight, Trash2, Download, Mail,
} from "lucide-react";

export default function BusinessSettingsPage() {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h1 className="hidden sm:block text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-sm text-muted mt-1">Manage your gym business settings</p>
      </div>

      {/* Business Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 size={18} className="text-primary" /> Business Information
          </CardTitle>
        </CardHeader>
        <div className="space-y-3 mt-4">
          <FieldRow label="Business Name" value="Iron Paradise Fitness" />
          <FieldRow label="Business Type" value="Gym & Fitness Center" />
          <FieldRow label="GST Number" value="29ABCDE1234F1ZH" />
          <FieldRow label="Contact Email" value="info@ironparadise.fit" />
          <FieldRow label="Contact Phone" value="+91 98456 12340" />
          <FieldRow label="Address" value="42, 3rd Cross, Koramangala 5th Block, Bangalore" />
        </div>
      </Card>

      {/* Operating Hours */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock size={18} className="text-primary" /> Operating Hours
          </CardTitle>
        </CardHeader>
        <div className="space-y-1 mt-4">
          {[
            { day: "Monday – Friday", hours: "5:00 AM – 11:00 PM" },
            { day: "Saturday", hours: "5:00 AM – 10:00 PM" },
            { day: "Sunday", hours: "7:00 AM – 6:00 PM" },
            { day: "Public Holidays", hours: "8:00 AM – 2:00 PM" },
          ].map((d) => (
            <div key={d.day} className="flex items-center justify-between py-2 border-b border-border last:border-0 text-sm">
              <span className="text-muted">{d.day}</span>
              <span className="font-medium text-foreground">{d.hours}</span>
            </div>
          ))}
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
          <ToggleRow label="New member sign-ups" description="Get notified when someone joins" defaultOn />
          <ToggleRow label="Payment alerts" description="Overdue and successful payments" defaultOn />
          <ToggleRow label="Membership expiries" description="Alert 7 days before a membership expires" defaultOn />
          <ToggleRow label="Low class capacity" description="When a class has fewer than 3 spots" defaultOn={false} />
          <ToggleRow label="Equipment maintenance" description="Scheduled maintenance reminders" defaultOn />
          <ToggleRow label="Daily summary" description="End-of-day check-in and revenue summary" defaultOn />
        </div>
      </Card>

      {/* Billing & Payments */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard size={18} className="text-primary" /> Billing & Payments
          </CardTitle>
        </CardHeader>
        <div className="space-y-1 mt-4">
          <SelectRow label="Payment gateway" options={["Razorpay", "PayU", "Cashfree"]} defaultValue="Razorpay" />
          <SelectRow label="Currency" options={["INR (₹)", "USD ($)"]} defaultValue="INR (₹)" />
          <SelectRow label="Invoice prefix" options={["FZ-INV-", "IP-INV-", "Custom"]} defaultValue="FZ-INV-" />
          <ToggleRow label="Auto-generate invoices" description="Automatically send invoices on payment" defaultOn />
          <ToggleRow label="Payment reminders" description="Auto-remind members 3 days before due" defaultOn />
        </div>
      </Card>

      {/* Staff & Roles */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users size={18} className="text-primary" /> Staff & Roles
          </CardTitle>
        </CardHeader>
        <div className="mt-4 space-y-2">
          <ActionRow icon={<Users size={16} />} label="Manage staff accounts" badge="8 active" />
          <ActionRow icon={<Shield size={16} />} label="Roles & permissions" badge="4 roles" />
          <ActionRow icon={<Mail size={16} />} label="Invite staff member" />
        </div>
      </Card>

      {/* Data & Privacy */}
      <Card className="border-danger/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-danger">
            <Shield size={18} /> Data & Privacy
          </CardTitle>
        </CardHeader>
        <div className="mt-4 space-y-2">
          <ActionRow icon={<Download size={16} />} label="Export all member data" />
          <ActionRow icon={<Download size={16} />} label="Export revenue reports" />
          <ActionRow icon={<Trash2 size={16} />} label="Delete all test data" danger />
        </div>
      </Card>
    </div>
  );
}

function FieldRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between py-2 border-b border-border last:border-0 gap-1">
      <span className="text-sm text-muted">{label}</span>
      <span className="text-sm font-medium text-foreground">{value}</span>
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

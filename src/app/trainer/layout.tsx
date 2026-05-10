"use client";

import { DashboardShell } from "@/components/layout/DashboardShell";
import { trainers } from "@/lib/mock-data";
import {
  LayoutDashboard, Users, CalendarDays, ClipboardList, IndianRupee,
  MessageSquare, UserCircle, Settings,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/trainer", icon: LayoutDashboard },
  { label: "My Clients", href: "/trainer/clients", icon: Users },
  { label: "Schedule", href: "/trainer/schedule", icon: CalendarDays },
  { label: "Workout Plans", href: "/trainer/plans", icon: ClipboardList },
  { label: "Earnings", href: "/trainer/earnings", icon: IndianRupee },
  { label: "Messages", href: "/trainer/messages", icon: MessageSquare, badge: "3" },
  { label: "Profile", href: "/trainer/profile", icon: UserCircle },
  { label: "Settings", href: "/trainer/settings", icon: Settings },
];

const bottomNavItems = [
  { label: "Home", href: "/trainer", icon: LayoutDashboard },
  { label: "Clients", href: "/trainer/clients", icon: Users },
  { label: "Schedule", href: "/trainer/schedule", icon: CalendarDays },
  { label: "Plans", href: "/trainer/plans", icon: ClipboardList },
  { label: "Earnings", href: "/trainer/earnings", icon: IndianRupee },
];

export default function TrainerLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <meta name="robots" content="noindex, nofollow" />
      <DashboardShell
        navItems={navItems}
        bottomNavItems={bottomNavItems}
        sidebarTitle="FitZone"
        sidebarSubtitle="Trainer"
        userName={trainers[0].name}
        userAvatar={trainers[0].avatar}
        notificationCount={3}
      >
        {children}
      </DashboardShell>
    </>
  );
}

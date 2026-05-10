"use client";

import { DashboardShell } from "@/components/layout/DashboardShell";
import { currentMember, notifications } from "@/lib/mock-data";
import {
  LayoutDashboard, Dumbbell, CalendarDays, Utensils, TrendingUp,
  Trophy, QrCode, UserCircle, Bell, Settings,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/member", icon: LayoutDashboard },
  { label: "My Workouts", href: "/member/workouts", icon: Dumbbell },
  { label: "Classes", href: "/member/classes", icon: CalendarDays },
  { label: "Nutrition", href: "/member/nutrition", icon: Utensils },
  { label: "Progress", href: "/member/progress", icon: TrendingUp },
  { label: "Challenges", href: "/member/challenges", icon: Trophy },
  { label: "Membership", href: "/member/membership", icon: QrCode },
  { label: "Notifications", href: "/member/notifications", icon: Bell, badge: String(notifications.filter((n) => !n.read).length) },
  { label: "Profile", href: "/member/profile", icon: UserCircle },
  { label: "Settings", href: "/member/settings", icon: Settings },
];

const bottomNavItems = [
  { label: "Home", href: "/member", icon: LayoutDashboard },
  { label: "Workouts", href: "/member/workouts", icon: Dumbbell },
  { label: "Classes", href: "/member/classes", icon: CalendarDays },
  { label: "Progress", href: "/member/progress", icon: TrendingUp },
  { label: "Profile", href: "/member/membership", icon: QrCode },
];

export default function MemberLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <meta name="robots" content="noindex, nofollow" />
      <DashboardShell
        navItems={navItems}
        bottomNavItems={bottomNavItems}
        sidebarTitle="FitZone"
        sidebarSubtitle="Member"
        userName={currentMember.name}
        userAvatar={currentMember.avatar}
        notificationCount={notifications.filter((n) => !n.read).length}
      >
        {children}
      </DashboardShell>
    </>
  );
}

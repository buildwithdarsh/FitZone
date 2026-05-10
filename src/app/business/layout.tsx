"use client";

import { DashboardShell } from "@/components/layout/DashboardShell";
import {
  LayoutDashboard, Users, IndianRupee, CalendarDays, UserCheck,
  Wrench, Target, BarChart3, Building2, Settings,
} from "lucide-react";

const navItems = [
  { label: "Overview", href: "/business", icon: LayoutDashboard },
  { label: "Members", href: "/business/members", icon: Users },
  { label: "Revenue", href: "/business/revenue", icon: IndianRupee },
  { label: "Classes", href: "/business/classes", icon: CalendarDays },
  { label: "Trainers", href: "/business/trainers", icon: UserCheck },
  { label: "Equipment", href: "/business/equipment", icon: Wrench },
  { label: "Leads", href: "/business/leads", icon: Target },
  { label: "Analytics", href: "/business/analytics", icon: BarChart3 },
  { label: "Branches", href: "/business/branches", icon: Building2 },
  { label: "Settings", href: "/business/settings", icon: Settings },
];

const bottomNavItems = [
  { label: "Home", href: "/business", icon: LayoutDashboard },
  { label: "Members", href: "/business/members", icon: Users },
  { label: "Revenue", href: "/business/revenue", icon: IndianRupee },
  { label: "Leads", href: "/business/leads", icon: Target },
  { label: "More", href: "/business/equipment", icon: Wrench },
];

export default function BusinessLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <meta name="robots" content="noindex, nofollow" />
      <DashboardShell
        navItems={navItems}
        bottomNavItems={bottomNavItems}
        sidebarTitle="FitZone"
        sidebarSubtitle="Business"
        userName="Anjali Verma"
        userAvatar={null}
        notificationCount={5}
      >
        {children}
      </DashboardShell>
    </>
  );
}

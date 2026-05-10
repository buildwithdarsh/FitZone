"use client";

import { useState } from "react";
import { Sidebar, type NavItem } from "./Sidebar";
import { Header } from "./Header";
import { BottomNav, type BottomNavItem } from "./BottomNav";

export function DashboardShell({
  children,
  navItems,
  bottomNavItems,
  title,
  sidebarTitle,
  sidebarSubtitle,
  userName,
  userAvatar,
  notificationCount,
}: {
  children: React.ReactNode;
  navItems: NavItem[];
  bottomNavItems: BottomNavItem[];
  title?: string;
  sidebarTitle: string;
  sidebarSubtitle?: string;
  userName: string;
  userAvatar?: string | null;
  notificationCount?: number;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-[100dvh] overflow-hidden bg-surface">
      <Sidebar
        items={navItems}
        title={sidebarTitle}
        subtitle={sidebarSubtitle}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          onMenuClick={() => setSidebarOpen(true)}
          title={title}
          userName={userName}
          userAvatar={userAvatar}
          notificationCount={notificationCount}
        />
        <main className="flex-1 overflow-y-auto momentum-scroll p-3 sm:p-4 lg:p-6 has-bottom-nav">
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </main>
      </div>
      <BottomNav items={bottomNavItems} />
    </div>
  );
}

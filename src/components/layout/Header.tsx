"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, Bell, Search, Dumbbell } from "lucide-react";
import clsx from "clsx";

const pageTitles: Record<string, string> = {
  "/member": "Dashboard",
  "/member/workouts": "Workouts",
  "/member/classes": "Classes",
  "/member/nutrition": "Nutrition",
  "/member/progress": "Progress",
  "/member/challenges": "Challenges",
  "/member/membership": "Membership",
  "/member/notifications": "Notifications",
  "/member/profile": "Profile",
  "/member/settings": "Settings",
  "/business": "Dashboard",
  "/business/members": "Members",
  "/business/revenue": "Revenue",
  "/business/classes": "Classes",
  "/business/trainers": "Trainers",
  "/business/equipment": "Equipment",
  "/business/leads": "Leads",
  "/business/analytics": "Analytics",
  "/business/branches": "Branches",
  "/business/settings": "Settings",
  "/trainer": "Dashboard",
  "/trainer/clients": "My Clients",
  "/trainer/schedule": "Schedule",
  "/trainer/plans": "Workout Plans",
  "/trainer/earnings": "Earnings",
  "/trainer/messages": "Messages",
  "/trainer/profile": "Profile",
  "/trainer/settings": "Settings",
};

export function Header({
  onMenuClick,
  title,
  userName,
  userAvatar,
  notificationCount,
}: {
  onMenuClick: () => void;
  title?: string;
  userName: string;
  userAvatar?: string | null;
  notificationCount?: number;
}) {
  const pathname = usePathname();
  const mobileTitle = pageTitles[pathname];

  return (
    <header className="h-14 sm:h-16 border-b border-border bg-white/95 backdrop-blur-sm flex items-center px-3 sm:px-4 gap-3 shrink-0 standalone-top-pad sticky top-0 z-30">
      {/* Mobile: hamburger */}
      <button onClick={onMenuClick} className="h-10 w-10 rounded-xl flex items-center justify-center hover:bg-surface active:bg-surface-hover active:scale-95 transition-all lg:hidden shrink-0">
        <Menu size={20} />
      </button>

      {/* Mobile: centered page title */}
      <div className="flex-1 flex items-center lg:hidden min-w-0">
        {mobileTitle ? (
          <h1 className="text-base font-bold text-foreground truncate">{mobileTitle}</h1>
        ) : (
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-primary flex items-center justify-center">
              <Dumbbell size={14} className="text-white" />
            </div>
            <span className="text-sm font-bold text-foreground">FitZone</span>
          </div>
        )}
      </div>

      {/* Desktop title */}
      {title && <h1 className="text-lg font-semibold text-foreground hidden lg:block">{title}</h1>}

      {/* Desktop search */}
      <div className="flex-1 max-w-md mx-auto hidden lg:block lg:mx-0">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full h-9 pl-9 pr-4 rounded-lg bg-surface border border-border text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20"
          />
        </div>
      </div>

      <div className="flex items-center gap-1.5 sm:gap-2 ml-auto">
        {/* Mobile search */}
        <button className="h-10 w-10 rounded-xl flex items-center justify-center hover:bg-surface active:scale-95 transition-all lg:hidden">
          <Search size={18} className="text-muted" />
        </button>

        {/* Notifications */}
        <button className="relative h-10 w-10 rounded-xl flex items-center justify-center hover:bg-surface active:scale-95 transition-all">
          <Bell size={18} className="text-muted" />
          {(notificationCount ?? 0) > 0 && (
            <span className="absolute top-1 right-1 h-4 w-4 rounded-full bg-danger text-white text-[9px] flex items-center justify-center font-bold ring-2 ring-white">
              {notificationCount}
            </span>
          )}
        </button>

        {/* Avatar */}
        <div className="pl-1.5 sm:pl-3 border-l border-border">
          <div className={clsx("h-9 w-9 rounded-full overflow-hidden bg-primary/10 flex items-center justify-center ring-2 ring-transparent hover:ring-primary/20 transition-all")}>
            {userAvatar ? (
              <Image src={userAvatar} alt={userName} width={36} height={36} className="object-cover" />
            ) : (
              <span className="text-xs font-bold text-primary">{userName.charAt(0)}</span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

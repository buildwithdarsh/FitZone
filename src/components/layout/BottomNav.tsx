"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import type { LucideIcon } from "lucide-react";

export type BottomNavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
};

export function BottomNav({ items }: { items: BottomNavItem[] }) {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bottom-nav-container">
      {/* Frosted glass background — native iOS/Android feel */}
      <div className="absolute inset-0 bg-white/80 backdrop-blur-xl border-t border-border/50" />
      <div className="relative flex items-center justify-around px-2 pt-2 pb-1" style={{ paddingBottom: "calc(0.25rem + env(safe-area-inset-bottom, 0px))" }}>
        {items.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "flex flex-col items-center justify-center gap-0.5 min-w-[3.5rem] min-h-[3rem] rounded-2xl transition-all duration-200 relative",
                active
                  ? "text-primary"
                  : "text-muted active:text-foreground active:scale-90",
              )}
            >
              {/* Active pill indicator */}
              {active && (
                <div className="absolute -top-1 w-8 h-1 rounded-full bg-primary" />
              )}
              <div className="relative">
                <item.icon
                  size={active ? 24 : 22}
                  strokeWidth={active ? 2.5 : 1.7}
                  className="transition-all duration-200"
                />
                {item.badge && (
                  <span className="absolute -top-1 -right-2 h-4 min-w-[1rem] rounded-full bg-danger text-white text-[9px] flex items-center justify-center font-bold px-1 shadow-sm">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className={clsx(
                "text-[10px] leading-none transition-all duration-200",
                active ? "font-bold text-primary" : "font-medium",
              )}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

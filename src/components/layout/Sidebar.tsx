"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { Dumbbell, X } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type NavItem = { label: string; href: string; icon: LucideIcon; badge?: string };

export function Sidebar({
  items,
  title,
  subtitle,
  open,
  onClose,
}: {
  items: NavItem[];
  title: string;
  subtitle?: string;
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();

  return (
    <>
      {open && <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={onClose} />}
      <aside
        className={clsx(
          "fixed top-0 left-0 z-50 h-full w-64 bg-white border-r border-border flex flex-col transition-transform lg:translate-x-0 lg:static lg:z-auto",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center gap-3 px-5 h-16 border-b border-border shrink-0">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <Dumbbell size={16} className="text-white" />
          </div>
          <div>
            <div className="text-sm font-bold text-foreground">{title}</div>
            {subtitle && <div className="text-[10px] text-muted uppercase tracking-wider">{subtitle}</div>}
          </div>
          <button onClick={onClose} className="ml-auto lg:hidden h-8 w-8 rounded-lg flex items-center justify-center hover:bg-surface">
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-3 px-3">
          {items.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={clsx(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors mb-0.5",
                  active ? "bg-primary/10 text-primary" : "text-muted hover:bg-surface hover:text-foreground",
                )}
              >
                <item.icon size={18} />
                <span>{item.label}</span>
                {item.badge && (
                  <span className="ml-auto text-[10px] bg-danger text-white px-1.5 py-0.5 rounded-full">{item.badge}</span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border">
          <div className="text-[10px] text-muted text-center">FitZone v1.0 — Darsh Gupta</div>
        </div>
      </aside>
    </>
  );
}

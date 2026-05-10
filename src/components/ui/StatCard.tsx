"use client";

import clsx from "clsx";
import { TrendingUp, TrendingDown, type LucideIcon } from "lucide-react";

export function StatCard({
  label,
  value,
  trend,
  trendLabel,
  icon: Icon,
  iconColor = "primary",
  className,
}: {
  label: string;
  value: string | number;
  trend?: number;
  trendLabel?: string;
  icon: LucideIcon;
  iconColor?: "primary" | "success" | "warning" | "danger" | "info";
  className?: string;
}) {
  const iconBg: Record<string, string> = {
    primary: "bg-primary/10 text-primary",
    success: "bg-success/10 text-success",
    warning: "bg-warning/10 text-warning",
    danger: "bg-danger/10 text-danger",
    info: "bg-info/10 text-info",
  };

  return (
    <div className={clsx("rounded-xl border border-border bg-white p-3 sm:p-5 fade-in", className)}>
      <div className="flex items-center justify-between mb-2 sm:mb-3">
        <span className="text-[10px] sm:text-xs font-medium text-muted uppercase tracking-wide leading-tight">{label}</span>
        <div className={clsx("h-7 w-7 sm:h-9 sm:w-9 rounded-lg flex items-center justify-center shrink-0", iconBg[iconColor])}>
          <Icon size={16} className="sm:hidden" />
          <Icon size={18} className="hidden sm:block" />
        </div>
      </div>
      <div className="text-lg sm:text-2xl font-bold text-foreground">{value}</div>
      {trend !== undefined && (
        <div className="flex items-center gap-1 mt-1 sm:mt-2 flex-wrap">
          {trend >= 0 ? (
            <TrendingUp size={12} className="text-success" />
          ) : (
            <TrendingDown size={12} className="text-danger" />
          )}
          <span className={clsx("text-[10px] sm:text-xs font-medium", trend >= 0 ? "text-success" : "text-danger")}>
            {trend >= 0 ? "+" : ""}{trend}%
          </span>
          {trendLabel && <span className="text-[10px] sm:text-xs text-muted hidden sm:inline ml-1">{trendLabel}</span>}
        </div>
      )}
    </div>
  );
}

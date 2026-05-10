"use client";

import clsx from "clsx";

type BadgeVariant = "success" | "warning" | "danger" | "info" | "primary" | "default";

const variantStyles: Record<BadgeVariant, string> = {
  success: "bg-success/10 text-success",
  warning: "bg-warning/10 text-warning",
  danger: "bg-danger/10 text-danger",
  info: "bg-info/10 text-info",
  primary: "bg-primary/10 text-primary",
  default: "bg-muted/10 text-muted",
};

export function Badge({
  children,
  variant = "default",
  className,
  dot,
}: {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
  dot?: boolean;
}) {
  return (
    <span className={clsx("inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium", variantStyles[variant], className)}>
      {dot && <span className={clsx("h-1.5 w-1.5 rounded-full", variant === "success" ? "bg-success" : variant === "warning" ? "bg-warning" : variant === "danger" ? "bg-danger" : variant === "info" ? "bg-info" : variant === "primary" ? "bg-primary" : "bg-muted")} />}
      {children}
    </span>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, BadgeVariant> = {
    Active: "success",
    Expired: "danger",
    Frozen: "info",
    Trial: "warning",
    Lead: "default",
    Cancelled: "danger",
    Working: "success",
    "Under Maintenance": "warning",
    "Out of Service": "danger",
    New: "info",
    Contacted: "primary",
    "Trial Booked": "warning",
    "Trial Complete": "warning",
    "Follow-up": "primary",
    Converted: "success",
    Lost: "danger",
    Upcoming: "info",
    Scheduled: "primary",
    Completed: "success",
  };
  return <Badge variant={map[status] || "default"} dot>{status}</Badge>;
}

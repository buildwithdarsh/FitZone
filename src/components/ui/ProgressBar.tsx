"use client";

import clsx from "clsx";

export function ProgressBar({
  value,
  max = 100,
  label,
  showPercentage = true,
  color = "primary",
  size = "md",
  className,
}: {
  value: number;
  max?: number;
  label?: string;
  showPercentage?: boolean;
  color?: "primary" | "success" | "warning" | "danger" | "info";
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  const colorMap = { primary: "bg-primary", success: "bg-success", warning: "bg-warning", danger: "bg-danger", info: "bg-info" };
  const sizeMap = { sm: "h-1.5", md: "h-2.5", lg: "h-4" };

  return (
    <div className={clsx("w-full", className)}>
      {(label || showPercentage) && (
        <div className="flex justify-between items-center mb-1">
          {label && <span className="text-xs text-muted">{label}</span>}
          {showPercentage && <span className="text-xs font-medium text-foreground">{pct}%</span>}
        </div>
      )}
      <div className={clsx("w-full rounded-full bg-surface overflow-hidden", sizeMap[size])}>
        <div
          className={clsx("h-full rounded-full transition-all duration-700 ease-out", colorMap[color])}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

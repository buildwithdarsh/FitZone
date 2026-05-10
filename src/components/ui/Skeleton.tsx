"use client";

import clsx from "clsx";

type SkeletonVariant = "text" | "card" | "avatar" | "chart" | "table-row" | "image";

export function Skeleton({ variant = "text", className }: { variant?: SkeletonVariant; className?: string }) {
  const base = "skeleton";
  const variants: Record<SkeletonVariant, string> = {
    text: "h-4 w-full rounded",
    card: "h-48 w-full rounded-xl",
    avatar: "h-10 w-10 rounded-full",
    chart: "h-64 w-full rounded-xl",
    "table-row": "h-12 w-full rounded",
    image: "h-40 w-full rounded-lg",
  };
  return <div className={clsx(base, variants[variant], className)} />;
}

export function CardSkeleton() {
  return (
    <div className="rounded-xl border border-border p-4 space-y-3">
      <Skeleton variant="image" />
      <Skeleton variant="text" className="w-3/4" />
      <Skeleton variant="text" className="w-1/2" />
      <div className="flex gap-2">
        <Skeleton variant="text" className="w-16 h-6" />
        <Skeleton variant="text" className="w-16 h-6" />
        <Skeleton variant="text" className="w-16 h-6" />
      </div>
    </div>
  );
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: rows }).map((_, i) => (
        <Skeleton key={i} variant="table-row" />
      ))}
    </div>
  );
}

export function StatCardSkeleton() {
  return (
    <div className="rounded-xl border border-border p-5 space-y-3">
      <div className="flex justify-between">
        <Skeleton variant="text" className="w-24 h-4" />
        <Skeleton variant="avatar" className="h-8 w-8" />
      </div>
      <Skeleton variant="text" className="w-20 h-8" />
      <Skeleton variant="text" className="w-32 h-3" />
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-6 fade-in">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => <StatCardSkeleton key={i} />)}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Skeleton variant="chart" />
        <Skeleton variant="chart" />
      </div>
      <TableSkeleton rows={6} />
    </div>
  );
}

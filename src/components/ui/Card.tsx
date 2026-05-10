"use client";

import clsx from "clsx";

export function Card({
  children,
  className,
  hover,
  onClick,
  padding = true,
}: {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
  padding?: boolean;
}) {
  return (
    <div
      onClick={onClick}
      className={clsx(
        "rounded-xl border border-border bg-white",
        padding && "p-3 sm:p-5",
        hover && "transition-all hover:shadow-md hover:border-primary/30 cursor-pointer",
        onClick && "cursor-pointer",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={clsx("flex items-center justify-between mb-4", className)}>{children}</div>;
}

export function CardTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return <h3 className={clsx("text-sm font-semibold text-foreground", className)}>{children}</h3>;
}

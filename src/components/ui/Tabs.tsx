"use client";

import { useState } from "react";
import clsx from "clsx";

export function Tabs({
  tabs,
  defaultTab,
  onChange,
}: {
  tabs: { id: string; label: string; count?: number; content: React.ReactNode }[];
  defaultTab?: string;
  onChange?: (id: string) => void;
}) {
  const [active, setActive] = useState(defaultTab || tabs[0]?.id);

  return (
    <div>
      <div className="flex gap-1 border-b border-border overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => { setActive(tab.id); onChange?.(tab.id); }}
            className={clsx(
              "px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors relative",
              active === tab.id ? "text-primary" : "text-muted hover:text-foreground",
            )}
          >
            {tab.label}
            {tab.count !== undefined && (
              <span className={clsx("ml-1.5 text-xs rounded-full px-1.5 py-0.5", active === tab.id ? "bg-primary/10 text-primary" : "bg-surface text-muted")}>{tab.count}</span>
            )}
            {active === tab.id && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t" />}
          </button>
        ))}
      </div>
      <div className="mt-4">
        {tabs.find((t) => t.id === active)?.content}
      </div>
    </div>
  );
}

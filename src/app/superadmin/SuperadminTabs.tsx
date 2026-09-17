"use client";

import { useRef, useState, type ReactNode } from "react";
import {
  SUPERADMIN_TABS,
  DEFAULT_TAB_ID,
  nextTabIndex,
  type SuperadminTabId,
} from "@/lib/superadmin/tabs";

/**
 * The /superadmin tab strip.
 *
 * WHY TABS AND BADGES TOGETHER: the queues were stacked below the org list and
 * got missed. Tabs alone would make that WORSE — a panel behind tab 3 is more
 * hidden than one you can scroll to. The unread badge is what actually fixes it,
 * because it is visible without selecting the tab. Tabs are the layout; the
 * badge is the signal.
 *
 * Panels are all MOUNTED and toggled with `hidden`, not conditionally rendered:
 * each child owns its rows in local state plus optimistic status updates, and
 * unmounting would discard an in-flight triage when you switch away and back.
 * All three datasets are already fetched in parallel server-side, so this costs
 * nothing extra.
 *
 * Roving tabindex per the ARIA APG: exactly one tab is tabbable, arrows move
 * between them. The pure key map is in `lib/superadmin/tabs.ts` and tested.
 */
export default function SuperadminTabs({
  counts,
  panels,
}: {
  /** Unread counts by tab. Absent/0 renders no badge. Lifted from the panels so
   *  the badge keeps up as you triage, rather than freezing at the server read. */
  counts: Partial<Record<SuperadminTabId, number>>;
  panels: Record<SuperadminTabId, ReactNode>;
}) {
  const [active, setActive] = useState<SuperadminTabId>(DEFAULT_TAB_ID);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function onKeyDown(e: React.KeyboardEvent<HTMLButtonElement>, index: number) {
    const next = nextTabIndex(index, e.key, SUPERADMIN_TABS.length);
    if (next === null) return; // not ours — let Tab et al. through
    e.preventDefault();
    setActive(SUPERADMIN_TABS[next].id);
    tabRefs.current[next]?.focus();
  }

  return (
    <div className="space-y-6">
      <div
        role="tablist"
        aria-label="Superadmin sections"
        className="flex flex-wrap gap-1 border-b border-input"
      >
        {SUPERADMIN_TABS.map((tab, i) => {
          const selected = tab.id === active;
          const count = counts[tab.id] ?? 0;
          return (
            <button
              key={tab.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              role="tab"
              id={`sa-tab-${tab.id}`}
              aria-selected={selected}
              aria-controls={`sa-panel-${tab.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(tab.id)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={`-mb-px inline-flex items-center gap-2 rounded-t-md border-b-2 px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                selected
                  ? "border-brand text-brand-accent"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
              {count > 0 && (
                <span
                  className="rounded-full border border-brand/30 bg-brand/10 px-2 py-0.5 text-xs font-medium text-brand-accent"
                  // The number alone reads as "3" to a screen reader mid-label.
                  aria-label={`${count} new`}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {SUPERADMIN_TABS.map((tab) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={`sa-panel-${tab.id}`}
          aria-labelledby={`sa-tab-${tab.id}`}
          hidden={tab.id !== active}
        >
          {panels[tab.id]}
        </div>
      ))}
    </div>
  );
}

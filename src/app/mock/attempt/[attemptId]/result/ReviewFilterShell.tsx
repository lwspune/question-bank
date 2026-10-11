"use client";

import { useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { matchesReviewFilter, reviewFilterCounts, type ReviewFilter } from "@/lib/mocks/reviewFilter";

type Item = { position: number; verdict: 1 | -1 | 0 };

const LABEL: Record<ReviewFilter, string> = { all: "All", wrong: "Wrong", left: "Left", right: "Right" };
const VERDICT_NAME = { 1: "right", [-1]: "wrong", 0: "left" } as const;

/**
 * The review's filter chips and number grid (2026-10-11). The question cards
 * are rendered on the server (KaTeX, images) and passed in as children; this
 * only sets data-review-filter on their wrapper, and a rule in globals.css
 * hides the cards whose data-verdict does not match. So filtering costs no
 * re-render of 150 maths-heavy cards and no extra data.
 *
 * Opens on Wrong when there is something wrong: that is what a student reviews.
 * The grid lists the questions the filter shows; a tap scrolls to the card.
 */
export default function ReviewFilterShell({ items, children }: { items: Item[]; children: ReactNode }) {
  const counts = reviewFilterCounts(items);
  const [filter, setFilter] = useState<ReviewFilter>(counts.wrong > 0 ? "wrong" : "all");
  const shown = items.filter((i) => matchesReviewFilter(i, filter));

  // A link to #q14 from the findings card above must land on Q14 even when the
  // filter hides it: show everything, then scroll once the card is visible.
  useEffect(() => {
    const onHash = () => {
      const m = /^#q(\d+)$/.exec(window.location.hash);
      if (!m) return;
      const item = items.find((i) => i.position === Number(m[1]));
      if (!item || matchesReviewFilter(item, filter)) return;
      setFilter("all");
      requestAnimationFrame(() => document.getElementById(`q${item.position}`)?.scrollIntoView());
    };
    onHash();
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, [items, filter]);

  return (
    <>
      <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Show questions">
        {(["all", "wrong", "left", "right"] as const).map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              filter === f ? "border-foreground bg-foreground text-background" : "bg-card hover:bg-accent"
            )}
          >
            {LABEL[f]}
            <span className={cn("ml-1.5 font-medium tabular-nums", filter === f ? "opacity-75" : "text-muted-foreground")}>
              {counts[f]}
            </span>
          </button>
        ))}
      </div>

      {shown.length > 0 && (
        <nav aria-label="Jump to a question" className="mt-3 grid grid-cols-10 gap-1 sm:grid-cols-[repeat(15,minmax(0,1fr))]">
          {shown.map((i) => (
            <a
              key={i.position}
              href={`#q${i.position}`}
              aria-label={`Question ${i.position}, ${VERDICT_NAME[i.verdict]}`}
              className={cn(
                "flex h-7 items-center justify-center rounded-md text-[11px] font-semibold tabular-nums focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                i.verdict === 1 && "bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300",
                i.verdict === -1 && "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-300",
                i.verdict === 0 && "bg-muted text-muted-foreground"
              )}
            >
              {i.position}
            </a>
          ))}
        </nav>
      )}
      {shown.length === 0 && (
        <p className="mt-4 rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
          No {LABEL[filter].toLowerCase()} answers on this paper.
        </p>
      )}

      <div data-review-filter={filter}>{children}</div>
    </>
  );
}

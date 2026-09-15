"use client";

import { useState } from "react";
import { ChevronRight, TrendingUp, TrendingDown, Activity, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ChapterRow, SubtopicRow, Trend } from "@/lib/performance/compute";

/**
 * Chapter performance, expandable to subtopics — the shape borrowed from
 * nda-tracker's ChapterAccordion.
 *
 * Two rules this inherits from there, both of which stop it becoming a wall:
 * chapters are ordered weakest-measured-first, and an expanded chapter shows
 * only the subtopics with something to review.
 *
 * And one this does not: EVERY percentage ships with its denominator. A row
 * resting on one or two answers is marked `thin` by the core and rendered
 * muted, because the median attempt in this bank answers 36% of its paper and a
 * bare "100%" off two questions is not a finding.
 */

const TREND_ICON: Record<Trend, typeof TrendingUp | null> = {
  improving: TrendingUp,
  declining: TrendingDown,
  volatile: Activity,
  stable: Minus,
  unknown: null,
};

const TREND_STYLE: Record<Trend, string> = {
  improving: "text-emerald-600 dark:text-emerald-400",
  declining: "text-red-600 dark:text-red-400",
  volatile: "text-amber-600 dark:text-amber-400",
  stable: "text-muted-foreground",
  unknown: "text-muted-foreground",
};

/** Bar colour by mastery band — the same 0.5 / 0.7 thresholds the concept
 *  graph uses for weak vs mastered, so the colour and the advice agree. */
function barTone(score: number): string {
  if (score >= 0.7) return "bg-emerald-500";
  if (score >= 0.5) return "bg-amber-500";
  return "bg-red-500";
}

function TrendChip({ trend }: { trend: Trend }) {
  const Icon = TREND_ICON[trend];
  if (!Icon || trend === "unknown") return null;
  return (
    <span className={cn("inline-flex items-center gap-1 text-xs", TREND_STYLE[trend])}>
      <Icon className="h-3.5 w-3.5" aria-hidden />
      {trend}
    </span>
  );
}

/** "62% of 21" — or an em-dash when nothing was judged. The denominator is not
 *  optional: it is what separates a finding from a number. */
function Score({ row }: { row: SubtopicRow | ChapterRow }) {
  if (row.accuracy === null) {
    return <span className="text-xs text-muted-foreground">not answered</span>;
  }
  return (
    <span className={cn("text-xs tabular-nums", row.thin && "text-muted-foreground")}>
      <span className="font-semibold">{row.accuracy}%</span>
      <span className="text-muted-foreground"> of {row.judged}</span>
      {row.thin && <span className="text-muted-foreground"> · thin</span>}
    </span>
  );
}

export default function ChapterAccordion({ chapters }: { chapters: ChapterRow[] }) {
  const [open, setOpen] = useState<Record<string, boolean>>({});

  if (chapters.length === 0) {
    return (
      <p className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
        No chapter data for this subject yet.
      </p>
    );
  }

  return (
    <ul className="divide-y rounded-lg border bg-card">
      {chapters.map((c) => {
        const isOpen = Boolean(open[c.chapter]);
        // Only subtopics worth reviewing — a clean one has nothing to say here.
        const worthShowing = c.subtopics.filter(
          (s) => s.wrong > 0 || s.seenBlank > 0 || s.judged > 0
        );
        return (
          <li key={c.chapter}>
            <button
              type="button"
              onClick={() => setOpen((o) => ({ ...o, [c.chapter]: !o[c.chapter] }))}
              aria-expanded={isOpen}
              className="flex w-full items-center gap-3 p-3 text-left transition-colors hover:bg-accent/40 focus-visible:bg-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
            >
              <ChevronRight
                className={cn(
                  "h-4 w-4 shrink-0 text-muted-foreground transition-transform",
                  isOpen && "rotate-90"
                )}
                aria-hidden
              />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-medium">{c.chapter}</span>
                <span className="mt-0.5 block text-xs text-muted-foreground">
                  {c.subtopics.length} subtopic{c.subtopics.length === 1 ? "" : "s"}
                  {c.neverReached > 0 && ` · ${c.neverReached} never reached`}
                </span>
              </span>
              <span className="hidden w-40 shrink-0 sm:block" aria-hidden>
                <span className="block h-2 overflow-hidden rounded-full bg-muted">
                  <span
                    className={cn("block h-full rounded-full", barTone(c.weightedScore))}
                    style={{ width: `${Math.max(2, Math.round(c.weightedScore * 100))}%` }}
                  />
                </span>
              </span>
              <span className="shrink-0 text-right">
                <Score row={c} />
                <span className="mt-0.5 block">
                  <TrendChip trend={c.trend} />
                </span>
              </span>
            </button>

            {isOpen && (
              <ul className="space-y-1 border-t bg-muted/30 px-3 py-2 pl-10">
                {worthShowing.length === 0 ? (
                  <li className="py-2 text-xs text-muted-foreground">
                    Nothing answered in this chapter yet.
                  </li>
                ) : (
                  worthShowing.map((s) => (
                    <li
                      key={s.subtopic}
                      className="flex flex-wrap items-center gap-x-3 gap-y-1 py-1.5"
                    >
                      <span className="min-w-0 flex-1 truncate text-xs">{s.subtopic}</span>
                      <span className="flex shrink-0 items-center gap-2 text-xs tabular-nums">
                        {s.wrong > 0 && (
                          <span className="text-red-600 dark:text-red-400">{s.wrong} wrong</span>
                        )}
                        {s.seenBlank > 0 && (
                          <span className="text-amber-600 dark:text-amber-400">
                            {s.seenBlank} skipped
                          </span>
                        )}
                        <Score row={s} />
                      </span>
                    </li>
                  ))
                )}
              </ul>
            )}
          </li>
        );
      })}
    </ul>
  );
}

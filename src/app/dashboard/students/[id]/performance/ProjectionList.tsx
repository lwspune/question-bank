"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { pageOf, PERF_PAGE_SIZE } from "@/lib/paging";
import type { Projection, ProjectionSubtopicRow } from "@/lib/performance/compute";
import Pager from "./Pager";

/**
 * The projected-score breakdown at two grains, paged.
 *
 * This card carried the page's one SILENT truncation: `rows.slice(0, 10)` under
 * a heading promising a ranking of recoverable marks, on a list running to 31
 * chapters for NDA Mathematics. The headline total was always summed over every
 * row, so the number was right and the list simply omitted 21 chapters without
 * saying so — the failure mode nobody reports, because a shorter ranking still
 * looks like a ranking.
 *
 * The SUBTOPIC grain (migration 0100) is the one idea taken wholesale from
 * nda-tracker's card, including the part that makes it work: the ranking is FLAT
 * ACROSS CHAPTERS. "Which subtopic anywhere is worth the most" is the question a
 * student actually has tonight; "which subtopic within this chapter" is not.
 *
 * Both grains read one number — a chapter's marks are the SUM of its subtopics'
 * — so the toggle cannot show two stories. The headline total never changes.
 */
type Grain = "chapter" | "subtopic";

export default function ProjectionList({ projection }: { projection: Projection }) {
  const [grain, setGrain] = useState<Grain>("chapter");
  const [page, setPage] = useState(1);

  const rows = grain === "chapter" ? projection.rows : projection.subtopicRows;
  const p = pageOf(rows, page, PERF_PAGE_SIZE);

  const switchTo = (next: Grain) => {
    setGrain(next);
    // Page 1 of the other grain — page 4 of 7 chapters means nothing among 111
    // subtopics, and silently landing mid-list reads as a lost ranking.
    setPage(1);
  };

  return (
    <div className="rounded-lg border bg-card">
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b p-4">
        <span className="text-sm text-muted-foreground">Projected</span>
        <div className="flex items-center gap-3">
          {projection.subtopicRows.length > 0 && (
            <div className="flex items-center gap-1" role="group" aria-label="Breakdown grain">
              <GrainButton active={grain === "chapter"} onClick={() => switchTo("chapter")}>
                Chapters
              </GrainButton>
              <GrainButton active={grain === "subtopic"} onClick={() => switchTo("subtopic")}>
                Subtopics
              </GrainButton>
            </div>
          )}
          <span className="text-2xl font-semibold tabular-nums">
            {projection.total}
            <span className="text-sm font-normal text-muted-foreground"> / {projection.ceiling}</span>
          </span>
        </div>
      </div>
      <ul className="divide-y">
        {p.rows.map((r) => (
          <li
            key={grain === "chapter" ? r.chapter : `${r.chapter}||${(r as ProjectionSubtopicRow).subtopic}`}
            className="flex flex-wrap items-center gap-x-3 gap-y-1 p-3"
          >
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm">
                {grain === "chapter" ? r.chapter : (r as ProjectionSubtopicRow).subtopic}
              </span>
              <span className="block truncate text-xs text-muted-foreground">
                {grain === "subtopic" && r.chapter}
                {/* An untested row is the largest gap there is, so it says so
                    rather than reading as a score of zero. */}
                {!r.tested && (grain === "subtopic" ? " · never tested" : "never tested")}
                {r.tested && r.thin && (
                  <>
                    {grain === "subtopic" && " · "}
                    {r.accuracy}% of {r.judged} · thin
                  </>
                )}
              </span>
            </span>
            <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
              {r.projected.toFixed(1)} of {r.marksAtStake.toFixed(1)} marks
            </span>
            <span className="shrink-0 text-sm font-semibold tabular-nums text-brand-accent">
              +{r.gap.toFixed(1)}
            </span>
          </li>
        ))}
      </ul>
      <Pager
        page={p.page}
        pageCount={p.pageCount}
        from={p.from}
        to={p.to}
        total={p.total}
        noun={grain === "chapter" ? "chapters" : "subtopics"}
        onPage={setPage}
      />
    </div>
  );
}

function GrainButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        active ? "border-brand-accent bg-brand text-brand-foreground" : "hover:bg-accent"
      )}
    >
      {children}
    </button>
  );
}

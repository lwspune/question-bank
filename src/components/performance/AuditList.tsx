"use client";

import { useState } from "react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { pageOf, PERF_PAGE_SIZE } from "@/lib/paging";
import { browseExtrasHref, openLabel } from "@/lib/performance/links";
import type { SubtopicRow } from "@/lib/performance/compute";
import Pager from "./Pager";

/**
 * The wrong-answer and skipped audits, paged.
 *
 * It used to render `rows.slice(0, 12)` under a footer reading "Showing the 12
 * worst of 106" whose only link went BACK TO THE PROFILE — a dead end that
 * named the missing rows without offering any way to reach them. On the
 * heaviest student that hid 94 of 106 subtopics.
 *
 * Paged rather than expanded so the ranked head keeps its meaning: these lists
 * are sorted by severity, and an expander turns the tail into a wall the reader
 * scrolls past rather than a place they choose to go.
 *
 * BOTH kinds open their questions. The skipped audit went without a drill-down
 * for one reason only — the core collected `wrongIds` and not `seenBlankIds` —
 * and the Time analysis card is the argument for closing that: the heaviest
 * student spent 44% of their clock on questions they ultimately left blank,
 * which is a larger body of engaged-but-unfinished work than their wrong
 * answers. Never-reached questions stay out of both, here and in the core.
 */
export default function AuditList({
  rows,
  kind,
}: {
  rows: SubtopicRow[];
  kind: "wrong" | "skipped";
}) {
  const [page, setPage] = useState(1);
  const p = pageOf(rows, page, PERF_PAGE_SIZE);

  return (
    <div className="rounded-lg border bg-card">
      <ul className="divide-y">
        {p.rows.map((r) => {
          // The exact questions, not a filter that approximates them — `extras`
          // takes question ids directly.
          const ids = kind === "wrong" ? r.wrongQuestionIds : r.seenBlankQuestionIds;
          const href = browseExtrasHref(ids);
          return (
            <li
              key={`${r.chapter}-${r.subtopic}`}
              className="flex flex-wrap items-center gap-x-3 gap-y-1 p-3"
            >
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-medium">{r.subtopic}</span>
                <span className="block truncate text-xs text-muted-foreground">{r.chapter}</span>
              </span>
              <span
                className={cn(
                  "shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold tabular-nums",
                  kind === "wrong"
                    ? "bg-red-500/10 text-red-600 dark:text-red-400"
                    : "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                )}
              >
                {kind === "wrong" ? `${r.wrong} wrong` : `${r.seenBlank} skipped`}
              </span>
              {href && (
                <Link
                  prefetch={false}
                  href={href}
                  // "Open 6" is meaningless to anyone arriving by link list.
                  aria-label={`Open the ${kind === "wrong" ? "wrong" : "skipped"} questions in ${r.subtopic}`}
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                  {/* Reads the CAP, not the raw count: the label has to describe
                      what the href will actually open. */}
                  {openLabel(ids.length)}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
      <Pager
        page={p.page}
        pageCount={p.pageCount}
        from={p.from}
        to={p.to}
        total={p.total}
        noun="subtopics"
        onPage={setPage}
      />
    </div>
  );
}

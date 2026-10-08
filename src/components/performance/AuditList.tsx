"use client";

import { useState } from "react";
import Link from "next/link";
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
    <div className="rounded-2xl border bg-card">
      <ul className="divide-y">
        {p.rows.map((r) => {
          // The exact questions, not a filter that approximates them — `extras`
          // takes question ids directly.
          const ids = kind === "wrong" ? r.wrongQuestionIds : r.seenBlankQuestionIds;
          const href = browseExtrasHref(ids);
          const count = kind === "wrong" ? `${r.wrong} wrong` : `${r.seenBlank} skipped`;
          return (
            <li key={`${r.chapter}-${r.subtopic}`} className="flex items-center justify-between gap-3 p-4">
              <span className="min-w-0">
                <span className="block text-sm font-medium">{r.subtopic}</span>
                <span className="block text-xs text-muted-foreground">
                  {r.chapter} ·{" "}
                  <span className={kind === "wrong" ? "text-red-600 dark:text-red-400" : "text-amber-700 dark:text-amber-400"}>
                    {count}
                  </span>
                </span>
              </span>
              {href && (
                <Link
                  prefetch={false}
                  href={href}
                  // "Practise 6" is meaningless to anyone arriving by link list.
                  aria-label={`${kind === "wrong" ? "Practise the wrong" : "Try the skipped"} questions in ${r.subtopic}`}
                  className={cn(
                    "inline-flex shrink-0 items-center rounded-xl px-3 py-2 text-xs font-semibold transition-colors",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                    kind === "wrong" ? "bg-brand text-brand-foreground hover:bg-brand/90" : "border hover:bg-accent"
                  )}
                >
                  {/* Reads the CAP, not the raw count: the label has to describe
                      what the href will actually open. */}
                  {openLabel(ids.length, kind === "wrong" ? "Practise" : "Try")}
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
        noun="topics"
        onPage={setPage}
      />
    </div>
  );
}

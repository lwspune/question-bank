"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * The pager under a ranked list card.
 *
 * COMPACT BY NECESSITY, not by taste: the largest skipped audit in production
 * is 106 subtopics, which is 22 pages at the page size these cards use. A row
 * of numbered page buttons would be wider than the card it sits in, so this is
 * prev / position / next.
 *
 * Client-side paging, with no URL parameter and no refetch. The whole payload
 * is already computed on the server — every row this hides is in memory — so a
 * round trip would re-run a 1 MB RPC to show five rows it already had.
 * The cost of that decision, stated plainly: a page position is not shareable
 * or restorable from the URL, which is the right trade for an audit list you
 * read top-down once.
 */
export default function Pager({
  page,
  pageCount,
  from,
  to,
  total,
  noun,
  onPage,
}: {
  page: number;
  pageCount: number;
  from: number;
  to: number;
  total: number;
  /** Plural noun for the count line, e.g. "subtopics". */
  noun: string;
  onPage: (next: number) => void;
}) {
  if (pageCount <= 1) return null;

  return (
    <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t p-3">
      <p className="text-xs text-muted-foreground" aria-live="polite">
        Showing <span className="font-medium text-foreground">{from}–{to}</span> of {total}{" "}
        {noun}, worst first
      </p>
      <div className="flex items-center gap-1">
        <PageButton
          label="Previous page"
          disabled={page <= 1}
          onClick={() => onPage(page - 1)}
        >
          <ChevronLeft className="h-4 w-4" aria-hidden />
        </PageButton>
        <span className="px-2 text-xs tabular-nums text-muted-foreground">
          Page {page} of {pageCount}
        </span>
        <PageButton
          label="Next page"
          disabled={page >= pageCount}
          onClick={() => onPage(page + 1)}
        >
          <ChevronRight className="h-4 w-4" aria-hidden />
        </PageButton>
      </div>
    </div>
  );
}

function PageButton({
  label,
  disabled,
  onClick,
  children,
}: {
  label: string;
  disabled: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "inline-flex h-7 w-7 items-center justify-center rounded-md border transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        disabled ? "cursor-not-allowed opacity-40" : "hover:bg-accent"
      )}
    >
      {children}
    </button>
  );
}

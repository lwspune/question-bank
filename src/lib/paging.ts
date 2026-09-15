/**
 * Page arithmetic for ranked list cards. Pure — no React, no I/O.
 *
 * WHY A HELPER AND NOT AN INLINE `slice`. Every list that uses this is sorted
 * worst-first, so an off-by-one does not render as a broken page: it renders as
 * a slightly different diagnosis, which is the kind of defect nobody reports.
 * The clamping below is the load-bearing part — a stale page number, a list
 * that shrank between renders, or a NaN out of a URL must still show data
 * rather than an empty card that reads as "nothing to review".
 *
 * Spec: tests/paging.test.ts.
 */

/**
 * Rows per page on the /dashboard/students/[id]/performance list cards.
 *
 * Deliberately one exported constant rather than a literal at each call site:
 * the largest skipped audit in production is 106 rows, which is 22 pages here,
 * and the size is the only dial that changes that.
 */
export const PERF_PAGE_SIZE = 5;

export type Page<T> = {
  rows: T[];
  /** The page actually shown, after clamping — not the page that was asked for. */
  page: number;
  pageCount: number;
  /** 1-indexed position of the first and last row shown; both 0 on an empty list. */
  from: number;
  to: number;
  total: number;
};

export function pageOf<T>(items: readonly T[], page: number, size: number): Page<T> {
  // Math.max(1, NaN) is NaN, so NaN has to be tested for rather than clamped —
  // slice(NaN, NaN) returns [] and the card silently empties.
  const perPage = Number.isFinite(size) && size >= 1 ? Math.floor(size) : 1;
  const total = items.length;
  // One page, never zero: "page 1 of 0" is not a thing a reader can act on.
  const pageCount = Math.max(1, Math.ceil(total / perPage));
  const wanted = Number.isFinite(page) ? Math.floor(page) : 1;
  const current = Math.min(pageCount, Math.max(1, wanted));

  const start = (current - 1) * perPage;
  const rows = items.slice(start, start + perPage);

  return {
    rows,
    page: current,
    pageCount,
    from: rows.length === 0 ? 0 : start + 1,
    to: rows.length === 0 ? 0 : start + rows.length,
    total,
  };
}

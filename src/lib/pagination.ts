/**
 * Pure pagination helpers. No I/O; tested in tests/pagination.test.ts.
 *
 * `visiblePages` is the page-number strip /browse's server pager renders;
 * `paginate` slices an in-memory list for a client-side pager (the
 * /dashboard/students roster, which filters and sorts the whole list in the
 * browser and pages only the table).
 */

export type Page<T> = {
  items: T[];
  /** The page actually shown, clamped into 1..totalPages. */
  page: number;
  /** Always at least 1, so an empty list is "page 1 of 1", never "of 0". */
  totalPages: number;
  /** 1-based position of the first and last item shown; both 0 when empty. */
  from: number;
  to: number;
  total: number;
};

export function paginate<T>(rows: readonly T[], page: number, pageSize: number): Page<T> {
  const total = rows.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const wanted = Number.isFinite(page) ? Math.floor(page) : 1;
  const current = Math.min(Math.max(wanted, 1), totalPages);
  const start = (current - 1) * pageSize;
  const items = rows.slice(start, start + pageSize);
  return {
    items,
    page: current,
    totalPages,
    from: items.length === 0 ? 0 : start + 1,
    to: start + items.length,
    total,
  };
}

/** First, last, and the current page's neighbours; gaps collapse to "…". */
export function visiblePages(current: number, total: number): (number | "…")[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  const out: (number | "…")[] = [1];
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  if (start > 2) out.push("…");
  for (let i = start; i <= end; i++) out.push(i);
  if (end < total - 1) out.push("…");
  out.push(total);
  return out;
}

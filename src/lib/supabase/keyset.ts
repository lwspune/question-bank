/**
 * Keyset paging for PostgREST reads that pass its 1000-row cap (2026-11-08).
 *
 * `.range()` pages with OFFSET, and Postgres builds every skipped row before
 * throwing it away, embedded resources included: page 4 of the largest
 * homework plan ran its question->chapter lookup 3,256 times to return 256
 * rows, and that read was 21% of all database reads in the 36 hours measured.
 * Asking for the rows AFTER the last one read builds each row once.
 *
 * The caller orders by the same columns, in the same order, that it passes to
 * `keysetAfter`, and those columns must make each row unique. Spec:
 * tests/keyset-paging.test.ts.
 */

/**
 * A PostgREST `or=(...)` body naming every row after `last` in the order of
 * `cols`: (a > x) or (a = x and b > y) or ... . Whole numbers only, so nothing
 * from a row can be read as filter syntax.
 */
export function keysetAfter<K extends string>(cols: readonly K[], last: Record<K, number>): string {
  for (const c of cols) {
    if (!Number.isInteger(last[c])) throw new Error(`keysetAfter: ${c} is not a whole number (${last[c]})`);
  }
  return cols
    .map((col, i) => {
      const equal = cols.slice(0, i).map((c) => `${c}.eq.${last[c]}`);
      const parts = [...equal, `${col}.gt.${last[col]}`];
      return parts.length === 1 ? parts[0] : `and(${parts.join(",")})`;
    })
    .join(",");
}

/**
 * Every row, one page at a time: `fetchPage(last, limit)` returns up to `limit`
 * rows after `last` (null for the first page), in key order. A short page ends
 * the read.
 */
export async function readAllByKeyset<T>(
  fetchPage: (last: T | null, limit: number) => Promise<T[]>,
  pageSize: number
): Promise<T[]> {
  const out: T[] = [];
  let last: T | null = null;
  for (;;) {
    const page = await fetchPage(last, pageSize);
    out.push(...page);
    if (page.length < pageSize) return out;
    last = page[page.length - 1];
  }
}

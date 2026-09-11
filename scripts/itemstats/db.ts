/**
 * Shared read helpers for the item-stats CLIs.
 *
 * Extracted rather than copied into each script: both limits below have bitten
 * this codebase repeatedly, and a duplicated pager is how one copy silently
 * loses the fix.
 */

/** PostgREST truncates a `.select()` at 1000 rows with NO error. Page everything. */
export const PAGE = 1000;

/**
 * A `.in()` list rides in the URL, and ~833 uuids has been observed to return a
 * bare `Bad Request`. Paging a RESULT and chunking a FILTER are different limits
 * and only one of them is 1000.
 */
export const IN_CHUNK = 200;

type Row = Record<string, unknown>;

export async function pageAll(
  build: (from: number, to: number) => PromiseLike<{ data: Row[] | null; error: unknown }>
): Promise<Row[]> {
  const out: Row[] = [];
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await build(from, from + PAGE - 1);
    if (error) throw new Error(`read failed: ${JSON.stringify(error)}`);
    const batch = data ?? [];
    out.push(...batch);
    if (batch.length < PAGE) return out;
  }
}

export function chunk<T>(xs: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < xs.length; i += size) out.push(xs.slice(i, i + size));
  return out;
}

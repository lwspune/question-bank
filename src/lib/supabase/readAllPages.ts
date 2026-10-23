/**
 * Read every row of a query, a page at a time.
 *
 * PostgREST returns at most 1000 rows and says nothing when it stops there, so an
 * unpaged `.select()` that grows past 1000 silently loses the rest (CLAUDE.md,
 * "PostgREST 1000-row cap"). Pass a function that applies `.range(from, to)` to the
 * query; the query must be ORDERED by something unique (end with `.order("id")`),
 * or rows can repeat or go missing between pages.
 *
 * Unit-tested in tests/read-all-pages.test.ts.
 */

export const PAGE_SIZE = 1000;

export async function readAllPages<T>(
  page: (from: number, to: number) => PromiseLike<{ data: T[] | null; error: { message: string } | null }>,
  size: number = PAGE_SIZE
): Promise<T[]> {
  const out: T[] = [];
  for (let from = 0; ; from += size) {
    const { data, error } = await page(from, from + size - 1);
    if (error) throw new Error(error.message);
    const rows = data ?? [];
    out.push(...rows);
    if (rows.length < size) return out;
  }
}

/**
 * Every row for a long list of ids, without either PostgREST limit.
 *
 * Two separate limits sit on one query (CLAUDE.md, "PostgREST 1000-row cap"): `.in("col", ids)`
 * puts the ids in the URL, so a few hundred uuids overflow it (a bare Bad Request at 833 ids),
 * and the RESULT stops silently at 1,000 rows. This sends the ids 200 at a time and pages each
 * chunk with readAllPages. Duplicate ids are sent once; an empty list makes no request.
 *
 * `read(ids, from, to)` must apply `.in(<col>, ids)` and `.range(from, to)` to a query ORDERED by
 * something unique, or rows can repeat or go missing between pages:
 *
 *   readInChunks(questionIds, (ids, from, to) =>
 *     db.from("options").select("id, question_id").in("question_id", ids).order("id").range(from, to))
 *
 * Unit-tested in tests/read-in-chunks.test.ts (TECH_DEBT_SPEC.md 3.4).
 */
import { readAllPages, PAGE_SIZE } from "./readAllPages";

/** Ids per request: ~7.5 KB of uuids, well inside the URL limit. */
export const ID_CHUNK = 200;

export async function readInChunks<T>(
  ids: readonly string[],
  read: (ids: string[], from: number, to: number) => PromiseLike<{ data: T[] | null; error: { message: string } | null }>,
  opts: { chunk?: number; pageSize?: number } = {}
): Promise<T[]> {
  const unique = [...new Set(ids)];
  const chunk = opts.chunk ?? ID_CHUNK;
  const out: T[] = [];
  for (let i = 0; i < unique.length; i += chunk) {
    const part = unique.slice(i, i + chunk);
    out.push(...(await readAllPages<T>((from, to) => read(part, from, to), opts.pageSize ?? PAGE_SIZE)));
  }
  return out;
}

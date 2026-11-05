/**
 * readInChunks: rows for a long id list, without either PostgREST limit (TECH_DEBT_SPEC.md 3.4).
 *
 * WHY: two separate limits sit on one query (CLAUDE.md pitfalls). `.in("col", ids)` puts the ids
 * in the URL, so a few hundred uuids overflow it (a bare Bad Request at 833 ids); the RESULT stops
 * silently at 1,000 rows. On 2026-11-05, 25 files chunked ids by hand (21 local constants) and 32
 * wrote their own paging loops. This helper does both in one call.
 */
import { describe, it, expect } from "vitest";
import { readInChunks } from "@/lib/supabase/readInChunks";

type Call = { ids: string[]; from: number; to: number };

/** A fake query: `rowsPerId` rows for each id, served a page at a time. */
function fake(rowsPerId: number) {
  const calls: Call[] = [];
  const read = async (ids: string[], from: number, to: number) => {
    calls.push({ ids, from, to });
    const all = ids.flatMap((id) => Array.from({ length: rowsPerId }, (_, k) => ({ id, k })));
    return { data: all.slice(from, to + 1), error: null };
  };
  return { calls, read };
}

const ids = (n: number) => Array.from({ length: n }, (_, i) => `id-${i}`);

describe("readInChunks", () => {
  it("sends at most 200 ids per request", async () => {
    const f = fake(1);
    const rows = await readInChunks(ids(450), f.read);
    expect(f.calls.map((c) => c.ids.length)).toEqual([200, 200, 50]);
    expect(rows).toHaveLength(450);
  });

  it("pages a chunk whose rows pass 1,000", async () => {
    const f = fake(7); // 200 ids x 7 rows = 1,400 rows in the first chunk
    const rows = await readInChunks(ids(200), f.read);
    expect(f.calls.map((c) => [c.from, c.to])).toEqual([
      [0, 999],
      [1000, 1999],
    ]);
    expect(rows).toHaveLength(1400);
  });

  it("makes no request for an empty list", async () => {
    const f = fake(1);
    expect(await readInChunks([], f.read)).toEqual([]);
    expect(f.calls).toHaveLength(0);
  });

  it("sends each id once", async () => {
    const f = fake(1);
    await readInChunks(["a", "b", "a", "c", "b"], f.read);
    expect(f.calls[0].ids).toEqual(["a", "b", "c"]);
  });

  it("takes a smaller chunk when asked", async () => {
    const f = fake(1);
    await readInChunks(ids(5), f.read, { chunk: 2 });
    expect(f.calls.map((c) => c.ids.length)).toEqual([2, 2, 1]);
  });

  it("throws the query's error instead of returning a short list", async () => {
    const read = async () => ({ data: null, error: { message: "boom" } });
    await expect(readInChunks(["a"], read)).rejects.toThrow("boom");
  });
});

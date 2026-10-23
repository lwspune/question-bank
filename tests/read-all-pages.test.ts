import { describe, expect, it } from "vitest";
import { readAllPages } from "@/lib/supabase/readAllPages";

/** A fake PostgREST range read over `n` rows, recording every range asked for. */
function source(n: number) {
  const rows = Array.from({ length: n }, (_, i) => i);
  const asked: [number, number][] = [];
  const page = async (from: number, to: number) => {
    asked.push([from, to]);
    return { data: rows.slice(from, to + 1), error: null };
  };
  return { page, asked };
}

describe("readAllPages", () => {
  it("returns every row past PostgREST's 1000-row cap", async () => {
    const { page } = source(2345);
    const all = await readAllPages(page);
    expect(all).toHaveLength(2345);
    expect(all.at(-1)).toBe(2344);
  });

  it("stops on the first short page", async () => {
    const { page, asked } = source(1500);
    await readAllPages(page);
    expect(asked).toEqual([
      [0, 999],
      [1000, 1999],
    ]);
  });

  it("reads one more page when the rows end exactly on a page boundary", async () => {
    const { page, asked } = source(2000);
    expect(await readAllPages(page)).toHaveLength(2000);
    expect(asked).toHaveLength(3);
  });

  it("throws on an error rather than returning what it had", async () => {
    await expect(
      readAllPages(async () => ({ data: null, error: { message: "timeout" } }))
    ).rejects.toThrow("timeout");
  });
});

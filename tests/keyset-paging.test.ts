/**
 * Keyset paging (2026-11-08). `.range()` pages with OFFSET, and with an
 * embedded resource PostgREST runs the embed for every SKIPPED row too: page 4
 * of the largest homework plan ran its question->chapter lookup 3,256 times to
 * return 256 rows. Paging "after the last row" runs it once per row returned.
 */
import { describe, it, expect } from "vitest";
import { keysetAfter, readAllByKeyset } from "@/lib/supabase/keyset";

describe("keysetAfter", () => {
  it("names every row after the last one, column by column", () => {
    expect(keysetAfter(["day", "position", "sub"], { day: 3, position: 2, sub: 1 })).toBe(
      "day.gt.3,and(day.eq.3,position.gt.2),and(day.eq.3,position.eq.2,sub.gt.1)"
    );
  });

  it("is a plain comparison for one column", () => {
    expect(keysetAfter(["day"], { day: 7 })).toBe("day.gt.7");
  });

  it("refuses a value that is not a whole number, which would break the filter", () => {
    expect(() => keysetAfter(["day"], { day: Number.NaN })).toThrow();
    expect(() => keysetAfter(["day"], { day: 1.5 })).toThrow();
  });
});

type Row = { day: number; position: number; sub: number };

/** An in-memory table in key order, read the way the database would. */
function table(rows: Row[]) {
  const sorted = [...rows].sort((a, b) => a.day - b.day || a.position - b.position || a.sub - b.sub);
  const calls: (Row | null)[] = [];
  const after = (r: Row, last: Row) =>
    r.day > last.day ||
    (r.day === last.day && r.position > last.position) ||
    (r.day === last.day && r.position === last.position && r.sub > last.sub);
  const fetchPage = async (last: Row | null, limit: number) => {
    calls.push(last);
    return sorted.filter((r) => last === null || after(r, last)).slice(0, limit);
  };
  return { sorted, calls, fetchPage };
}

describe("readAllByKeyset", () => {
  const rows: Row[] = [
    { day: 2, position: 1, sub: 1 },
    { day: 1, position: 1, sub: 2 },
    { day: 1, position: 1, sub: 1 },
    { day: 1, position: 2, sub: 1 },
    { day: 3, position: 1, sub: 1 },
  ];

  it("reads every row once, in key order, across pages", async () => {
    const t = table(rows);
    expect(await readAllByKeyset(t.fetchPage, 2)).toEqual(t.sorted);
    // Pages of 2, 2, 1: the third is short, so no fourth read.
    expect(t.calls).toEqual([null, t.sorted[1], t.sorted[3]]);
  });

  it("asks once more when the last page is exactly full", async () => {
    const t = table(rows.slice(0, 4));
    expect(await readAllByKeyset(t.fetchPage, 2)).toEqual(t.sorted);
    expect(t.calls).toHaveLength(3);
  });

  it("reads an empty table in one call", async () => {
    const t = table([]);
    expect(await readAllByKeyset(t.fetchPage, 1000)).toEqual([]);
    expect(t.calls).toEqual([null]);
  });
});

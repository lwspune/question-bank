import { describe, it, expect } from "vitest";
import { planChapterShuffles } from "../scripts/afcat/lib";

// content_hash includes the answer LETTER, so re-planning a row that is already
// in the database moves its letter, changes its hash, and the next commit
// inserts a duplicate. Found 2026-10-14 when the Mixture Errorless file joined
// a chapter whose quiz rows were already committed.
const row = (id: string, answer: string, frozen: boolean, eligible = true) => ({ id, answer, eligible, frozen });

describe("planChapterShuffles", () => {
  it("never moves a frozen (committed) row, and keeps its existing entry", () => {
    const rows = [row("01-1", "A", true), row("01-2", "A", true), row("01-3", "A", true), row("01-4", "A", true)];
    expect(planChapterShuffles(rows, { "01-1": "A" })).toEqual({ "01-1": "A" });
  });

  it("balances the chapter by moving only new rows, counting the frozen ones", () => {
    // committed: B B B B (already lopsided); new: B B B B -> new rows go to A, C, D
    const rows = [
      ...["01-1", "01-2", "01-3", "01-4"].map((id) => row(id, "B", true)),
      ...["02-101", "02-102", "02-103", "02-104"].map((id) => row(id, "B", false)),
    ];
    const plan = planChapterShuffles(rows, {});
    expect(Object.keys(plan).every((id) => id.startsWith("02-"))).toBe(true);
    expect(Object.keys(plan).length).toBeGreaterThan(0);
  });

  it("drops a stale entry for a row that is not frozen and replans it", () => {
    const rows = [row("02-101", "A", false), row("02-102", "B", false), row("02-103", "C", false), row("02-104", "D", false)];
    expect(planChapterShuffles(rows, { "02-101": "D" })).toEqual({});
  });

  it("does not move an ineligible new row", () => {
    const rows = [row("02-1", "A", false, false), row("02-2", "A", false, false), row("02-3", "A", false, false), row("02-4", "A", false, false)];
    expect(planChapterShuffles(rows, {})).toEqual({});
  });
});

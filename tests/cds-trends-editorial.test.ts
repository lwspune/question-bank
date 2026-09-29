/**
 * The /guide/cds-maths editorial layer against its own generated grid (offline — the grid is
 * committed; `npm run cds:matrix -- --check` is what ties the grid to the live bank).
 *
 * Two drifts this catches after the next ingest: a trend callout whose direction the data no longer
 * supports, and CHAPTER_TABLE (hand-run generator) disagreeing with the matrix (committed generator).
 */
import { describe, expect, it } from "vitest";
import { CHAPTER_MATRIX, PAPERS, PAPER_TOTALS } from "@/app/guide/cds-maths/_data/matrix.generated";
import { DRIFT_CALLOUTS, HARD_BY_YEAR, WINDOW_PAPERS, ratesFor } from "@/app/guide/cds-maths/_data/trends";
import { CHAPTER_TABLE, OVERVIEW } from "@/app/guide/cds-maths/_data/cds-maths";

describe("cds-maths trends", () => {
  it("every callout's direction agrees with the grid", () => {
    for (const c of DRIFT_CALLOUTS) {
      const r = ratesFor(c.chapter);
      if (c.direction === "up") expect(r.recent, c.chapter).toBeGreaterThan(r.early);
      else expect(r.recent, c.chapter).toBeLessThan(r.early);
    }
  });

  it("windows cover every paper", () => {
    expect(WINDOW_PAPERS.early + WINDOW_PAPERS.mid + WINDOW_PAPERS.recent).toBe(PAPERS.length);
    expect(PAPERS.length).toBe(OVERVIEW.papers);
  });

  it("HARD by year sums to the bank's HARD count", () => {
    expect(HARD_BY_YEAR.reduce((s, y) => s + y.hardQ, 0)).toBe(OVERVIEW.difficulty.hard);
    expect(PAPER_TOTALS.reduce((s, t) => s + t.total, 0)).toBe(OVERVIEW.totalQ);
  });

  it("CHAPTER_TABLE and the matrix agree chapter by chapter", () => {
    const table = new Map(CHAPTER_TABLE.map((c) => [c.chapter, c]));
    expect(new Set(CHAPTER_MATRIX.map((r) => r.chapter))).toEqual(new Set(table.keys()));
    for (const r of CHAPTER_MATRIX) {
      const row = table.get(r.chapter)!;
      expect(row.qCount, r.chapter).toBe(r.total);
      const w = ratesFor(r.chapter);
      expect(row.earlyPerPaper, r.chapter).toBeCloseTo(w.early, 2);
      expect(row.recentPerPaper, r.chapter).toBeCloseTo(w.recent, 2);
    }
  });
});

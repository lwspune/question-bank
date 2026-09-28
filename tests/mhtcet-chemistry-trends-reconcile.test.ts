/**
 * The MHT-CET Chemistry trends page states each fact twice — as prose in
 * `_data/trends.ts` and as the grid in `_data/matrix.generated.ts` — and this
 * suite stops the two drifting apart after the next ingest (the same job
 * tests/mhtcet-trends-reconcile.test.ts does for Maths). When it fails after
 * an ingest, re-derive the prose; do not widen a tolerance.
 *
 * The Chemistry grid's columns are PAPERS (year + pyq_note), not source files —
 * see canonicalPaperFiles in scripts/lib/mhtcetTrendsMatrix.ts. So unlike the
 * Maths grid, every Chemistry column is a whole dated or undated sitting and
 * holds at least 40 questions.
 */
import { describe, it, expect } from "vitest";
import { DRIFT_ROWS, HARD_BY_YEAR } from "@/app/guide/mht-cet-chemistry/_data/trends";
import {
  CHAPTER_MATRIX,
  MATRIX_META,
  PAPER_TOTALS,
  SHIFT_PAPERS,
  YEAR_COLUMNS,
  YEAR_RATES,
} from "@/app/guide/mht-cet-chemistry/_data/matrix.generated";

const WINDOW_YEARS: Record<string, number[]> = {
  "2023-2024": [2023, 2024],
  "2025": [2025],
  "before 2025": [2021, 2022, 2023, 2024],
};

function columnsFor(years: number[]): number[] {
  return SHIFT_PAPERS.flatMap((p, i) => (years.includes(p.year) ? [i] : []));
}

function chapterRow(chapter: string) {
  const row = CHAPTER_MATRIX.find((r) => r.chapter === chapter);
  if (!row) throw new Error(`no matrix row for ${chapter}`);
  return row;
}

function inYears(chapter: string, years: number[]): number {
  const counts = chapterRow(chapter).counts;
  return columnsFor(years).reduce((a, c) => a + counts[c], 0);
}

describe("the generated Chemistry grid agrees with itself", () => {
  it("has one column per paper, each a whole paper of 40-50 questions", () => {
    expect(SHIFT_PAPERS).toHaveLength(MATRIX_META.papers);
    SHIFT_PAPERS.forEach((p, i) => {
      const summed = CHAPTER_MATRIX.reduce((a, r) => a + r.counts[i], 0);
      expect(summed, p.id).toBe(PAPER_TOTALS[i]);
      expect(PAPER_TOTALS[i], p.id).toBeLessThanOrEqual(50);
      expect(PAPER_TOTALS[i], p.id).toBeGreaterThanOrEqual(40);
    });
  });

  it("every row total equals the sum of its cells, and the grid its questions", () => {
    for (const row of CHAPTER_MATRIX) {
      expect(row.counts.reduce((a, b) => a + b, 0), row.chapter).toBe(row.total);
    }
    const grand = CHAPTER_MATRIX.reduce((a, r) => a + r.total, 0);
    expect(grand).toBe(MATRIX_META.questions);
    expect(grand).toBe(PAPER_TOTALS.reduce((a, b) => a + b, 0));
  });

  it("the year-rate table is the same data over each year's own papers", () => {
    for (const rateRow of YEAR_RATES) {
      YEAR_COLUMNS.forEach((col, i) => {
        // rates are 2-dp: 0.875 prints as 0.88, half a hundredth off
        expect(
          Math.abs(rateRow.rates[i] - inYears(rateRow.chapter, [col.year]) / col.shifts),
          `${rateRow.chapter} ${col.year}`
        ).toBeLessThanOrEqual(0.00501);
      });
    }
  });

  it("agrees with HARD_BY_YEAR on papers and questions per year", () => {
    for (const y of HARD_BY_YEAR) {
      expect(YEAR_COLUMNS.find((c) => c.year === y.year)?.shifts, String(y.year)).toBe(y.papers);
      const q = CHAPTER_MATRIX.reduce((a, r) => a + inYears(r.chapter, [y.year]), 0);
      expect(q, String(y.year)).toBe(y.totalQ);
      expect(Math.round((y.hardQ / y.totalQ) * 100), String(y.year)).toBe(y.pctHard);
    }
  });
});

describe("the Chemistry narrative reconciles against the grid", () => {
  it("maps every window label, with the paper count it claims", () => {
    for (const row of DRIFT_ROWS) {
      for (const w of [row.from, row.to]) {
        expect(WINDOW_YEARS[w.label], `${row.chapter}: ${w.label}`).toBeDefined();
        expect(columnsFor(WINDOW_YEARS[w.label]), `${row.chapter}: ${w.label}`).toHaveLength(w.shifts);
      }
    }
  });

  it("agrees on every lifetime count, raw window count and rate", () => {
    let rates = 0;
    for (const row of DRIFT_ROWS) {
      expect(chapterRow(row.chapter).total, row.chapter).toBe(row.lifetimeQCount);
      for (const w of [row.from, row.to]) {
        const q = inYears(row.chapter, WINDOW_YEARS[w.label]);
        if (w.qInWindow !== null) expect(q, `${row.chapter}: ${w.label}`).toBe(w.qInWindow);
        if (w.qPerPaper !== null) {
          expect(q / w.shifts, `${row.chapter}: ${w.label}`).toBeCloseTo(w.qPerPaper, 2);
          rates += 1;
        }
      }
    }
    expect(rates).toBe(10);
  });

  it("still shows Structure of Atom halving and Modern Periodic Table falling", () => {
    for (const ch of ["Structure of Atom", "Modern Periodic Table"]) {
      const before = inYears(ch, [2023, 2024]) / columnsFor([2023, 2024]).length;
      const after = inYears(ch, [2025]) / columnsFor([2025]).length;
      expect(after, ch).toBeLessThan(before * 0.6);
    }
  });

  it("still shows the 2025 EASY share below 2023 and 2024", () => {
    const pct = (y: number) => {
      const r = HARD_BY_YEAR.find((h) => h.year === y)!;
      return r.easyQ / r.totalQ;
    };
    expect(pct(2025)).toBeLessThan(pct(2023) - 0.1);
    expect(pct(2025)).toBeLessThan(pct(2024) - 0.1);
  });
});

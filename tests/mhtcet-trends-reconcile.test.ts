/**
 * The MHT-CET Maths trends page states the same facts twice, and this suite is
 * what stops the two copies drifting apart.
 *
 * `_data/trends.ts` carries a hand-authored NARRATIVE — four chapters with a
 * story worth spelling out, each quoting a questions-per-paper rate for two
 * windows. `_data/matrix.generated.ts` carries the GRID those rates come from,
 * regenerated from the live bank by `npm run mhtcet:matrix`.
 *
 * THE FAILURE MODE THIS EXISTS FOR IS ASYMMETRIC DRIFT. After the next MHT-CET
 * ingest the grid regenerates and every number in it moves; the prose does not
 * move, because prose never does. The page would then print "1.0 q/paper" in a
 * callout directly above a table showing something else, and nothing in the
 * build would object — both files are internally consistent, they just no
 * longer agree. It is the same class of defect CLAUDE.md records for the
 * pipe-table renderers: fixing one surface and not the other, twice.
 *
 * So: every rate the narrative claims is recomputed here from the grid. When
 * this fails after an ingest, the fix is to re-derive the prose, not to widen
 * the tolerance.
 *
 * It also served as the first independent check that the generator is right at
 * all. The four narrative rows were derived by hand, months apart, from SQL
 * written for a different purpose — and all four reconcile to the generated
 * grid to the last printed decimal. Two independent derivations agreeing is
 * the only reason to believe either.
 */
import { describe, it, expect } from "vitest";
import { DRIFT_ROWS, HARD_BY_YEAR } from "@/app/guide/mht-cet-maths/_data/trends";
import {
  CHAPTER_MATRIX,
  MATRIX_META,
  PAPER_TOTALS,
  SHIFT_PAPERS,
  YEAR_COLUMNS,
  YEAR_RATES,
} from "@/app/guide/mht-cet-maths/_data/matrix.generated";

/**
 * Which years each narrative window covers.
 *
 * Keyed on the exact `DriftWindow.label` strings in trends.ts. The shift-count
 * assertion below is what proves a mapping is right: if "before 2025" were
 * mis-mapped, its papers would not come to the 31 the narrative claims.
 */
const WINDOW_YEARS: Record<string, number[]> = {
  "2023-2024": [2023, 2024],
  "2025": [2025],
  "before 2025": [2021, 2022, 2023, 2024],
  "lifetime (2021-2025)": [2021, 2022, 2023, 2024, 2025],
  "recent (2024-2025)": [2024, 2025],
};

/** Column indices of the grid belonging to the given years. */
function columnsFor(years: number[]): number[] {
  return SHIFT_PAPERS.flatMap((p, i) => (years.includes(p.year) ? [i] : []));
}

function chapterRow(chapter: string) {
  const row = CHAPTER_MATRIX.find((r) => r.chapter === chapter);
  if (!row) throw new Error(`no matrix row for ${chapter}`);
  return row;
}

describe("the generated grid agrees with itself", () => {
  it("has one column per paper and one count per column", () => {
    expect(SHIFT_PAPERS).toHaveLength(MATRIX_META.papers);
    expect(PAPER_TOTALS).toHaveLength(MATRIX_META.papers);
    for (const row of CHAPTER_MATRIX) {
      expect(row.counts, row.chapter).toHaveLength(MATRIX_META.papers);
    }
  });

  it("every column total is the paper's own length, and every paper is short of or at 50", () => {
    // The completeness proof the page's footer renders. A column summing to
    // something other than its paper's question count means a lost cell.
    SHIFT_PAPERS.forEach((p, i) => {
      const summed = CHAPTER_MATRIX.reduce((a, r) => a + r.counts[i], 0);
      expect(summed, p.id).toBe(PAPER_TOTALS[i]);
      expect(PAPER_TOTALS[i], p.id).toBeLessThanOrEqual(50);
      expect(PAPER_TOTALS[i], p.id).toBeGreaterThan(40);
    });
  });

  it("every row total equals the sum of its own cells", () => {
    for (const row of CHAPTER_MATRIX) {
      expect(row.counts.reduce((a, b) => a + b, 0), row.chapter).toBe(row.total);
    }
  });

  it("the whole grid holds exactly the questions it claims", () => {
    const grand = CHAPTER_MATRIX.reduce((a, r) => a + r.total, 0);
    expect(grand).toBe(MATRIX_META.questions);
    expect(grand).toBe(PAPER_TOTALS.reduce((a, b) => a + b, 0));
  });

  it("the year-rate table is the same data, divided by each year's own papers", () => {
    for (const rateRow of YEAR_RATES) {
      const row = chapterRow(rateRow.chapter);
      expect(rateRow.total, rateRow.chapter).toBe(row.total);
      YEAR_COLUMNS.forEach((col, i) => {
        const q = columnsFor([col.year]).reduce((a, c) => a + row.counts[c], 0);
        expect(rateRow.rates[i], `${rateRow.chapter} ${col.year}`).toBeCloseTo(
          q / col.shifts,
          2
        );
      });
    }
  });

  it("agrees with HARD_BY_YEAR about how many papers each year has", () => {
    // Two independently derived statements about the same bank. HARD_BY_YEAR
    // was authored by hand; YEAR_COLUMNS is counted from source files.
    for (const y of HARD_BY_YEAR) {
      const col = YEAR_COLUMNS.find((c) => c.year === y.year);
      expect(col, String(y.year)).toBeDefined();
      expect(col!.shifts, String(y.year)).toBe(y.papers);
    }
  });

  it("agrees with HARD_BY_YEAR about how many questions each year holds", () => {
    for (const y of HARD_BY_YEAR) {
      const cols = columnsFor([y.year]);
      const q = CHAPTER_MATRIX.reduce(
        (a, r) => a + cols.reduce((s, c) => s + r.counts[c], 0),
        0
      );
      expect(q, String(y.year)).toBe(y.totalQ);
    }
  });
});

describe("the hand-authored narrative reconciles against the grid", () => {
  it("covers every window label the narrative uses", () => {
    // A window this suite cannot map is a window it silently skips — which
    // would make the whole reconciliation quietly vacuous.
    for (const row of DRIFT_ROWS) {
      for (const w of [row.from, row.to]) {
        expect(WINDOW_YEARS[w.label], `${row.chapter}: ${w.label}`).toBeDefined();
      }
    }
  });

  it("agrees on how many shifts each window covers", () => {
    for (const row of DRIFT_ROWS) {
      for (const w of [row.from, row.to]) {
        expect(
          columnsFor(WINDOW_YEARS[w.label]),
          `${row.chapter}: ${w.label}`
        ).toHaveLength(w.shifts);
      }
    }
  });

  it("agrees on each chapter's lifetime question count", () => {
    for (const row of DRIFT_ROWS) {
      expect(chapterRow(row.chapter).total, row.chapter).toBe(
        row.lifetimeQCount
      );
    }
  });

  it("agrees on every questions-per-paper rate the narrative claims", () => {
    // The load-bearing assertion. `qPerPaper: null` means the narrative
    // deliberately declined to state a rate for that window, so there is
    // nothing to check — that is a refusal, not a gap.
    let checked = 0;
    for (const row of DRIFT_ROWS) {
      for (const w of [row.from, row.to]) {
        if (w.qPerPaper === null) continue;
        const cols = columnsFor(WINDOW_YEARS[w.label]);
        const counts = chapterRow(row.chapter).counts;
        const q = cols.reduce((a, c) => a + counts[c], 0);
        expect(q / cols.length, `${row.chapter}: ${w.label}`).toBeCloseTo(
          w.qPerPaper,
          2
        );
        checked += 1;
      }
    }
    // Guard against the suite passing because it checked nothing.
    expect(checked).toBeGreaterThanOrEqual(6);
  });

  it("agrees on every raw window count the narrative claims", () => {
    let checked = 0;
    for (const row of DRIFT_ROWS) {
      for (const w of [row.from, row.to]) {
        if (w.qInWindow === null) continue;
        const cols = columnsFor(WINDOW_YEARS[w.label]);
        const counts = chapterRow(row.chapter).counts;
        expect(
          cols.reduce((a, c) => a + counts[c], 0),
          `${row.chapter}: ${w.label}`
        ).toBe(w.qInWindow);
        checked += 1;
      }
    }
    expect(checked).toBeGreaterThanOrEqual(3);
  });

  it("still shows Measures of Dispersion leaving the paper", () => {
    // The page's headline, asserted against the grid rather than the prose.
    // If an ingest ever puts this chapter back on a 2025 paper, the callout
    // saying "give it no revision time" becomes wrong and must be rewritten.
    const row = chapterRow("Measures of Dispersion");
    const in2025 = columnsFor([2025]).reduce((a, c) => a + row.counts[c], 0);
    expect(in2025).toBe(0);
    const in2324 = columnsFor([2023, 2024]).reduce((a, c) => a + row.counts[c], 0);
    expect(in2324).toBeGreaterThan(0);
  });

  it("still shows Conic Sections arriving", () => {
    const row = chapterRow("Conic Sections");
    const before = columnsFor([2021, 2022, 2023, 2024]).reduce(
      (a, c) => a + row.counts[c],
      0
    );
    const in2025 = columnsFor([2025]).reduce((a, c) => a + row.counts[c], 0);
    // The claim is a step change, not merely "more" — at these shift counts
    // (31 before, 14 in 2025) anything less would not carry the callout.
    expect(in2025 / 14).toBeGreaterThan((before / 31) * 5);
  });
});

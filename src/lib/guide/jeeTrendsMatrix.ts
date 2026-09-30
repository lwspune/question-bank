/**
 * Pure core of the JEE Mains Maths chapter x YEAR matrix behind /guide/jee-mains-maths/trends
 * (generator: scripts/jee-maths/trends-matrix.ts; lives in src/ because the guide pages compute rates at render time).
 *
 * WHY YEARS, NOT PAPERS. JEE runs about twenty sittings a year, and from 2022 to 2025 one source file
 * holds both shifts of a date, so a sitting is not readable from a row (see scripts/mocks/jeeSittings.ts).
 * A column per year is honest; a column per file would not be.
 *
 * WHY A SHARE, NOT A RAW COUNT. Papers before 2025 printed 30 Maths questions (10 numeric, of which a
 * candidate attempted 5); from 2025 a paper has 25. So a raw count does not compare across years, but
 * a chapter's SHARE of the year's questions does. `perPaper` turns that share into questions per
 * 25-question paper — the number a student can act on.
 *
 * Rows before `fromYear` (the handful of pre-2021 reprints) or with no year are counted in
 * `excluded`, never placed in a column.
 */

export type JeeRow = {
  pyq_year: number | null;
  chapter: string;
  question_format: string | null;
};

export type JeeYear = { year: number; total: number };

export type JeeMatrixRow = {
  chapter: string;
  total: number;
  /** Numeric-answer (Section B) rows. */
  numeric: number;
  /** Column i is years[i]. */
  counts: number[];
};

export type JeeMatrix = { years: JeeYear[]; rows: JeeMatrixRow[]; excluded: number };

/** Questions in one JEE Maths paper from 2025 on (20 MCQ + 5 numeric). */
export const PAPER_Q = 25;

export function buildJeeMatrix(rows: JeeRow[], opts: { fromYear: number }): JeeMatrix {
  let excluded = 0;
  const yearTotals = new Map<number, number>();
  const cells = new Map<string, Map<number, number>>();
  const numeric = new Map<string, number>();

  for (const r of rows) {
    if (r.pyq_year == null || r.pyq_year < opts.fromYear) {
      excluded++;
      continue;
    }
    yearTotals.set(r.pyq_year, (yearTotals.get(r.pyq_year) ?? 0) + 1);
    const byYear = cells.get(r.chapter) ?? new Map<number, number>();
    byYear.set(r.pyq_year, (byYear.get(r.pyq_year) ?? 0) + 1);
    cells.set(r.chapter, byYear);
    if (r.question_format === "numeric") numeric.set(r.chapter, (numeric.get(r.chapter) ?? 0) + 1);
  }

  const years: JeeYear[] = [...yearTotals.entries()]
    .sort((a, b) => a[0] - b[0])
    .map(([year, total]) => ({ year, total }));

  const out: JeeMatrixRow[] = [...cells.entries()].map(([chapter, m]) => {
    const counts = years.map((y) => m.get(y.year) ?? 0);
    return { chapter, total: counts.reduce((s, n) => s + n, 0), numeric: numeric.get(chapter) ?? 0, counts };
  });
  out.sort((a, b) => b.total - a.total || a.chapter.localeCompare(b.chapter));

  return { years, rows: out, excluded };
}

/** Round half up to 2 decimals (Math.round, not banker's rounding). */
function round2(x: number): number {
  return Math.round(x * 100 + 1e-9) / 100;
}

/** A chapter's share of a year's questions, as questions per 25-question paper. */
export function perPaper(count: number, yearTotal: number, paperQ: number = PAPER_Q): number {
  if (yearTotal <= 0) return 0;
  return round2((paperQ * count) / yearTotal);
}

/** Questions per paper over a window of years, pooling counts and totals before scaling. */
export function windowPerPaper(
  counts: number[],
  years: JeeYear[],
  from: number,
  to: number,
  paperQ: number = PAPER_Q
): number {
  let c = 0;
  let t = 0;
  years.forEach((y, i) => {
    if (y.year >= from && y.year <= to) {
      c += counts[i] ?? 0;
      t += y.total;
    }
  });
  return perPaper(c, t, paperQ);
}

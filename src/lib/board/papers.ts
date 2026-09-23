import type { BoardPyqSitting } from "./query";

/* ------------------------------------------------------------------ *
 * Board PYQs — the PAPER axis.
 *
 * The /board recurrence strip used to plot one bar per YEAR, which silently
 * assumed a year holds one paper. Measured 2026-09-23, that is true on exactly
 * one of the three boards that carry PYQs:
 *
 *   • MH SSC 10          — 1 paper per subject per year. The bar was right.
 *   • MH HSC 12          — 1, EXCEPT Mathematics, which gained a second sitting
 *                          in 2024 and kept it (2024 + July 2024, 2025 + July
 *                          2025, February + June 2026). Those bars read double.
 *   • CBSE Class 12      — 5 papers a year, 6 in 2025. Those bars read ~6x.
 *
 * WHY THE KEY IS `source_file` AND NOT `(pyq_year, pyq_month)`, the pair the
 * reader already groups sittings by: the month is not reliably stored and
 * CANNOT be repaired from here. It is parsed out of the provenance tag in the
 * source compilation (scripts/mh-hsc-12-pyq/lib.ts), and tags like
 * "[Q. 27, 2025]" record no month at all — so a NULL means our SOURCE never
 * stated it, not that we lost it. Stamping one in would be invention, and the
 * board really did move between February and March in those years (MH HSC
 * Physics 2023-25 sat in February while Chemistry sat in March). On CBSE the
 * month is NULL on all 5,012 rows by construction, so the sitting grain
 * collapses to the year and cannot separate papers at all.
 *
 * `source_file` needs no guessing: every ingestion pipeline already writes it,
 * and it is the same column the MHT-CET mock builder reached for when
 * `pyq_month` failed it (src/lib/mocks/mhtcetSittings.ts).
 * ------------------------------------------------------------------ */

/**
 * A CBSE paper series ends `-<series>-1`; `-2` and `-3` are its VARIANTS.
 *
 * Only the `-1` file holds a whole paper. A variant file holds ONLY the
 * questions that differ from its opener, because `content_hash` dedup already
 * stored the shared ones against that opener — 2025 Physics 55/1/1 carries 46
 * rows while 55/1/2 carries 12. So a variant file is a DELTA of a paper already
 * counted, not a paper, and averaging over it would understate every bar.
 */
const CBSE_COMPLETE_PAPER = /-\d+-1$/;

/**
 * MH HSC 12 is fed by two pipelines and only one of them names files per paper.
 * A standalone sitting is `..._PYQ__2024_July.pdf`; the chapterwise compilation
 * is `..._PYQ__Application_of_Derivatives.docx` — one file per CHAPTER, spanning
 * every year at once, so its filename identifies no paper. The discriminator is
 * whether the segment after `__` opens with a four-digit year.
 */
const MH_HSC_DATED_PAPER = /__\d{4}_/;

/**
 * Which paper a row belongs to, or null when it belongs to no single paper.
 *
 * Keyed on the exam's DISPLAY name, the same handle `getBoardChapter` and
 * `listBoardChapters` already take. An exam with no rule gets the default —
 * one file per paper, which is how MH SSC 10 and every future single-file
 * pipeline writes them. That default can only ever over-count PAPERS (a bar
 * reads low); it can never drop a QUESTION, which is the failure direction to
 * prefer on a page a student plans from.
 *
 * A row with no `source_file` also takes the default rather than the exam's
 * rule, for the same reason: we would rather fold it into a year-wide paper
 * than exclude a real question from the count.
 */
export function paperKeyFor(
  examName: string,
  sourceFile: string | null,
  year: number
): string | null {
  if (!sourceFile) return String(year);
  if (examName === "CBSE Class 12") {
    return CBSE_COMPLETE_PAPER.test(sourceFile) ? sourceFile : null;
  }
  if (examName === "Maharashtra HSC Class 12") {
    return MH_HSC_DATED_PAPER.test(sourceFile) ? sourceFile : `${year}:compilation`;
  }
  return sourceFile;
}

export type BoardPyqYearStat = {
  year: number;
  /** Questions belonging to a whole paper — the strip's numerator. */
  questions: number;
  /** Whole papers the SUBJECT sat that year — including any that asked nothing
   *  from this chapter. See boardPyqPaperStats for why that scope matters. */
  papers: number;
  /** questions ÷ papers, one decimal. NULL when the year's paper count is
   *  unknown — never a guess. */
  perPaper: number | null;
};

export type BoardPyqPaperStats = {
  /** Oldest year first, so the strip reads left to right as a timeline. */
  years: BoardPyqYearStat[];
  /**
   * Papers sat across the whole window the bars cover.
   *
   * Deliberately NOT "papers this chapter appeared in", which was the first
   * version: that number changes per chapter, so the same four years would read
   * "21 papers" on Current Electricity and "10 papers" on Magnetism and Matter.
   * A reader takes this line as a fact about the BOARD, and it should be one.
   */
  totalPapers: number;
  /**
   * Rows that belong to no single paper — CBSE variant deltas, today the only
   * source of them. They are NOT lost: they list under their sitting below the
   * strip. They are only kept out of an average they would distort.
   */
  excludedQuestions: number;
};

/** One decimal. 4/3 → 1.3. */
function round1(value: number): number {
  return Math.round(value * 10) / 10;
}

/**
 * Questions per paper, per year. PURE.
 *
 * `papersInYear` MUST count every whole paper the SUBJECT sat that year, not
 * only the papers that asked something from this chapter. The distinction is
 * the whole point of the number. CBSE Magnetism and Matter drew 4 questions in
 * 2025 across 6 papers — 0.7 per paper, i.e. most students met it once or not
 * at all. Divide instead by the 2 papers that happened to ask it and the same
 * chapter reads 2.0, a chapter worth revising hard. The chapter's own rows
 * cannot supply that divisor, which is why it is a required argument and not
 * derived here: a caller that forgets it gets a type error, not a wrong chart.
 *
 * A year with no known paper count reports `perPaper: null` rather than falling
 * back to the chapter's own papers. The fallback would always be available and
 * always look plausible, which is exactly what makes it dangerous.
 *
 * Years are otherwise reported as observed — never zero-filled. The March 2021
 * exams were cancelled, so a 2021 bar would assert a paper this chapter was
 * absent from.
 */
export function boardPyqPaperStats(
  sittings: BoardPyqSitting[],
  examName: string,
  papersInYear: ReadonlyMap<number, number>
): BoardPyqPaperStats {
  const byYear = new Map<number, number>();
  let excludedQuestions = 0;

  for (const sitting of sittings) {
    for (const question of sitting.questions) {
      const key = paperKeyFor(examName, question.sourceFile, question.pyqYear);
      if (key === null) {
        excludedQuestions++;
        continue;
      }
      byYear.set(question.pyqYear, (byYear.get(question.pyqYear) ?? 0) + 1);
    }
  }
  // A year whose questions were ALL excluded still gets a bar slot, so the
  // timeline does not silently lose it.
  for (const sitting of sittings) {
    if (!byYear.has(sitting.year)) byYear.set(sitting.year, 0);
  }

  const years = [...byYear.entries()]
    .map(([year, questions]) => {
      const papers = papersInYear.get(year) ?? 0;
      return {
        year,
        questions,
        papers,
        perPaper: papers > 0 ? round1(questions / papers) : null,
      };
    })
    .sort((a, b) => a.year - b.year);

  return {
    years,
    totalPapers: years.reduce((n, y) => n + y.papers, 0),
    excludedQuestions,
  };
}

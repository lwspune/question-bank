/**
 * Content for /guide/mht-cet-maths/trends.
 *
 * Bank window: 3,388 PUBLIC PYQ across 68 shifts, 2021-2026, 26 chapters,
 * re-measured 2026-10-13 after the 26 shifts of 2026 went public (their
 * difficulty labels re-graded onto the 2021-2025 scale, so a 2026 %HARD
 * compares with the years before it).
 *
 * -------------------------------------------------------------------------
 * THE ONE THING TO UNDERSTAND BEFORE READING ANY NUMBER ON THIS PAGE
 * -------------------------------------------------------------------------
 * MHT-CET is a multi-shift exam and the number of shifts per year is wildly
 * uneven:
 *
 *     2021 = 1 shift · 2022 = 1 · 2023 = 16 · 2024 = 11 · 2025 = 13 · 2026 = 26
 *     (Maths questions: 2021 = 50 · 2022 = 48 · 2023 = 797 · 2024 = 549 ·
 *      2025 = 646 · 2026 = 1,298)
 *
 * So a RAW question count is meaningless across years. A chapter with 26
 * questions in 2025 and 52 in 2026 did not double: 26 over 13 shifts and 52
 * over 26 shifts are both exactly 2.0 questions a paper. Every comparable
 * figure on this page is therefore a QUESTIONS-PER-PAPER RATE, and every field
 * that holds a raw count is named `...QCount` or `...qInWindow` so it can
 * never be read as a rate by mistake. Do not compare two raw counts from
 * different windows.
 *
 * THE MATRIX LIVES IN `matrix.generated.ts` (2026-09-19)
 * -------------------------------------------------------------------------
 * This header used to say there was no per-chapter-per-year matrix for this
 * bank and that this file must not ship one, because fabricating a grid of
 * plausible-looking counts would be the single most damaging thing this page
 * could do: every cell would read as measured. That refusal was about
 * FABRICATION, not about the grid, and it still stands: nothing here may be
 * estimated.
 *
 * What changed is that the grid is DERIVED. `scripts/mhtcet/trends-matrix.ts`
 * reads the live bank and emits `matrix.generated.ts`, a chapter x SHIFT
 * matrix (26 x 68) plus its questions-per-paper summary. Every cell is a
 * GROUP BY, re-derivable with `npm run mhtcet:matrix`, and `-- --check` fails
 * the gate if the committed file drifts from the bank.
 *
 * Per SHIFT a raw count compares exactly, because every column is one
 * ~50-question paper. Per-shift is the grain that makes a raw count honest
 * here; the year view is published as a RATE for the same reason.
 *
 * WHAT IS IN DRIFT_ROWS, AND WHY IT IS STILL SHORT. These four are the
 * chapters whose movement is worth spelling out in prose. They are the
 * narrative; the matrix is the evidence. Keep them short and keep them
 * verified: do not grow this list to cover the grid. Every window in them is
 * DISJOINT from the one it is compared with (2023-2024 against 2025-2026), so
 * a rate change is the whole move, not a floor.
 *
 * THE HEADLINE: MHT-CET MOVED ITS SYLLABUS FOR 2025, AND 2026 KEPT IT.
 *   - Measures of Dispersion ran 1.0 q/paper across the 27 shifts of 2023-24,
 *     then scored ZERO across all 39 papers of 2025 and 2026.
 *   - Conic Sections carried 2 questions in the 29 shifts before 2025, then
 *     15 in the 13 shifts of 2025 and 27 in the 26 shifts of 2026: about one a
 *     paper, both years.
 * A student prepping off 2023-24 papers therefore spends revision time on a
 * chapter that no longer appears, and walks into a chapter they have never
 * seen. Two years in a row is a syllabus, not a blip. That is the practical
 * content of this page.
 */

export const YEARS = [2021, 2022, 2023, 2024, 2025, 2026] as const;

/**
 * One measurement window for a chapter.
 *
 * `qInWindow` is a RAW COUNT and is only comparable to another window's raw
 * count if `shifts` is the same. `qPerPaper` is the comparable figure.
 * Either may be null: the bank survey supplied a rate for some windows and a
 * raw count for others, and this file states only what was measured rather
 * than back-filling the other half.
 */
export type DriftWindow = {
  /** Human label for the window, e.g. "2023-2024" or "2025-2026". */
  label: string;
  /** Number of shifts (papers) inside this window. */
  shifts: number;
  /** RAW questions in this window. NOT comparable across windows. */
  qInWindow: number | null;
  /** Questions PER PAPER in this window. This is the comparable number. */
  qPerPaper: number | null;
};

/**
 * A verified change in a chapter's weight between two windows.
 *
 * The windows below never overlap: an earlier window that CONTAINED the later
 * one would understate the move, because the later papers would already be
 * dragging the earlier average toward themselves.
 */
export type DriftRow = {
  chapter: string;
  /** Lifetime PUBLIC count for the chapter. Context only — never a rate. */
  lifetimeQCount: number;
  /** Lifetime %HARD for the chapter. */
  pctHard: number;
  from: DriftWindow;
  to: DriftWindow;
  direction: "up" | "down" | "dropped" | "entered";
  note: string;
};

export const DRIFT_ROWS: DriftRow[] = [
  {
    chapter: "Measures of Dispersion",
    lifetimeQCount: 30,
    pctHard: 10,
    from: { label: "2023-2024", shifts: 27, qInWindow: null, qPerPaper: 1.0 },
    to: { label: "2025-2026", shifts: 39, qInWindow: 0, qPerPaper: 0.0 },
    direction: "dropped",
    note:
      "Off the paper. One question every paper for two years, then nothing across all 39 shifts of 2025 and 2026. At 10% HARD it is the most attractive-looking dead chapter in the bank.",
  },
  {
    chapter: "Conic Sections",
    lifetimeQCount: 44,
    pctHard: 27,
    from: { label: "before 2025", shifts: 29, qInWindow: 2, qPerPaper: null },
    to: { label: "2025-2026", shifts: 39, qInWindow: 42, qPerPaper: null },
    direction: "entered",
    note:
      "Onto the paper. Two questions in the first 29 shifts of the bank, then 42 in the 39 shifts of 2025 and 2026: 15 in 2025 and 27 in 2026, about one a paper both years. 27% HARD, so it is not a free chapter either, and it now ships a playbook.",
  },
  {
    chapter: "Definite Integration",
    lifetimeQCount: 132,
    pctHard: 44,
    from: { label: "2023-2024", shifts: 27, qInWindow: null, qPerPaper: 1.3 },
    to: { label: "2025-2026", shifts: 39, qInWindow: null, qPerPaper: 2.36 },
    direction: "up",
    note:
      "Close to double. 1.30 questions a paper across 2023-24, then 2.08 in 2025 and 2.50 in 2026. The growth is mostly on the evaluation page (standard forms, substitution, by parts), so the chapter now carries more plain integration than property tricks.",
  },
  {
    chapter: "Trigonometric Functions",
    lifetimeQCount: 312,
    pctHard: 41,
    from: { label: "2023-2024", shifts: 27, qInWindow: null, qPerPaper: 4.93 },
    to: { label: "2025-2026", shifts: 39, qInWindow: null, qPerPaper: 4.46 },
    direction: "down",
    note:
      "Still a cornerstone, but lighter: 4.93 a paper across 2023-24, 4.46 across 2025-26. The fall hides two opposite moves inside the chapter: solution of triangle climbing, trigonometric equations and inverse trigonometry falling. See the callout below.",
  },
];

/**
 * %HARD by year, SQL-derived over the whole Maths bank.
 *
 * READ THE `papers` COLUMN FIRST. 2021 and 2022 are ONE PAPER EACH (50 and
 * 48 questions). A single paper's difficulty split is noise, not a data point,
 * and those two years must NOT be read as the start of a trend line. The only
 * years with enough shifts to say anything are 2023 (16), 2024 (11), 2025 (13)
 * and 2026 (26), and across those four the paper went 40% -> 46% -> 29% -> 31%:
 * it hardened into 2024, eased in 2025, and stayed eased in 2026. It is not a
 * ramp. The 2026 labels were re-graded onto the 2021-2025 scale before this
 * row was measured, so it compares with the others.
 */
export type HardByYear = {
  year: number;
  /** Shifts (papers) in that year — the reason raw counts do not compare. */
  papers: number;
  totalQ: number;
  hardQ: number;
  pctHard: number;
};

export const HARD_BY_YEAR: HardByYear[] = [
  { year: 2021, papers: 1, totalQ: 50, hardQ: 10, pctHard: 20 },
  { year: 2022, papers: 1, totalQ: 48, hardQ: 15, pctHard: 31 },
  { year: 2023, papers: 16, totalQ: 797, hardQ: 316, pctHard: 40 },
  { year: 2024, papers: 11, totalQ: 549, hardQ: 251, pctHard: 46 },
  { year: 2025, papers: 13, totalQ: 646, hardQ: 188, pctHard: 29 },
  { year: 2026, papers: 26, totalQ: 1298, hardQ: 400, pctHard: 31 },
];

export type DriftCallout = {
  icon: "up" | "down" | "spike";
  title: string;
  description: string;
  /** Optional drill target — chapter + subtopic(s) + year(s). */
  drill?: {
    chapter: string;
    subtopic?: string;
    pyqYears?: number[];
    qCount: number;
    label: string;
  };
};

export const DRIFT_CALLOUTS: DriftCallout[] = [
  {
    icon: "down",
    title: "Measures of Dispersion is dead: 1.0 q/paper for two years, then zero across all 39 papers of 2025 and 2026",
    description:
      "This is the most expensive mistake available in MHT-CET Maths prep, because the chapter is designed to look like the best deal on the paper: 30 questions lifetime at only 10% HARD, and one turns up in every 2023 and 2024 paper you practise. It ran 1.0 question per paper across the 27 shifts of 2023-24. Then it scored ZERO across all 13 shifts of 2025 and all 26 of 2026. One empty year could have been a blip; two is the syllabus. Nothing about the chapter tells you this: you can only see it by dating your practice papers. Give it no revision time.",
  },
  {
    icon: "up",
    title: "Conic Sections entered: 2 questions before 2025, then about one a paper in 2025 and again in 2026",
    description:
      "The other half of the same syllabus move, and 2026 confirmed it. Conic Sections carried 2 questions across the first 29 shifts of the bank. It then carried 15 in the 13 shifts of 2025 and 27 in the 26 shifts of 2026, which is 1.15 and 1.04 a paper. That is enough to clear the playbook line, so it now ships one. A student prepping from 2023-24 papers has, in practical terms, never seen this chapter, and it is 27% HARD: this is not a chapter you can pick up in the hall. Drill it from 2025 and 2026 papers, where 42 of its 44 questions sit.",
    drill: {
      chapter: "Conic Sections",
      pyqYears: [2025, 2026],
      qCount: 42,
      label: "Drill the 42 Conic Sections questions from 2025 and 2026",
    },
  },
  {
    icon: "spike",
    title: "The paper is not getting steadily harder: 40% HARD (2023), 46% (2024), 29% (2025), 31% (2026)",
    description:
      "Ignore 2021 and 2022 entirely: they are one paper each (50 and 48 questions), so their 20% and 31% are single-paper noise. Across the four years with real shift counts the paper hardened into 2024, eased in 2025, and stayed eased in 2026 across twice as many shifts. The planning consequence is that 2024 is the wrong year to calibrate against in either direction: it is the hardest year in the bank and it predates the syllabus move, so a student who only drills 2024 over-prepares for difficulty and under-prepares for scope. Drill 2025 and 2026 for scope and 2024 for depth.",
    drill: {
      chapter: "Vectors",
      qCount: 334,
      label: "Drill Vectors: the largest chapter in the bank and 50% HARD",
    },
  },
  {
    icon: "up",
    title: "Inside Trigonometric Functions, solution of triangle is rising while equations and inverse trigonometry fall",
    description:
      "Std XII trigonometry is the second-largest chapter in the bank at 312 questions, and its weightage fell from 4.93 questions per paper across the 27 shifts of 2023-24 to 4.46 across the 39 shifts of 2025-26. The chapter total hides the real story. Solution of triangle rose from 1.26 to 1.85 a paper (2.62 in 2025, 1.46 in 2026), almost all of it on the half-angle, Napier and area page, which went from 0.22 to 0.82. Trigonometric equations fell from 1.33 to 0.85 and stayed there in both years, and inverse trigonometry fell from 2.33 to 1.77. If your trigonometry hours are limited, solution of triangle is where they go first.",
    drill: {
      chapter: "Trigonometric Functions",
      subtopic: "Solution of Triangle — Half-Angle Formulas, Napier's Analogy and Area",
      qCount: 38,
      label: "Drill the half-angle, Napier and area page (38 q, 42% HARD)",
    },
  },
];

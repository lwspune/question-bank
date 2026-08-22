/**
 * Content for /guide/mht-cet-maths/trends.
 *
 * Bank window: 2,228 PUBLIC PYQ across 45 shifts, 2021-2025, 27 chapters.
 *
 * -------------------------------------------------------------------------
 * THE ONE THING TO UNDERSTAND BEFORE READING ANY NUMBER ON THIS PAGE
 * -------------------------------------------------------------------------
 * MHT-CET is a multi-shift exam and the number of shifts per year is wildly
 * uneven:
 *
 *     2021 = 1 shift · 2022 = 1 · 2023 = 17 · 2024 = 12 · 2025 = 14
 *     (Maths questions: 2021 = 50 · 2022 = 48 · 2023 = 840 · 2024 = 596 ·
 *      2025 = 694)
 *
 * So a RAW question count is meaningless across years. A chapter with 34
 * questions in 2023 and 28 in 2025 did not shrink — 34 over 17 shifts and 28
 * over 14 shifts are both exactly 2.0 questions a paper. The raw counts differ
 * by six and the chapter did not move at all. Every comparable figure on this
 * page is therefore a QUESTIONS-PER-PAPER RATE, and every field that holds a
 * raw count is named `...QCount` or `...qInWindow` so it can never be read as
 * a rate by mistake. Do not compare two raw counts from different windows.
 *
 * WHAT IS ACTUALLY IN DRIFT_ROWS, AND WHY IT IS SHORT
 * ---------------------------------------------------
 * There is no verified per-chapter-per-year matrix for this bank, so this file
 * does NOT ship one. Fabricating a 27 x 5 grid of plausible-looking counts
 * would be the single most damaging thing this page could do — every cell
 * would read as measured. DRIFT_ROWS therefore carries only the four chapters
 * with a verified two-window story. Four rows is the correct outcome, not an
 * unfinished one. The year-level shape of the rest of the bank is not known
 * and is not asserted.
 *
 * THE HEADLINE: MHT-CET MOVED ITS SYLLABUS FOR 2025.
 *   - Measures of Dispersion ran 1.0 q/paper across the 29 shifts of 2023-24,
 *     then scored ZERO across all 14 papers of 2025.
 *   - Conic Sections carried 3 questions in the whole bank before 2025, then
 *     16 in 2025 alone.
 * A student prepping off 2023-24 papers therefore spends revision time on a
 * chapter that no longer appears, and walks into a chapter they have never
 * seen. That is the practical content of this page.
 */

export const YEARS = [2021, 2022, 2023, 2024, 2025] as const;

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
  /** Human label for the window, e.g. "2023-2024" or "lifetime (2021-2025)". */
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
 * NOTE on the two "lifetime -> recent" rows below: the lifetime window
 * CONTAINS the recent window, so those comparisons UNDERSTATE the move — the
 * recent papers are already dragging the lifetime average toward themselves.
 * The direction is real; the size is a floor, not a ceiling.
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
    lifetimeQCount: 32,
    pctHard: 9,
    from: { label: "2023-2024", shifts: 29, qInWindow: null, qPerPaper: 1.0 },
    to: { label: "2025", shifts: 14, qInWindow: 0, qPerPaper: 0.0 },
    direction: "dropped",
    note:
      "Off the paper. One question every paper for two years, then nothing across all 14 shifts of 2025. At 9% HARD it is the most attractive-looking dead chapter in the bank.",
  },
  {
    chapter: "Conic Sections",
    lifetimeQCount: 19,
    pctHard: 42,
    from: { label: "before 2025", shifts: 31, qInWindow: 3, qPerPaper: null },
    to: { label: "2025", shifts: 14, qInWindow: 16, qPerPaper: null },
    direction: "entered",
    note:
      "Onto the paper. Three questions in the first 31 shifts of the bank, then 16 in the 14 shifts of 2025. 42% HARD, so it is not a free chapter either.",
  },
  {
    chapter: "Inverse Trigonometric Functions",
    lifetimeQCount: 73,
    pctHard: 37,
    from: { label: "lifetime (2021-2025)", shifts: 45, qInWindow: null, qPerPaper: 1.66 },
    to: { label: "recent (2024-2025)", shifts: 26, qInWindow: null, qPerPaper: 2.04 },
    direction: "up",
    note:
      "Rising, and it is also the chapter this bank splits in two — a further 21 questions sit as a subtopic inside Trigonometry - II. See the callout below.",
  },
  {
    chapter: "Trigonometry - I",
    lifetimeQCount: 99,
    pctHard: 37,
    from: { label: "lifetime (2021-2025)", shifts: 45, qInWindow: null, qPerPaper: 2.2 },
    to: { label: "recent (2024-2025)", shifts: 26, qInWindow: null, qPerPaper: 1.85 },
    direction: "down",
    note:
      "Softening. Still a real chapter at 1.85 a paper, but the lifetime count of 99 makes it look like a bigger recent bet than it is.",
  },
];

/**
 * %HARD by year, SQL-derived over the whole Maths bank.
 *
 * READ THE `papers` COLUMN FIRST. 2021 and 2022 are ONE PAPER EACH — 50 and
 * 48 questions. A single paper's difficulty split is noise, not a data point,
 * and those two years must NOT be read as the start of a trend line. The only
 * years with enough shifts to say anything are 2023 (17), 2024 (12) and
 * 2025 (14), and across those three the paper went 40% -> 47% -> 30%: it
 * hardened, then eased. It is not a ramp.
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
  { year: 2023, papers: 17, totalQ: 840, hardQ: 339, pctHard: 40 },
  { year: 2024, papers: 12, totalQ: 596, hardQ: 283, pctHard: 47 },
  { year: 2025, papers: 14, totalQ: 694, hardQ: 209, pctHard: 30 },
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
    title: "Measures of Dispersion is dead — 1.0 q/paper for two years, then zero across all 14 papers of 2025",
    description:
      "This is the most expensive mistake available in MHT-CET Maths prep, because the chapter is designed to look like the best deal on the paper: 32 questions lifetime at only 9% HARD, and one turns up in every 2023 and 2024 paper you practise. It ran 1.0 question per paper across the 29 shifts of 2023-24. Then it scored ZERO across all 14 shifts of 2025. Nothing about the chapter tells you this — you can only see it by dating your practice papers. Give it no revision time.",
  },
  {
    icon: "up",
    title: "Conic Sections entered — 3 questions before 2025, 16 in 2025 alone",
    description:
      "The other half of the same 2025 syllabus move. Conic Sections carried 3 questions across the first 31 shifts of the bank, which is why it does not ship as a playbook on lifetime weight. In the 14 shifts of 2025 it carried 16. A student prepping from 2023-24 papers has, in practical terms, never seen this chapter, and it is 42% HARD — this is not a chapter you can pick up in the hall. Drill it from 2025 papers specifically.",
    drill: {
      chapter: "Conic Sections",
      pyqYears: [2025],
      qCount: 16,
      label: "Drill the 16 Conic Sections questions from 2025",
    },
  },
  {
    icon: "spike",
    title: "The paper is not getting steadily harder — 40% HARD (2023), 47% (2024), 30% (2025)",
    description:
      "Ignore 2021 and 2022 entirely: they are one paper each (50 and 48 questions), so their 20% and 31% are single-paper noise. Across the three years with real shift counts the paper hardened into 2024 and then eased in 2025. The planning consequence is that 2024 is the wrong year to calibrate against in either direction — it is the hardest year in the bank, so a student who only drills 2024 over-prepares for difficulty and under-prepares for the 2025 syllabus. Drill 2025 for scope and 2024 for depth.",
    drill: {
      chapter: "Vectors",
      qCount: 228,
      label: "Drill Vectors — the largest chapter in the bank and 55% HARD",
    },
  },
  {
    icon: "up",
    title: "Inverse trigonometry is rising AND it is split across two chapters",
    description:
      "As a chapter, Inverse Trigonometric Functions moved from 1.66 questions per paper across the lifetime window to 2.04 across the 26 shifts of 2024-2025 — and because the lifetime window contains the recent one, that understates the rise. The bigger issue is where the rest of it lives: a further 21 questions sit as a subtopic INSIDE Trigonometry - II, at 52% HARD against the chapter's own 37%. Drill the chapter alone and you miss the harder fifth of the topic.",
    drill: {
      chapter: "Trigonometry - II",
      subtopic: "Inverse Trigonometry — Identities, Equations, and Principal Values",
      qCount: 21,
      label: "Drill the 21 inverse-trig questions hidden inside Trigonometry - II",
    },
  },
  {
    icon: "down",
    title: "Trigonometry - I is softening — 2.20 q/paper lifetime, 1.85 on recent papers",
    description:
      "A 99-question lifetime count makes this look like one of the biggest chapters in the bank, and on recent papers it is not — it has drifted from 2.20 questions per paper to 1.85. Still worth owning at 37% HARD, and its Trig Identities, Compound Angle, and Equations subtopic is the largest single subtopic anywhere in this bank at 77 questions. Just do not rank it above a cornerstone on the strength of the lifetime number.",
    drill: {
      chapter: "Trigonometry - I",
      qCount: 99,
      label: "Drill Trigonometry - I (99 q, 37% HARD)",
    },
  },
];

/**
 * Content for /guide/mht-cet-physics/trends.
 *
 * Bank window: 3,390 PUBLIC PYQ across 68 papers, 2021-2026, 24 chapters.
 *
 * MHT-CET runs uneven shift counts per year (2021 = 1 · 2022 = 1 · 2023 = 16
 * · 2024 = 11 · 2025 = 13 · 2026 = 26 papers), so a RAW count never compares
 * across years. Every comparable figure here is a QUESTIONS-PER-PAPER rate,
 * and every raw-count field is named `...QCount` or `qInWindow`.
 *
 * The grid behind these rows is `matrix.generated.ts`, derived from the live
 * bank by `npm run mhtcet:matrix -- --subject=Physics`. Its columns are PAPERS
 * (year + pyq_note), not source files. DRIFT_ROWS is the narrative; every rate
 * it quotes is recomputed from the grid by
 * tests/mhtcet-physics-trends-reconcile.test.ts, so the two cannot drift.
 *
 * THE HEADLINE: 2025 MOVED THE PAPER, AND 2026 KEPT EVERY MOVE.
 *   - Gravitation and Ray Optics both HALVED in 2025 and stayed down in 2026.
 *   - Units and Measurement entered: none in 29 papers, 40 in the 39 since.
 *   - Motion in a Plane nearly doubled; Thermal Properties rose both years.
 *   - Rotational Dynamics' 2025 rise (2.89 to 3.38) did NOT hold: 2.92 in
 *     2026, so it is no longer a drift row.
 */

export const YEARS = [2021, 2022, 2023, 2024, 2025, 2026] as const;

/** One measurement window. `qInWindow` is RAW; `qPerPaper` is comparable. */
export type DriftWindow = {
  label: string;
  /** Number of papers inside this window. */
  shifts: number;
  qInWindow: number | null;
  qPerPaper: number | null;
};

export type DriftRow = {
  chapter: string;
  /** Lifetime PUBLIC count. Context only, never a rate. */
  lifetimeQCount: number;
  pctHard: number;
  from: DriftWindow;
  to: DriftWindow;
  direction: "up" | "down" | "dropped" | "entered";
  note: string;
};

export const DRIFT_ROWS: DriftRow[] = [
  {
    chapter: "Gravitation",
    lifetimeQCount: 106,
    pctHard: 25,
    from: { label: "2023-2024", shifts: 27, qInWindow: 61, qPerPaper: 2.26 },
    to: { label: "2025-2026", shifts: 39, qInWindow: 41, qPerPaper: 1.05 },
    direction: "down",
    note: "Halved, and the second year confirms it. A little over two questions a paper for two years, then 1.15 across 2025 and exactly one on every 2026 paper. Still set on all 39 recent papers: trim its hours, keep variation of g.",
  },
  {
    chapter: "Optics (Ray)",
    lifetimeQCount: 112,
    pctHard: 25,
    from: { label: "2023-2024", shifts: 27, qInWindow: 59, qPerPaper: 2.19 },
    to: { label: "2025-2026", shifts: 39, qInWindow: 48, qPerPaper: 1.23 },
    direction: "down",
    note: "Halved in 2025 (1.08 a paper) and only partly back in 2026 (1.31). At 25% HARD it is one of the more expensive chapters per mark, and now one of the least rewarding.",
  },
  {
    chapter: "Units and Measurement",
    lifetimeQCount: 40,
    pctHard: 0,
    from: { label: "before 2025", shifts: 29, qInWindow: 0, qPerPaper: 0.0 },
    to: { label: "2025-2026", shifts: 39, qInWindow: 40, qPerPaper: 1.03 },
    direction: "entered",
    note: "Onto the paper, and staying. Not a single question in the 29 papers before 2025, then 14 in the 13 papers of 2025 and 26 in the 26 papers of 2026. None of the 40 is HARD, and most are error propagation.",
  },
  {
    chapter: "Motion in a Plane",
    lifetimeQCount: 109,
    pctHard: 6,
    from: { label: "2023-2024", shifts: 27, qInWindow: 27, qPerPaper: 1.0 },
    to: { label: "2025-2026", shifts: 39, qInWindow: 76, qPerPaper: 1.95 },
    direction: "up",
    note: "Nearly doubled, and still climbing: 1.54 a paper in 2025, 2.15 in 2026. It was already the cheapest mechanics chapter at 6% HARD.",
  },
  {
    chapter: "Thermal Properties of Matter",
    lifetimeQCount: 145,
    pctHard: 14,
    from: { label: "2023-2024", shifts: 27, qInWindow: 51, qPerPaper: 1.89 },
    to: { label: "2025-2026", shifts: 39, qInWindow: 89, qPerPaper: 2.28 },
    direction: "up",
    note: "Up a fifth, and rising in both recent years: 2.15 a paper in 2025, 2.35 in 2026. Most of the gain is radiation, the chapter's biggest page.",
  },
];

/**
 * %HARD by year over the whole Physics bank. 2021 and 2022 are ONE PAPER
 * each: single-paper noise, not the start of a trend. Across the four years
 * with real paper counts the difficulty held at about a fifth, then eased to
 * 14% in 2025 and stayed there in 2026. The 2026 labels were re-graded onto
 * the 2021-2025 scale, so the 2026 row compares with the others.
 */
export type HardByYear = {
  year: number;
  papers: number;
  totalQ: number;
  hardQ: number;
  pctHard: number;
};

export const HARD_BY_YEAR: HardByYear[] = [
  { year: 2021, papers: 1, totalQ: 50, hardQ: 14, pctHard: 28 },
  { year: 2022, papers: 1, totalQ: 50, hardQ: 6, pctHard: 12 },
  { year: 2023, papers: 16, totalQ: 798, hardQ: 160, pctHard: 20 },
  { year: 2024, papers: 11, totalQ: 550, hardQ: 114, pctHard: 21 },
  { year: 2025, papers: 13, totalQ: 650, hardQ: 88, pctHard: 14 },
  { year: 2026, papers: 26, totalQ: 1292, hardQ: 184, pctHard: 14 },
];

export type DriftCallout = {
  icon: "up" | "down" | "spike";
  title: string;
  description: string;
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
    title: "Gravitation and Ray Optics halved in 2025, and 2026 kept them there",
    description:
      "Two chapters that ran above two questions a paper through 2023-24 fell to about one each in 2025, and the 26 papers of 2026 did not bring them back: Gravitation went 2.26, 1.15, 1.00; Ray Optics 2.19, 1.08, 1.31. Neither is gone (Gravitation was on every one of the 39 papers of 2025-26), so the move is to cut their prep hours, not to drop them. Gravitation keeps one page worth doing whatever else you cut: variation of g, 43 questions at 7% HARD.",
    drill: {
      chapter: "Gravitation",
      subtopic: "Variation of g with Depth, Altitude, Density, and Latitude",
      qCount: 43,
      label: "Drill variation of g (43 q, 7% HARD)",
    },
  },
  {
    icon: "up",
    title: "Units and Measurement entered in 2025 and held in 2026",
    description:
      "The chapter did not appear once in the 29 papers before 2025, so a student prepping only from older papers has never seen it set. Then it carried 14 questions across the 13 papers of 2025 and 26 across the 26 papers of 2026, none of them HARD. Most are error propagation: how percentage errors add through a product, a quotient and a power. Half a day of prep for about a mark a paper.",
    drill: {
      chapter: "Units and Measurement",
      pyqYears: [2025, 2026],
      qCount: 40,
      label: "Drill the 40 Units and Measurement questions from 2025-26",
    },
  },
  {
    icon: "spike",
    title: "The paper eased in 2025 and stayed eased: 20% HARD (2023), 21% (2024), 14% (2025), 14% (2026)",
    description:
      "Ignore 2021 and 2022: one paper each, so their 28% and 12% are single-paper noise. Across the four years with real paper counts, Physics held at about a fifth HARD and then eased to 14%, and the 26 papers of 2026 held it there. Drill 2025-26 papers for scope, since they carry the new chapter weights, and 2023-24 for depth.",
  },
  {
    icon: "up",
    title: "Motion in a Plane nearly doubled; Rotational Dynamics' 2025 rise did not hold",
    description:
      "Motion in a Plane went from 1.00 a paper in 2023-24 to 1.54 in 2025 and 2.15 in 2026, and it is the cheapest mechanics chapter at 6% HARD. Rotational Dynamics jumped to 3.38 in 2025 but fell back to 2.92 in 2026, about where it was in 2023-24 (2.89): a one-year bump, not a trend. Both take the free-body and circular-motion methods of Laws of Motion, so getting that method secure still pays.",
    drill: {
      chapter: "Motion in a Plane",
      qCount: 109,
      label: "Drill Motion in a Plane (109 q, 6% HARD)",
    },
  },
];

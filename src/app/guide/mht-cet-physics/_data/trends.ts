/**
 * Content for /guide/mht-cet-physics/trends.
 *
 * Bank window: 2,098 PUBLIC PYQ across 42 papers, 2021-2025, 24 chapters.
 *
 * MHT-CET runs uneven shift counts per year — 2021 = 1 · 2022 = 1 · 2023 = 16
 * · 2024 = 11 · 2025 = 13 papers — so a RAW count never compares across
 * years. Every comparable figure here is a QUESTIONS-PER-PAPER rate, and
 * every raw-count field is named `...QCount` or `qInWindow`.
 *
 * The grid behind these rows is `matrix.generated.ts`, derived from the live
 * bank by `npm run mhtcet:matrix -- --subject=Physics`. Its columns are PAPERS
 * (year + pyq_note), not source files. DRIFT_ROWS is the narrative; every rate
 * it quotes is recomputed from the grid by
 * tests/mhtcet-physics-trends-reconcile.test.ts, so the two cannot drift.
 *
 * THE HEADLINE: 2025 MOVED FOUR CHAPTERS.
 *   - Gravitation and Ray Optics both HALVED.
 *   - Units and Measurement entered: none in 29 papers, 14 in 13.
 *   - Motion in a Plane rose by half, and Rotational Dynamics by a sixth.
 */

export const YEARS = [2021, 2022, 2023, 2024, 2025] as const;

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
  /** Lifetime PUBLIC count. Context only — never a rate. */
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
    lifetimeQCount: 80,
    pctHard: 23,
    from: { label: "2023-2024", shifts: 27, qInWindow: 61, qPerPaper: 2.26 },
    to: { label: "2025", shifts: 13, qInWindow: 15, qPerPaper: 1.15 },
    direction: "down",
    note: "Halved. A little over two questions a paper for two years, then about one across 2025. Still set in every year — trim its hours, keep variation of g.",
  },
  {
    chapter: "Optics (Ray)",
    lifetimeQCount: 78,
    pctHard: 29,
    from: { label: "2023-2024", shifts: 27, qInWindow: 59, qPerPaper: 2.19 },
    to: { label: "2025", shifts: 13, qInWindow: 14, qPerPaper: 1.08 },
    direction: "down",
    note: "Halved, the same way as Gravitation. At 29% HARD it was already one of the more expensive chapters per mark; it is now one of the least rewarding.",
  },
  {
    chapter: "Units and Measurement",
    lifetimeQCount: 14,
    pctHard: 0,
    from: { label: "before 2025", shifts: 29, qInWindow: 0, qPerPaper: 0.0 },
    to: { label: "2025", shifts: 13, qInWindow: 14, qPerPaper: 1.08 },
    direction: "entered",
    note: "Onto the paper. Not a single question in the 29 papers before 2025, then 14 in the 13 papers of 2025 — and none of them HARD. Ten are error propagation.",
  },
  {
    chapter: "Motion in a Plane",
    lifetimeQCount: 53,
    pctHard: 6,
    from: { label: "2023-2024", shifts: 27, qInWindow: 27, qPerPaper: 1.0 },
    to: { label: "2025", shifts: 13, qInWindow: 20, qPerPaper: 1.54 },
    direction: "up",
    note: "Up by half, and it was already the cheapest mechanics chapter at 6% HARD.",
  },
  {
    chapter: "Rotational Dynamics",
    lifetimeQCount: 128,
    pctHard: 21,
    from: { label: "2023-2024", shifts: 27, qInWindow: 78, qPerPaper: 2.89 },
    to: { label: "2025", shifts: 13, qInWindow: 44, qPerPaper: 3.38 },
    direction: "up",
    note: "Up a sixth, to the second-heaviest chapter on the 2025 paper after Electrostatics.",
  },
];

/**
 * %HARD by year over the whole Physics bank. 2021 and 2022 are ONE PAPER
 * each — single-paper noise, not the start of a trend. Across the three years
 * with real paper counts the difficulty held at about a fifth, then eased.
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
    title: "Gravitation and Ray Optics both halved in 2025",
    description:
      "Two chapters that ran above two questions a paper through 2023-24 fell to about one each across the 13 papers of 2025: Gravitation from 2.26 to 1.15, Ray Optics from 2.19 to 1.08. Neither is gone — both appeared in 2025 — so the move is to cut their prep hours, not to drop them. Gravitation keeps one page worth doing whatever else you cut: variation of g, 33 questions at 3% HARD.",
    drill: {
      chapter: "Gravitation",
      subtopic: "Variation of g with Depth, Altitude, Density, and Latitude",
      qCount: 33,
      label: "Drill variation of g (33 q, 3% HARD)",
    },
  },
  {
    icon: "up",
    title: "Units and Measurement entered — none before 2025, 14 in 2025",
    description:
      "The chapter did not appear once in the 29 papers before 2025, and a student prepping only from 2023-24 papers has never seen it set. In 2025 it carried 14 questions across 13 papers, none of them HARD; ten are error propagation — how percentage errors add through a product, a quotient and a power. Half a day of prep for about a mark a paper.",
    drill: {
      chapter: "Units and Measurement",
      pyqYears: [2025],
      qCount: 14,
      label: "Drill the 14 Units and Measurement questions from 2025",
    },
  },
  {
    icon: "spike",
    title: "The paper eased in 2025 — 20% HARD (2023), 21% (2024), 14% (2025)",
    description:
      "Ignore 2021 and 2022: one paper each, so their 28% and 12% are single-paper noise. Across the three years with real paper counts, Physics held at about a fifth HARD and then eased in 2025. Drill 2025 papers for scope — they carry the new chapter weights — and 2023-24 for depth.",
  },
  {
    icon: "up",
    title: "Mechanics is growing: Motion in a Plane up by half, Rotational Dynamics up a sixth",
    description:
      "Motion in a Plane rose from 1.00 to 1.54 questions a paper, and it is the cheapest mechanics chapter at 6% HARD. Rotational Dynamics rose from 2.89 to 3.38, second only to Electrostatics on the 2025 paper. Both take the free-body and circular-motion methods of Laws of Motion, so the rise rewards getting that method secure.",
    drill: {
      chapter: "Motion in a Plane",
      qCount: 53,
      label: "Drill Motion in a Plane (53 q, 6% HARD)",
    },
  },
];

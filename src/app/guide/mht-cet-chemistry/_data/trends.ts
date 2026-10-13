/**
 * Content for /guide/mht-cet-chemistry/trends.
 *
 * Bank window: 3,371 PUBLIC PYQ across 68 papers, 2021-2026, 30 chapters.
 * Every column of the grid is one real sitting (`npm run mhtcet:matrix --
 * --subject=Chemistry`, paper-keyed); the 2026 difficulty labels were
 * re-graded onto the 2021-2025 scale before they went public, so a 2026 row
 * of HARD_BY_YEAR compares with the others.
 *
 * Paper counts per year are uneven (1 · 1 · 16 · 11 · 13 · 26), so every
 * comparable figure is a QUESTIONS-PER-PAPER rate; raw counts live only in
 * fields named `qInWindow`. tests/mhtcet-chemistry-trends-reconcile.test.ts
 * recomputes every rate below from the grid.
 *
 * THE HEADLINE: two years after the 2025 syllabus move, the chapter shifts
 * held. Structure of Atom halved in 2025 and stayed down in 2026; Green
 * Chemistry and Groups 16-18 rose and stayed up. The 2025 drop in EASY
 * questions did NOT hold: 2026 was the easiest year in the bank. 2026 alone
 * moved the organic weight from the hydrocarbon chapters to Aldehydes and
 * Basic Principles, one year of data.
 */

export const YEARS = [2021, 2022, 2023, 2024, 2025, 2026] as const;

export type DriftWindow = {
  label: string;
  shifts: number;
  qInWindow: number | null;
  qPerPaper: number | null;
};

export type DriftRow = {
  chapter: string;
  lifetimeQCount: number;
  pctHard: number;
  from: DriftWindow;
  to: DriftWindow;
  direction: "up" | "down" | "dropped" | "entered";
  note: string;
};

export const DRIFT_ROWS: DriftRow[] = [
  {
    chapter: "Structure of Atom",
    lifetimeQCount: 99,
    pctHard: 1,
    from: { label: "2023-2024", shifts: 27, qInWindow: 54, qPerPaper: 2.0 },
    to: { label: "2025-2026", shifts: 39, qInWindow: 42, qPerPaper: 1.08 },
    direction: "down",
    note: "Halved, and it held: two questions a paper for two years, then 1.00 across 2025 and 1.12 across 2026. Still set in almost every paper, so cut its hours, not the chapter.",
  },
  {
    chapter: "Elements of Group 16, 17 and 18",
    lifetimeQCount: 80,
    pctHard: 4,
    from: { label: "2023-2024", shifts: 27, qInWindow: 27, qPerPaper: 1.0 },
    to: { label: "2025-2026", shifts: 39, qInWindow: 50, qPerPaper: 1.28 },
    direction: "up",
    note: "Up from one question a paper to 1.38 in 2025 and 1.23 in 2026: recall of trends and oxoacids, 4% HARD.",
  },
  {
    chapter: "Green Chemistry and Nanochemistry",
    lifetimeQCount: 63,
    pctHard: 0,
    from: { label: "2023-2024", shifts: 27, qInWindow: 18, qPerPaper: 0.67 },
    to: { label: "2025-2026", shifts: 39, qInWindow: 43, qPerPaper: 1.1 },
    direction: "up",
    note: "Rising two years running (1.00 in 2025, 1.15 in 2026) and never HARD. Above the playbook line on the 2025-2026 rate, so it now has one.",
  },
  {
    chapter: "Basic Principles of Organic Chemistry",
    lifetimeQCount: 72,
    pctHard: 10,
    from: { label: "2023-2024", shifts: 27, qInWindow: 24, qPerPaper: 0.89 },
    to: { label: "2025-2026", shifts: 39, qInWindow: 45, qPerPaper: 1.15 },
    direction: "up",
    note: "The rise is all 2026: 0.85 a paper in 2025, then 1.31. Enough to put the hardest chapter of any size (10% HARD) above the playbook line.",
  },
  {
    chapter: "Modern Periodic Table",
    lifetimeQCount: 26,
    pctHard: 0,
    from: { label: "2023-2024", shifts: 27, qInWindow: 15, qPerPaper: 0.56 },
    to: { label: "2025-2026", shifts: 39, qInWindow: 11, qPerPaper: 0.28 },
    direction: "down",
    note: "Halved: 0.23 a paper in 2025, 0.31 in 2026. Its trends still matter because every block chapter borrows them.",
  },
];

/** %HARD by year over the whole Chemistry bank. 2021 and 2022 are one paper
 *  each: noise, not a trend. `easyQ` shows the 2025 shift that %HARD hides. */
export type HardByYear = {
  year: number;
  papers: number;
  totalQ: number;
  hardQ: number;
  pctHard: number;
  easyQ: number;
};

export const HARD_BY_YEAR: HardByYear[] = [
  { year: 2021, papers: 1, totalQ: 50, hardQ: 4, pctHard: 8, easyQ: 22 },
  { year: 2022, papers: 1, totalQ: 50, hardQ: 2, pctHard: 4, easyQ: 22 },
  { year: 2023, papers: 16, totalQ: 788, hardQ: 17, pctHard: 2, easyQ: 444 },
  { year: 2024, papers: 11, totalQ: 541, hardQ: 21, pctHard: 4, easyQ: 327 },
  { year: 2025, papers: 13, totalQ: 645, hardQ: 23, pctHard: 4, easyQ: 269 },
  { year: 2026, papers: 26, totalQ: 1297, hardQ: 32, pctHard: 2, easyQ: 811 },
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
    icon: "spike",
    title: "2025 was the less easy year, and 2026 went back: EASY ran 56%, 60%, 42%, then 63%",
    description:
      "HARD barely moves (2%, 4%, 4%, 2% from 2023 to 2026), so a %HARD chart says nothing happened. What moved in 2025 was the EASY share: questions that are usually one-glance recall became MODERATE, a formula applied or a structure read. 2026 did not repeat it. Time yourself on 2025 papers anyway: if a 2025 paper fits your Chemistry budget, every other year will.",
    drill: {
      chapter: "Solutions and Colligative Properties",
      pyqYears: [2025],
      qCount: 39,
      label: "Drill the largest chapter's 2025 questions",
    },
  },
  {
    icon: "down",
    title: "Structure of Atom halved and stayed down: 2.00 a paper in 2023-24, 1.00 in 2025, 1.12 in 2026",
    description:
      "Two questions a paper for two years, then one across the 13 papers of 2025 and the 26 of 2026. It is still set in almost every paper, so keep Bohr's model and the quantum-number rules; just give it half the hours a 2023-24 paper suggests.",
  },
  {
    icon: "up",
    title: "Green Chemistry and Groups 16-18 rose in 2025 and held in 2026",
    description:
      "Green Chemistry went from 0.67 questions a paper (2023-24) to 1.00 and then 1.15, and has never produced a HARD question; it now has a playbook. Groups 16-18 went from 1.00 to 1.38 and then 1.23. Both are recall, so both are cheap hours. Some Basic Concepts, which jumped from 1.15 to 1.54 in 2025, fell back to 1.12 in 2026: plan on about one and a quarter.",
    drill: {
      chapter: "Green Chemistry and Nanochemistry",
      qCount: 63,
      label: "Drill Green Chemistry (63 q, never HARD)",
    },
  },
  {
    icon: "up",
    title: "2026 moved organic weight away from the hydrocarbons",
    description:
      "Alkanes, Alkenes, Alkynes and Aromatic Compounds together fell from 2.62 questions a paper in 2025 to 1.85 in 2026, and Alkanes and Aromatic Compounds dropped below the playbook line. Aldehydes, Ketones and Carboxylic Acids rose from 2.38 to 3.19 and Basic Principles of Organic Chemistry from 0.85 to 1.31. One year of data: keep the hydrocarbons' named reactions, but put the extra hours into the carbonyl chapter and the principles.",
    drill: {
      chapter: "Basic Principles of Organic Chemistry",
      subtopic: "Isomerism and Stereochemistry",
      qCount: 23,
      label: "Drill isomerism (23 q, the chapter's HARD page)",
    },
  },
];

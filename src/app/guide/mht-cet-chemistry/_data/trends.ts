/**
 * Content for /guide/mht-cet-chemistry/trends.
 *
 * Bank window: 2,074 PUBLIC PYQ across 42 papers, 2021-2025, 30 chapters —
 * measured after the label fix, so every column of the grid is one real
 * sitting (`npm run mhtcet:matrix -- --subject=Chemistry`, paper-keyed).
 *
 * Paper counts per year are uneven (1 · 1 · 16 · 11 · 13), so every
 * comparable figure is a QUESTIONS-PER-PAPER rate; raw counts live only in
 * fields named `qInWindow`. tests/mhtcet-chemistry-trends-reconcile.test.ts
 * recomputes every rate below from the grid.
 *
 * THE HEADLINE: 2025 made Chemistry more even, not harder. HARD stayed near
 * zero, but the EASY share fell from 56-60% to 42% as MODERATE rose; one
 * chapter halved and three rose.
 */

export const YEARS = [2021, 2022, 2023, 2024, 2025] as const;

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
    lifetimeQCount: 70,
    pctHard: 1,
    from: { label: "2023-2024", shifts: 27, qInWindow: 54, qPerPaper: 2.0 },
    to: { label: "2025", shifts: 13, qInWindow: 13, qPerPaper: 1.0 },
    direction: "down",
    note: "Halved: two questions a paper for two years, then one across 2025. Still set every paper — cut its hours, not the chapter.",
  },
  {
    chapter: "Some Basic Concepts of Chemistry",
    lifetimeQCount: 51,
    pctHard: 2,
    from: { label: "2023-2024", shifts: 27, qInWindow: 31, qPerPaper: 1.15 },
    to: { label: "2025", shifts: 13, qInWindow: 20, qPerPaper: 1.54 },
    direction: "up",
    note: "Up by a third. Mole arithmetic, and the same arithmetic every Calculate chapter uses.",
  },
  {
    chapter: "Elements of Group 16, 17 and 18",
    lifetimeQCount: 48,
    pctHard: 2,
    from: { label: "2023-2024", shifts: 27, qInWindow: 27, qPerPaper: 1.0 },
    to: { label: "2025", shifts: 13, qInWindow: 18, qPerPaper: 1.38 },
    direction: "up",
    note: "Up from one question a paper to about one and a half — recall of trends and oxoacids, 2% HARD.",
  },
  {
    chapter: "Green Chemistry and Nanochemistry",
    lifetimeQCount: 33,
    pctHard: 0,
    from: { label: "2023-2024", shifts: 27, qInWindow: 18, qPerPaper: 0.67 },
    to: { label: "2025", shifts: 13, qInWindow: 13, qPerPaper: 1.0 },
    direction: "up",
    note: "A question in every 2025 paper, never HARD. Below the playbook line on the 2024-25 average, above it on 2025 alone.",
  },
  {
    chapter: "Modern Periodic Table",
    lifetimeQCount: 18,
    pctHard: 0,
    from: { label: "2023-2024", shifts: 27, qInWindow: 15, qPerPaper: 0.56 },
    to: { label: "2025", shifts: 13, qInWindow: 3, qPerPaper: 0.23 },
    direction: "down",
    note: "Falling: three questions in all of 2025. Its trends still matter because every block chapter borrows them.",
  },
];

/** %HARD by year over the whole Chemistry bank. 2021 and 2022 are one paper
 *  each — noise, not a trend. `easyQ` shows the 2025 shift that %HARD hides. */
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
    title: "2025 was not harder — it was less easy: EASY fell from 56% (2023) and 60% (2024) to 42%",
    description:
      "HARD barely moved (2%, 4%, 4%), so a %HARD chart says nothing happened. What moved was the EASY share: questions that used to be one-glance recall became MODERATE — a formula applied, a structure read. Practise 2025 papers for pace: the time a 2023 paper suggests Chemistry needs is an underestimate now.",
    drill: {
      chapter: "Solutions and Colligative Properties",
      pyqYears: [2025],
      qCount: 39,
      label: "Drill the heaviest chapter's 2025 questions",
    },
  },
  {
    icon: "down",
    title: "Structure of Atom halved — 2.00 a paper in 2023-24, 1.00 in 2025",
    description:
      "Two questions a paper for two years, then one across all 13 papers of 2025. It is still set in every paper, so keep Bohr's model and the quantum-number rules; just give it half the hours a 2023-24 paper suggests.",
  },
  {
    icon: "up",
    title: "Some Basic Concepts and Groups 16-18 both rose by a third or more",
    description:
      "Some Basic Concepts went from 1.15 to 1.54 questions a paper and Groups 16-18 from 1.00 to 1.38. The first is mole arithmetic that pays in every Calculate chapter; the second is recall at 2% HARD. Both are cheap hours.",
    drill: {
      chapter: "Some Basic Concepts of Chemistry",
      subtopic: "Mole Concept and Interconversions",
      qCount: 31,
      label: "Drill the mole concept (31 q, never HARD)",
    },
  },
  {
    icon: "up",
    title: "Green Chemistry reached a question a paper",
    description:
      "0.67 a paper across 2023-24, then one in every 2025 paper — and it has never produced a HARD question. It sits below the playbook line on the 2024-25 average only because 2024 was light. Read its twelve principles once.",
    drill: {
      chapter: "Green Chemistry and Nanochemistry",
      qCount: 33,
      label: "Drill Green Chemistry (33 q, never HARD)",
    },
  },
];

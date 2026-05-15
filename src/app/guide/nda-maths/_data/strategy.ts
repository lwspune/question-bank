/**
 * Content for /guide/nda-maths/strategy. Chapter and subtopic NAMES are the
 * stable identifiers — UUIDs are resolved at request time via the taxonomy
 * map, so the same content works across dev/preview/prod without env-coupled
 * IDs in the codebase.
 */

import type { Difficulty } from "@/lib/questions/filters";

export type TierChapter = {
  chapter: string;
  qCount: number;
  pctEasy: number;
  pctHard: number;
  /** Subtopics that should be drilled (each becomes a "Drill →" CTA). */
  mustDrill: string[];
  /** Subtopics that should be skipped (rendered as muted text). */
  skipSubtopics?: string[];
  /** Marks the student should expect to harvest per paper. */
  expectedYieldPerPaper: string;
  /** Approximate study hours. */
  studyHours: number;
  /** 1-2 sentence pitch shown at the top of the card. */
  summary: string;
};

export type SkipChapter = {
  chapter: string;
  qCount: number;
  reason: string;
};

export type TestDayPhase = {
  durationMin: number;
  label: string;
  detail: string;
};

export type TimeBudgetRow = {
  label: string;
  hours: number;
  outcome: string;
};

/** Headline numbers shown in the strategy hero. */
export const STRATEGY_HEADLINE = {
  targetMarks: 100,
  totalMarks: 300,
  paperQ: 120,
  marksPerCorrect: 2.5,
  penaltyPerWrong: 0.83,
  targetAttempts: 50,
  targetAccuracyPct: 85,
};

/** Tier A — must-master chapters. ~32 q/paper, the foundation. */
export const TIER_A: TierChapter[] = [
  {
    chapter: "Statistics",
    qCount: 93,
    pctEasy: 44,
    pctHard: 14,
    mustDrill: [
      "Measures of Central Tendency — Mean, Median, Mode",
      "Dispersion — Standard Deviation, Variance, Mean Deviation",
    ],
    skipSubtopics: ["Regression and Correlation"],
    expectedYieldPerPaper: "7–8 marks",
    studyHours: 4,
    summary:
      "Formula substitution. The lowest-difficulty chapter in the bank — your highest marks-per-hour pickup.",
  },
  {
    chapter: "Matrices & Determinants",
    qCount: 109,
    pctEasy: 17,
    pctHard: 33,
    mustDrill: [
      "Determinant Properties, Operations, and Sums",
      "Cofactors, Adjoint, and Inverse",
      "Matrix Operations, Polynomials, and Equations",
    ],
    skipSubtopics: [
      "Special Determinants — Trig, Complex, Roots of Unity, Polynomial",
      "Linear Systems — Consistency, Cramer's Rule, Solution Space",
    ],
    expectedYieldPerPaper: "7–8 marks",
    studyHours: 6,
    summary:
      "Highest-reliability chapter — always 8–11 q per paper. Master determinant evaluation + adjoint and you've banked a third of your target.",
  },
  {
    chapter: "Sequence & Series",
    qCount: 52,
    pctEasy: 25,
    pctHard: 25,
    mustDrill: [
      "Arithmetic Progression — Sum, nth Term, Ratios",
      "Geometric and Harmonic Progressions, AM-GM-HM Relations",
    ],
    skipSubtopics: ["Special Series — Factorials, Telescoping, Repunits"],
    expectedYieldPerPaper: "3–4 marks",
    studyHours: 3,
    summary:
      "AP / GP / HP plus the AM-GM-HM inequality chain. Six formulas cover ~90% of what's asked.",
  },
  {
    chapter: "Sets & Relations",
    qCount: 36,
    pctEasy: 31,
    pctHard: 14,
    mustDrill: [
      "Counting Sets, Subsets, and Inclusion-Exclusion",
      "Set Operations, Identities, and Cartesian Products of Sets",
    ],
    expectedYieldPerPaper: "2–3 marks",
    studyHours: 2,
    summary:
      "Inclusion-exclusion + basic relation properties. The easiest 2-3 marks in NDA Maths if you give it 2 hours.",
  },
  {
    chapter: "Binomial Distribution",
    qCount: 21,
    pctEasy: 38,
    pctHard: 14,
    mustDrill: [
      "Computing Binomial Probabilities — Exact, At-Least, and Complementary Events",
      "Mean, Variance, and Parameter Estimation in B(n, p)",
    ],
    expectedYieldPerPaper: "1–2 marks",
    studyHours: 1,
    summary:
      "Tiny chapter, one formula. P(X=k) = C(n,k)·p^k·q^(n-k); mean=np, var=npq. 60 minutes, 2 marks guaranteed.",
  },
];

/** Tier B — selective drill, ~20 q/paper. */
export const TIER_B: TierChapter[] = [
  {
    chapter: "Functions",
    qCount: 66,
    pctEasy: 41,
    pctHard: 15,
    mustDrill: [
      "Domain, Range, and Function Properties",
      "Composition and Inverse of Functions",
    ],
    skipSubtopics: ["Functional Equations", "Greatest Integer Function"],
    expectedYieldPerPaper: "3–4 marks",
    studyHours: 3,
    summary:
      "High-easy ratio. Stick to domain/range and composition; functional equations are a time-sink.",
  },
  {
    chapter: "Complex Numbers",
    qCount: 45,
    pctEasy: 24,
    pctHard: 22,
    mustDrill: ["Modulus, Argument, and Conjugate"],
    skipSubtopics: ["Powers and Roots"],
    expectedYieldPerPaper: "2–3 marks",
    studyHours: 2,
    summary:
      "Modulus/argument is half the chapter. Drill cube-roots-of-unity (ω³ = 1, 1+ω+ω² = 0) — it shows up in M&D too.",
  },
  {
    chapter: "Vectors",
    qCount: 59,
    pctEasy: 22,
    pctHard: 20,
    mustDrill: [
      "Dot Product and Angle",
      "Cross Product and Triple Product",
    ],
    skipSubtopics: ["Vector Geometry — Triangles, Parallelograms, Quadrilaterals"],
    expectedYieldPerPaper: "3–4 marks",
    studyHours: 3,
    summary:
      "Four formulas: dot, cross, scalar triple, magnitude. Vector-geometry questions are time-traps; skip them.",
  },
  {
    chapter: "Probability",
    qCount: 101,
    pctEasy: 28,
    pctHard: 21,
    mustDrill: [
      "Probability via Counting",
      "Probability with Dice",
      "Independent Events",
    ],
    skipSubtopics: [
      "Conditional Probability, Total Probability, and Bayes' Theorem",
      "Event Algebra — Inclusion-Exclusion, Mutually Exclusive, Exhaustive",
    ],
    expectedYieldPerPaper: "4–5 marks",
    studyHours: 3,
    summary:
      "Classical favourable/total + dice + independence is the cheap stuff. Skip Bayes and event algebra unless time permits.",
  },
];

/** Chapters to deprioritise: low yield or punishing difficulty. */
export const SKIP_LIST: SkipChapter[] = [
  { chapter: "Properties of Triangle", qCount: 33, reason: "52% hard. Punishing yield." },
  { chapter: "Height & Distance", qCount: 14, reason: "79% hard. Appears in only 6 of 11 papers." },
  { chapter: "Quadratic Equations", qCount: 42, reason: "43% hard. Better time spent on M&D." },
  { chapter: "Indefinite Integration", qCount: 23, reason: "Only 2 easy questions across the bank." },
  { chapter: "Application of Derivatives", qCount: 45, reason: "Hard subtopics dominate (Monotonicity/Extrema)." },
  { chapter: "Inverse Trigonometry", qCount: 23, reason: "Hard formulas, only ~2 q/paper." },
  { chapter: "Differential Equations", qCount: 31, reason: "Zero in 1 of 11 papers; hard concepts." },
  { chapter: "Differentiation", qCount: 49, reason: "Time-consuming for moderate yield." },
  { chapter: "Limits & Continuity", qCount: 50, reason: "Heavy passage usage, hard concepts." },
  { chapter: "Definite Integration", qCount: 47, reason: "Hard. Passage-heavy." },
  { chapter: "Applications of Integration", qCount: 19, reason: "Niche; ~2 q/paper, often missed." },
  { chapter: "Linear Inequalities", qCount: 2, reason: "0.2 q/paper avg — near-irrelevant." },
  { chapter: "Binary Numbers", qCount: 7, reason: "0.6 q/paper avg." },
  { chapter: "Logarithms", qCount: 14, reason: "1.3 q/paper. 30-min log-laws refresher only." },
  { chapter: "Trigonometric Identities", qCount: 74, reason: "Mixed difficulty. Skip unless time permits." },
  { chapter: "Trigonometric Equations", qCount: 22, reason: "Hard, only 2 q/paper." },
  { chapter: "Permutation & Combination", qCount: 52, reason: "Tricky counting. Time-intensive vs yield." },
  { chapter: "Binomial Theorem", qCount: 37, reason: "Formula-heavy but tricky." },
  { chapter: "Conics", qCount: 26, reason: "Geometry-heavy." },
  { chapter: "Circles", qCount: 18, reason: "Only 1.6 q/paper." },
  { chapter: "Lines", qCount: 56, reason: "Coordinate geometry — moderate difficulty." },
  { chapter: "3D Geometry", qCount: 54, reason: "Touch only Direction Cosines if time permits." },
];

/** Test-day order of attack. */
export const TEST_DAY_PLAN: TestDayPhase[] = [
  {
    durationMin: 30,
    label: "Sweep your strong chapters",
    detail:
      "Scan all 120 questions. Solve every Statistics, M&D, Binomial Distribution, Sets, Sequence & Series question in that order. Target: 25–30 correct in 30 minutes.",
  },
  {
    durationMin: 60,
    label: "Tier B",
    detail:
      "Tackle marked Functions, Complex Numbers, Vectors, classical-probability questions. Target: 15–20 more correct.",
  },
  {
    durationMin: 30,
    label: "Cherry-pick",
    detail:
      "Scan unsolved questions in skip-list chapters for obvious wins (single-step formula, no setup). If a question takes more than 90 seconds to set up — skip it. Each wrong answer costs you a third of a correct one.",
  },
];

/** Total time investment plan. */
export const TIME_BUDGET: TimeBudgetRow[] = [
  { label: "Tier A (5 chapters)", hours: 16, outcome: "~30 questions per paper" },
  { label: "Tier B (4 chapters)", hours: 11, outcome: "~20 questions per paper" },
  { label: "Skip-list cherry picks", hours: 4, outcome: "~5 bonus questions" },
  { label: "Past papers, timed (5 papers)", hours: 12.5, outcome: "Calibration + speed" },
];

/** Difficulty enum used in BrowseLink filters from this page. */
export const DIFFICULTIES_EASY_MOD: Difficulty[] = ["EASY", "MODERATE"];

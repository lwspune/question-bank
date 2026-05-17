/**
 * Content for /guide/nda-maths/strategy. Chapter and subtopic NAMES are the
 * stable identifiers — UUIDs are resolved at request time via the taxonomy
 * map, so the same content works across dev/preview/prod without env-coupled
 * IDs in the codebase.
 *
 * Tier composition (2026-05-17 re-tier after the 2017–2026 expansion):
 *   Tier A (6 chapters): foundation — Statistics, M&D, Probability (promoted),
 *     Sequence & Series, Sets & Relations, Binomial Distribution.
 *   Tier B (4 chapters): selective drill — Functions, Complex Numbers, Vectors,
 *     Trig Identities (demoted from skip; cherry-pick compound-angle +
 *     specific-values only).
 *   Skip list: 21 chapters.
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

/** Tier A — must-master chapters. ~38 q/paper, the foundation. */
export const TIER_A: TierChapter[] = [
  {
    chapter: "Statistics",
    qCount: 160,
    pctEasy: 49,
    pctHard: 13,
    mustDrill: [
      "Measures of Central Tendency — Mean, Median, Mode",
      "Dispersion — Standard Deviation, Variance, Mean Deviation",
    ],
    skipSubtopics: ["Regression and Correlation"],
    expectedYieldPerPaper: "7–8 marks",
    studyHours: 4,
    summary:
      "Formula substitution. The lowest-difficulty chapter in the bank (49% EASY) — your highest marks-per-hour pickup.",
  },
  {
    chapter: "Matrices & Determinants",
    qCount: 170,
    pctEasy: 24,
    pctHard: 31,
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
    chapter: "Probability",
    qCount: 162,
    pctEasy: 30,
    pctHard: 17,
    mustDrill: [
      "Probability via Counting",
      "Probability with Dice",
      "Independent Events",
    ],
    skipSubtopics: [
      "Conditional Probability, Total Probability, and Bayes' Theorem",
      "Event Algebra — Inclusion-Exclusion, Mutually Exclusive, Exhaustive",
    ],
    expectedYieldPerPaper: "6–7 marks",
    studyHours: 4,
    summary:
      "Promoted to Tier A — 162 q, mostly classical (30% EASY, only 17% HARD). Sample-space construction is the actual work; Bayes/event-algebra are the harder slice — skip them on first pass.",
  },
  {
    chapter: "Sequence & Series",
    qCount: 89,
    pctEasy: 31,
    pctHard: 21,
    mustDrill: [
      "Arithmetic Progression — Sum, nth Term, Ratios",
      "Geometric and Harmonic Progressions, AM-GM-HM Relations",
    ],
    skipSubtopics: ["Special Series — Factorials, Telescoping, Repunits"],
    expectedYieldPerPaper: "4–5 marks",
    studyHours: 3,
    summary:
      "AP / GP / HP plus the AM-GM-HM inequality chain. Six formulas cover ~90% of what's asked; AM-GM is the cross-chapter lever.",
  },
  {
    chapter: "Sets & Relations",
    qCount: 69,
    pctEasy: 32,
    pctHard: 13,
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
    qCount: 30,
    pctEasy: 27,
    pctHard: 10,
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

/** Tier B — selective drill, ~23 q/paper. */
export const TIER_B: TierChapter[] = [
  {
    chapter: "Functions",
    qCount: 109,
    pctEasy: 44,
    pctHard: 10,
    mustDrill: [
      "Domain, Range, and Function Properties",
      "Composition and Inverse of Functions",
    ],
    skipSubtopics: ["Functional Equations", "Greatest Integer Function"],
    expectedYieldPerPaper: "4–5 marks",
    studyHours: 3,
    summary:
      "High-easy ratio (44% EASY, only 10% HARD). Stick to domain/range and composition; functional equations are a time-sink.",
  },
  {
    chapter: "Complex Numbers",
    qCount: 72,
    pctEasy: 29,
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
    qCount: 97,
    pctEasy: 28,
    pctHard: 20,
    mustDrill: [
      "Dot Product and Angle",
      "Cross Product and Triple Product",
    ],
    skipSubtopics: ["Vector Geometry — Triangles, Parallelograms, Quadrilaterals"],
    expectedYieldPerPaper: "4–5 marks",
    studyHours: 3,
    summary:
      "Four formulas: dot, cross, scalar triple, magnitude. Vector-geometry questions are time-traps; skip them.",
  },
  {
    chapter: "Trigonometric Identities",
    qCount: 138,
    pctEasy: 24,
    pctHard: 34,
    mustDrill: [
      "Compound Angle Formulas",
      "Specific Values and Quadrants",
    ],
    skipSubtopics: [
      "Multiple and Half-Angle Formulas",
      "Maximum and Minimum of Trigonometric Expressions",
      "Product-to-Sum and Sum-to-Product Identities",
    ],
    expectedYieldPerPaper: "3–4 marks",
    studyHours: 3,
    summary:
      "Demoted from skip-list to cherry-pick. Big chapter (138 q) but 34% HARD overall — drill only compound-angle and specific-values (the two foundational subtopics, ~60 q of EASY+MOD). Skip multi/half-angle (50% HARD principle), product-to-sum, and max/min (AM-GM territory).",
  },
];

/** Chapters to deprioritise: low yield or punishing difficulty. */
export const SKIP_LIST: SkipChapter[] = [
  { chapter: "Properties of Triangle", qCount: 49, reason: "45% hard. Punishing yield." },
  { chapter: "Height & Distance", qCount: 24, reason: "71% hard — the hardest chapter in the bank." },
  { chapter: "Quadratic Equations", qCount: 63, reason: "40% hard. Better time spent on M&D." },
  { chapter: "Indefinite Integration", qCount: 40, reason: "Only 6 easy questions across the bank." },
  { chapter: "Application of Derivatives", qCount: 73, reason: "Monotonicity/Extrema dominates; AM-GM lever is faster than derivatives." },
  { chapter: "Inverse Trigonometry", qCount: 34, reason: "Hard formulas, only ~1.9 q/paper." },
  { chapter: "Differential Equations", qCount: 63, reason: "29% hard; separable + IVP only if time permits." },
  { chapter: "Differentiation", qCount: 85, reason: "Time-consuming for moderate yield; chain-rule the only must-know." },
  { chapter: "Limits & Continuity", qCount: 81, reason: "Heavy passage usage; piecewise/modulus is hard despite 14% HARD label." },
  { chapter: "Definite Integration", qCount: 66, reason: "Properties (King's, symmetry) are drillable but passage-heavy." },
  { chapter: "Applications of Integration", qCount: 25, reason: "Niche; ~1.4 q/paper, often missed." },
  { chapter: "Linear Inequalities", qCount: 5, reason: "0.3 q/paper avg — near-irrelevant." },
  { chapter: "Binary Numbers", qCount: 13, reason: "0.7 q/paper avg." },
  { chapter: "Logarithms", qCount: 27, reason: "1.5 q/paper. 30-min log-laws refresher only." },
  { chapter: "Trigonometric Equations", qCount: 33, reason: "33% hard, only 1.8 q/paper." },
  { chapter: "Permutation & Combination", qCount: 78, reason: "Tricky counting. Time-intensive vs yield." },
  { chapter: "Binomial Theorem", qCount: 54, reason: "Formula-heavy but tricky; coefficient identities the only must-know." },
  { chapter: "Conics", qCount: 38, reason: "Geometry-heavy." },
  { chapter: "Circles", qCount: 27, reason: "41% hard. Only 1.5 q/paper." },
  { chapter: "Lines", qCount: 97, reason: "Coordinate geometry — moderate difficulty but spread thin across subtopics." },
  { chapter: "3D Geometry", qCount: 89, reason: "Touch only Direction Cosines if time permits." },
];

/** Test-day order of attack. */
export const TEST_DAY_PLAN: TestDayPhase[] = [
  {
    durationMin: 30,
    label: "Sweep your strong chapters",
    detail:
      "Scan all 120 questions. Solve every Statistics, M&D, Probability, Binomial Distribution, Sets, and Sequence & Series question in that order. Target: 28–32 correct in 30 minutes.",
  },
  {
    durationMin: 60,
    label: "Tier B",
    detail:
      "Tackle marked Functions, Complex Numbers, Vectors, and Trig-Identities (compound-angle + specific-values) questions. Target: 12–16 more correct.",
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
  { label: "Tier A (6 chapters)", hours: 20, outcome: "~38 questions per paper" },
  { label: "Tier B (4 chapters)", hours: 11, outcome: "~23 questions per paper" },
  { label: "Skip-list cherry picks", hours: 4, outcome: "~5 bonus questions" },
  { label: "Past papers, timed (5 papers)", hours: 12.5, outcome: "Calibration + speed" },
];

/** Difficulty enum used in BrowseLink filters from this page. */
export const DIFFICULTIES_EASY_MOD: Difficulty[] = ["EASY", "MODERATE"];

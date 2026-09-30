/**
 * Content for /guide/jee-mains-maths/strategy.
 *
 * THE MARKING DECIDES THE AXIS. JEE Main pays +4 for a right answer and takes 1 for a wrong one, on
 * the multiple-choice and the numeric-answer questions alike. So, unlike CDS (a blind guess worth 0)
 * and MHT-CET (no penalty at all), the two formats need OPPOSITE rules: a blind MCQ guess is worth
 * +0.25 on average, and a blind numeric guess is worth close to −1. See GUESS_RULE and NUMERIC_RULE.
 *
 * TIERS ARE DERIVED, NOT TYPED. A chapter's tier comes from its 2025-2026 rate per 25-question paper
 * (CHAPTER_TABLE, computed from the generated matrix) against TIER_RULES. The bank carries no
 * difficulty grading for JEE (every row is MODERATE), so weight is the only axis. After an ingest a
 * chapter can cross a line on its own; tests/jee-mains-maths-guide-data.test.ts pins the current
 * membership so that happens in review, where the prose below can be re-read, not silently.
 *
 * PROSE CARRIES NO FIGURES. `summary`, `pitch` and `approach` are editorial; the page prints every
 * number beside them from CHAPTER_TABLE.
 */

import { CHAPTER_TABLE, PAPER, type ChapterRow } from "./jee-mains-maths";

/**
 * 25 q x 4 marks = 100, and 1 mark lost per wrong answer. The Maths share of the shared three-hour
 * clock is a suggested 60 minutes. Target: 20 solved attempts at 85% is 17 right and 3 wrong,
 * 68 - 3 = 65 marks, before any end-of-paper MCQ guesses (each worth +0.25 on average).
 */
export const STRATEGY_HEADLINE = {
  paperQ: PAPER.questions,
  totalMarks: PAPER.totalMarks,
  marksPerCorrect: PAPER.marksPerCorrect,
  penaltyPerWrong: PAPER.penaltyPerWrong,
  targetMarks: 65,
  targetAttempts: 20,
  targetAccuracyPct: 85,
  durationMin: PAPER.suggestedMinutes,
  minutesPerQuestion: PAPER.minutesPerQuestion,
};

/** Expected marks from one MCQ guess, by how many options are still in play (+4 / −1). */
export const GUESS_RULE: { optionsLeft: number; expected: string; verdict: string }[] = [
  { optionsLeft: 4, expected: "+0.25", verdict: "A blind guess still pays on average. Never leave an MCQ blank at the end." },
  { optionsLeft: 3, expected: "+0.67", verdict: "Rule out one option and the guess is worth two-thirds of a mark." },
  { optionsLeft: 2, expected: "+1.5", verdict: "Down to two, a guess is worth more than a mark." },
];

/** The numeric-answer rule, the opposite of the MCQ one. */
export const NUMERIC_RULE = {
  expected: "close to −1",
  verdict:
    "A numeric answer has no options, so a guess is almost never right and still costs a mark. Enter one only when you have worked it out.",
};

/** How to spend the shared clock. A starting budget, not a measurement of anyone's paper. */
export const TIME_PLAN: { step: string; detail: string }[] = [
  {
    step: "Give Maths about an hour",
    detail:
      "The three subjects share one clock. Maths questions run longer than most Chemistry ones, so an equal split usually runs Maths short. Adjust from your own mock tests.",
  },
  {
    step: "First pass: what opens up quickly",
    detail:
      "Go through all the questions once. Answer what you can see how to do, and mark the rest. A question that has not opened up in a few minutes is marked, not fought.",
  },
  {
    step: "Second pass: the marked questions",
    detail:
      "Come back once every subject has had its first pass. Work the marked questions in the order you think you can finish them.",
  },
  {
    step: "Last minutes: fill every MCQ",
    detail:
      "Any multiple-choice question still blank gets an answer, after ruling out what you can. Numeric answers you have not worked out stay blank.",
  },
];

export type TierId = "cornerstone" | "core" | "longtail";

/** A chapter's tier is set by its 2025-2026 rate per 25-question paper. */
export const TIER_RULES: { id: TierId; minRecentPerPaper: number; label: string }[] = [
  { id: "cornerstone", minRecentPerPaper: 1.5, label: "Cornerstone" },
  { id: "core", minRecentPerPaper: 1.0, label: "Core" },
  // Anything still on the paper. A chapter with no question in 2025-2026 is DROPPED, not long tail.
  { id: "longtail", minRecentPerPaper: Number.MIN_VALUE, label: "Long tail" },
];

export function tierOf(recentPerPaper: number): TierId | "dropped" {
  const rule = TIER_RULES.find((r) => recentPerPaper >= r.minRecentPerPaper);
  return rule ? rule.id : "dropped";
}

/** Editorial per chapter: a short display name and one or two sentences, no figures. */
export const CHAPTER_NOTES: Record<string, { name: string; summary: string }> = {
  "Conic Sections": {
    name: "Conic Sections",
    summary:
      "The largest chapter on the paper, and it has grown. The circle, parabola, ellipse and hyperbola each come with their tangents; one tangency condition per curve answers most of them.",
  },
  "Three Dimensional Geometry": {
    name: "3D Geometry",
    summary:
      "Lines and planes in space: the foot, image and distance, and the shortest distance between skew lines. Each task is one formula once the direction ratios are read correctly.",
  },
  "Relations and Functions": {
    name: "Relations and Functions",
    summary:
      "Grown into a cornerstone. Relations are careful counting, often with a numeric answer; functions are domain, range, counting maps and functional equations.",
  },
  "Sequences and Series": {
    name: "Sequences and Series",
    summary:
      "Two conditions on an AP or a GP, then a term or a sum; the series pages ask you to find the kth term first. A large share has numeric answers.",
  },
  "Definite Integration": {
    name: "Definite Integration",
    summary:
      "Direct evaluation and piecewise integrands carry much of it; the a + b − x property is the time-saver when a direct attack looks hopeless.",
  },
  "Permutations and Combinations": {
    name: "Permutations and Combinations",
    summary:
      "More of it is numeric-answer than any other chapter still on the paper, so there are no options to catch a slip. Own it outright.",
  },
  "Vector Algebra": {
    name: "Vector Algebra",
    summary:
      "Vector equations, magnitudes from lengths and angles, areas and triple products. Short questions; marks are lost to sign and order slips.",
  },
  "Differential Equations": {
    name: "Differential Equations",
    summary:
      "Three solving methods and the pages that disguise them. The answer is often a second step: a value, a maximum or an integral of the solution.",
  },
  Probability: {
    name: "Probability",
    summary:
      "Counting in disguise, then Bayes' theorem and the binomial distribution. Set up the sample space once and count both parts the same way.",
  },
  "Binomial Theorem": {
    name: "Binomial Theorem",
    summary:
      "The general term does half the work, coefficient sums the other half. Nearly half its questions have numeric answers, so accuracy matters more than speed here.",
  },
  "Application of Integrals": {
    name: "Application of Integrals",
    summary:
      "Area between curves, every time: sketch first, then integrate top minus bottom. It has grown since the early papers.",
  },
  "Complex Numbers": {
    name: "Complex Numbers",
    summary:
      "Half algebra, half geometry. Choose the right form, and draw a locus before expanding it into x and y.",
  },
  "Quadratic Equations": {
    name: "Quadratic Equations",
    summary:
      "Vieta and the discriminant, plus equations that are quadratics after a substitution. Most wrong answers keep a root the substitution should have dropped.",
  },
  "Limits and Continuity": {
    name: "Limits and Continuity",
    summary:
      "Standard limits, series expansions and the one-to-the-power-infinity rule; continuity is one equation. Counting points of discontinuity takes the longest.",
  },
  "Straight Lines": {
    name: "Straight Lines",
    summary:
      "A small toolkit — slope, distance, image — used two or three times in a row. The centres of a triangle are the most common setting.",
  },
  Matrices: {
    name: "Matrices",
    summary:
      "High powers of a matrix by spotting a pattern, and the adjoint and determinant identities. Few long calculations.",
  },
  Determinants: {
    name: "Determinants",
    summary:
      "Mostly systems of three equations with a constant left open: which values give one, none or infinitely many solutions.",
  },
  Statistics: {
    name: "Statistics",
    summary:
      "Nearly all variance: write down Σx and Σx² first, and missing, wrong or combined data become a few lines of arithmetic.",
  },
  "Application of Derivatives": {
    name: "Application of Derivatives",
    summary:
      "Maxima and minima, monotonicity and tangents. It has shrunk by about half since the early papers, but still appears on many papers.",
  },
  "Trigonometric Identities": {
    name: "Trigonometric Identities",
    summary:
      "The formula kit for all of trigonometry: evaluate a product or a power sum with the one identity that collapses it.",
  },
  "Inverse Trigonometric Functions": {
    name: "Inverse Trigonometric Functions",
    summary:
      "Every question turns on the principal ranges; sums of inverse tangents often telescope.",
  },
  "Indefinite Integration": {
    name: "Indefinite Integration",
    summary:
      "An antiderivative matched to a printed form or evaluated at a point, so the constant matters. Choosing the substitution is the whole question.",
  },
  Differentiation: {
    name: "Differentiation",
    summary:
      "Simplify before differentiating, and count the points where a derivative fails to exist. Lighter than in the early papers.",
  },
  "Trigonometric Equations": {
    name: "Trigonometric Equations",
    summary:
      "How many solutions lie in an interval. Reduce to one ratio of one angle, then count the roots on the interval itself.",
  },
  "Mathematical Reasoning": {
    name: "Mathematical Reasoning",
    summary:
      "A question on most papers in the early years; none since. Its notes stay up for older papers.",
  },
  "Height & Distance": {
    name: "Heights and Distances",
    summary: "Set only in the early papers, and no longer on the paper.",
  },
  "Properties of Triangle": {
    name: "Properties of Triangle",
    summary: "Rare in the early papers and absent from the recent ones.",
  },
};

export type TierChapter = ChapterRow & { name: string; summary: string };

function withNotes(row: ChapterRow): TierChapter {
  const n = CHAPTER_NOTES[row.chapter];
  if (!n) throw new Error(`jee-mains-maths strategy: no editorial note for "${row.chapter}"`);
  return { ...row, ...n };
}

export type StrategyTier = {
  id: TierId;
  label: string;
  pitch: string;
  approach: string[];
  chapters: TierChapter[];
};

const TIER_TEXT: Record<TierId, { pitch: string; approach: string[] }> = {
  cornerstone: {
    pitch:
      "Each of these sets more than one and a half questions a paper, and together they are about a third of the paper. Conic Sections alone is the largest chapter by a distance.",
    approach: [
      "Learn these first. Every one has full notes at /notes/jee-mains-maths; read a chapter's notes once, then drill page by page.",
      "Conic Sections and Relations and Functions have both grown since the early papers. If time is short, they come before everything else.",
      "Much of this tier is numeric-answer. A numeric question you cannot finish is left blank, so these chapters must be owned, not half-learned.",
    ],
  },
  core: {
    pitch:
      "About one question a paper each, and together about two in every five questions. None can be skipped; the order among them matters less than finishing all of them.",
    approach: [
      "Permutations and Combinations and the Binomial Theorem carry the most numeric answers here. Drill them for accuracy, because no option will catch a slip.",
      "Probability, Application of Integrals and Definite Integration share tools with the cornerstone chapters; learn them straight after, while those tools are fresh.",
      "Complex Numbers and Quadratic Equations sit on the line between core and long tail. Treat them as core.",
    ],
  },
  longtail: {
    pitch:
      "Each sets under one question a paper, but together they are still a large block of marks. Their questions are often short, which makes them cheap marks in a first pass.",
    approach: [
      "Do not skip this tier. Most of these chapters are quick to learn, and a paper sets several of them.",
      "Application of Derivatives and Differentiation have shrunk since the early papers. Learn them, but after the rising chapters.",
      "Matrices, Determinants and Statistics are mostly routine once the identities are known: good first-pass questions.",
    ],
  },
};

export const STRATEGY_TIERS: StrategyTier[] = TIER_RULES.map((rule) => ({
  id: rule.id,
  label: rule.label,
  ...TIER_TEXT[rule.id],
  chapters: CHAPTER_TABLE.filter((r) => tierOf(r.recentPerPaper) === rule.id).map(withNotes),
}));

/** Chapters with no question in 2025-2026. Listed so the bank is accounted for, not drilled. */
export const DROPPED_CHAPTERS: TierChapter[] = CHAPTER_TABLE.filter(
  (r) => tierOf(r.recentPerPaper) === "dropped",
).map(withNotes);

export function tierOfChapter(chapter: string): TierId | "dropped" {
  const row = CHAPTER_TABLE.find((r) => r.chapter === chapter);
  if (!row) throw new Error(`jee-mains-maths strategy: no chapter "${chapter}"`);
  return tierOf(row.recentPerPaper);
}

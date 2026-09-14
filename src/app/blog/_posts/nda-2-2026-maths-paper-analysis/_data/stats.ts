/**
 * Every load-bearing NUMBER the NDA II 2026 Maths post states, in one place,
 * derived from the live bank on 2026-09-14.
 *
 * Prose in this repo lags the bank as a matter of routine, so these are NOT
 * hand-typed into the article body — the body imports them, and
 * `tests/blog-nda2-2026-stats.test.ts` (prod-contract) re-runs the queries
 * below against production and fails if any of them drifts. That test is the
 * reason a reader can trust the article a year from now.
 *
 * DELIBERATELY ABSENT: difficulty / %HARD. The paper reads 15.0% HARD against
 * 27.5% for NDA I 2026, which looks like a headline and is an artefact. All 18
 * earlier sittings got their difficulty labels from uploaded spreadsheets;
 * 2026-II got its from our own derivation agent (`questions.derived_model`), so
 * the comparison crosses a labeller seam. The shape gives it away: 87 of 120
 * rated MODERATE (72.5%) when no other paper in the decade exceeds 58%. Do not
 * add a difficulty section to this post without re-labelling the other 18
 * sittings on the same rubric first.
 */

/** The sitting itself. 120 q / 300 marks / 150 min, +2.5 correct, -0.83 wrong. */
export const PAPER = {
  label: "NDA II 2026",
  paperName: "Paper I — Mathematics",
  questions: 120,
  marks: 300,
  minutes: 150,
  markPerQuestion: 2.5,
  penaltyPerWrong: 0.83,
  mockSlug: "nda-2026-sep-maths",
} as const;

/**
 * The decade baseline this paper is measured against.
 *   select count(*), count(distinct (pyq_year::text||pyq_month))
 *   from questions q join exams e on e.id=q.exam_id join subjects s on s.id=q.subject_id
 *   where e.name ilike '%NDA%' and s.name='Mathematics' and q.question_kind='pyq';
 * 2020 is the only single-paper year — NDA II 2020 was cancelled.
 */
export const BASELINE = {
  papers: 19,
  questions: 2280,
  fromYear: 2017,
  toYear: 2026,
} as const;

/**
 * Chapter split of THIS paper, descending.
 *   select c.name, count(*) from questions q ... left join chapters c
 *   where ... and q.pyq_year=2026 and q.pyq_month='Sep' group by 1 order by 2 desc;
 * Sums to PAPER.questions.
 */
export const CHAPTER_SPLIT: ReadonlyArray<{ chapter: string; count: number }> = [
  { chapter: "Probability", count: 14 },
  { chapter: "Matrices & Determinants", count: 11 },
  { chapter: "Trigonometric Identities", count: 7 },
  { chapter: "Lines", count: 7 },
  { chapter: "Functions", count: 6 },
  { chapter: "Limits & Continuity", count: 6 },
  { chapter: "Sets & Relations", count: 6 },
  { chapter: "Statistics", count: 5 },
  { chapter: "Vectors", count: 5 },
  { chapter: "3D Geometry", count: 5 },
  { chapter: "Sequence & Series", count: 4 },
  { chapter: "Differentiation", count: 4 },
  { chapter: "Complex Numbers", count: 4 },
  { chapter: "Differential Equations", count: 4 },
  { chapter: "Quadratic Equations", count: 4 },
  { chapter: "Application of Derivatives", count: 3 },
  { chapter: "Definite Integration", count: 3 },
  { chapter: "Properties of Triangle", count: 3 },
  { chapter: "Permutation & Combination", count: 2 },
  { chapter: "Binomial Theorem", count: 2 },
  { chapter: "Indefinite Integration", count: 2 },
  { chapter: "Conics", count: 2 },
  { chapter: "Inverse Trigonometry", count: 2 },
  { chapter: "Applications of Integration", count: 2 },
  { chapter: "Height & Distance", count: 2 },
  { chapter: "Trigonometric Equations", count: 1 },
  { chapter: "Binomial Distribution", count: 1 },
  { chapter: "Circles", count: 1 },
  { chapter: "Binary Numbers", count: 1 },
  { chapter: "Linear Inequalities", count: 1 },
];

/**
 * Probability vs Statistics, per paper, by era. PER-PAPER because the eras hold
 * different numbers of papers (6/5/4/2/2) — a raw total would read as a trend
 * that is really just era length. The paper counts are computed in SQL for the
 * same reason: dividing by hand is exactly how the first draft of this table
 * got 2017-19 wrong, by treating six papers as five.
 */
export const DATA_HANDLING_DRIFT: ReadonlyArray<{
  era: string;
  papers: number;
  probabilityPerPaper: number;
  statisticsPerPaper: number;
}> = [
  { era: "2017–19", papers: 6, probabilityPerPaper: 8.7, statisticsPerPaper: 9.5 },
  { era: "2020–22", papers: 5, probabilityPerPaper: 7.0, statisticsPerPaper: 11.0 },
  { era: "2023–24", papers: 4, probabilityPerPaper: 10.3, statisticsPerPaper: 7.3 },
  { era: "2025", papers: 2, probabilityPerPaper: 10.5, statisticsPerPaper: 6.5 },
  { era: "2026", papers: 2, probabilityPerPaper: 13.5, statisticsPerPaper: 5.5 },
];

/** Shared-stimulus sets ("For the next two items that follow"), and statement-style items. */
export const PAPER_SHAPE = {
  setBoundQuestions: 16,
  distinctSets: 7,
  statementStyleQuestions: 16,
} as const;

/**
 * The five mid-weight chapters the post groups together. Named here rather than
 * inline in the prose so the sentence's question/mark totals are DERIVED from
 * the same table as everything else.
 */
export const MID_WEIGHT_BLOCK = [
  "Trigonometric Identities",
  "Lines",
  "Functions",
  "Limits & Continuity",
  "Sets & Relations",
] as const;

/** How many distinct chapters the paper drew on at all. */
export const CHAPTERS_REPRESENTED = CHAPTER_SPLIT.length;

/**
 * Chapters contributing `n` questions or fewer — the paper's long flat tail.
 * Derived, because the first draft of the prose hand-typed "fifteen" for what
 * is actually twelve.
 */
export function chaptersAtOrBelow(n: number): number {
  return CHAPTER_SPLIT.filter((r) => r.count <= n).length;
}

/** Questions contributed by a named group of chapters. */
export function questionsIn(chapters: readonly string[]): number {
  return CHAPTER_SPLIT.filter((r) => chapters.includes(r.chapter)).reduce(
    (sum, r) => sum + r.count,
    0
  );
}

/** Top-N of CHAPTER_SPLIT, with their share of the paper's marks. */
export function topChapters(n: number) {
  return CHAPTER_SPLIT.slice(0, n).map((row) => ({
    ...row,
    marks: row.count * PAPER.markPerQuestion,
  }));
}

/** Marks carried by the first `n` chapters — "two chapters decided the paper". */
export function marksInTopChapters(n: number): number {
  return CHAPTER_SPLIT.slice(0, n).reduce((sum, r) => sum + r.count, 0) * PAPER.markPerQuestion;
}

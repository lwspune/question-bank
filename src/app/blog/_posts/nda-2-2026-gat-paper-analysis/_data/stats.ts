/**
 * Every load-bearing NUMBER the NDA II 2026 GAT post states, derived from the
 * live bank on 2026-09-14. The body imports these; nothing is hand-typed into
 * the prose, and `tests/blog-nda2-2026-gat-stats.test.ts` (prod-contract)
 * re-runs the queries against production so the article cannot go stale.
 *
 * TWO EXCLUSIONS, both deliberate. Do not add either back without redoing the
 * work described here.
 *
 * 1. CROSS-SITTING DIFFICULTY. 2026-II is the only GAT sitting whose difficulty
 *    labels come from our derivation agent (`questions.derived_model`); the
 *    other 18 came from uploaded `.xlsx`. Its 26 HARD is not an outlier against
 *    the decade's 11-29 range, so unlike the Maths paper nothing looks wrong —
 *    but "looks plausible" is not the same as "same rubric". Only the
 *    WITHIN-PAPER subject comparison is used, where a single labeller read all
 *    150 questions and is at least internally consistent.
 *
 * 2. "GRAMMAR ROSE 10x". The Grammar CHAPTER goes 1.7 -> 16 q/paper across the
 *    decade, which is a tempting headline and is contaminated: the 2019 Grammar
 *    chapter contains Spotting-Errors-format questions ("three underlined parts
 *    labelled (a), (b), (c)"), so the series partly measures our own taxonomy
 *    cleanup rather than the exam. It was replaced by FORMAT_FIRST_SEEN below,
 *    which counts question TEXT and is immune to chapter labels.
 */

/** The sitting. 150 q / 600 marks / 150 min, +4 correct, -1.33 wrong. */
export const PAPER = {
  label: "NDA II 2026",
  paperName: "Paper II — General Ability Test",
  questions: 150,
  marks: 600,
  minutes: 150,
  markPerQuestion: 4,
  penaltyPerWrong: 1.33,
  englishQuestions: 50,
  gkQuestions: 100,
  mockSlug: "nda-2026-sep-gat",
} as const;

/**
 * The decade baseline. 19 sittings x 150 q; 2020 is the only single-paper year
 * because NDA II 2020 was cancelled.
 */
export const BASELINE = {
  papers: 19,
  questions: 2850,
  fromYear: 2017,
  toYear: 2026,
} as const;

/**
 * Subject split of THIS paper, descending. Sums to PAPER.questions.
 * English is Part A (a fixed 50 in every sitting); the other eight share Part B.
 */
export const SUBJECT_SPLIT: ReadonlyArray<{ subject: string; count: number }> = [
  { subject: "English", count: 50 },
  { subject: "Physics", count: 24 },
  { subject: "Geography", count: 20 },
  { subject: "Chemistry", count: 16 },
  { subject: "Current Affairs", count: 11 },
  { subject: "Biology", count: 10 },
  { subject: "History", count: 9 },
  { subject: "Polity", count: 9 },
  { subject: "Economics", count: 1 },
];

/** Chapter split of this paper's 50 English questions. Sums to englishQuestions. */
export const ENGLISH_SPLIT: ReadonlyArray<{ chapter: string; count: number }> = [
  { chapter: "Vocabulary", count: 17 },
  { chapter: "Grammar", count: 14 },
  { chapter: "Idioms and Phrases", count: 10 },
  { chapter: "Sentence Rearrangement", count: 5 },
  { chapter: "Fill in the Blanks", count: 2 },
  { chapter: "Spotting Errors", count: 2 },
];

/** The three chapters the post tells students to drill first. */
export const ENGLISH_CORE = ["Vocabulary", "Grammar", "Idioms and Phrases"] as const;

/**
 * History vs Polity per paper, by era. PER PAPER because the eras hold 6/5/4/2/2
 * papers; a raw total would read as a trend that is really era length.
 */
export const GK_DRIFT: ReadonlyArray<{
  era: string;
  papers: number;
  historyPerPaper: number;
  polityPerPaper: number;
}> = [
  { era: "2017–19", papers: 6, historyPerPaper: 16.0, polityPerPaper: 4.7 },
  { era: "2020–22", papers: 5, historyPerPaper: 14.0, polityPerPaper: 5.6 },
  { era: "2023–24", papers: 4, historyPerPaper: 14.8, polityPerPaper: 3.8 },
  { era: "2025", papers: 2, historyPerPaper: 12.5, polityPerPaper: 4.5 },
  { era: "2026", papers: 2, historyPerPaper: 9.5, polityPerPaper: 9.5 },
];

/**
 * The claim the History/Polity section rests on, stated as counts so the test
 * can check it directly: History outnumbered Polity in EVERY sitting before
 * 2026, and the two tied in BOTH 2026 papers.
 *
 * This is the finding that survives the labeller seam. 2026-II's subjects were
 * assigned by our ingestion agents, but 2026-I came from a spreadsheet they
 * never touched and shows the same tie — so the convergence appears in data our
 * classification did not produce.
 */
export const HISTORY_POLITY_CROSSOVER = {
  sittingsBefore2026: 17,
  historyAheadBefore2026: 17,
  tiedSittingsIn2026: 2,
} as const;

/**
 * Question FORMATS by era, counted from question text rather than chapter
 * labels — `%passive voice%`, `%indirect speech%`, `%word class%`.
 *
 * The transformation row is the post's English headline: zero across all 15
 * sittings 2017-2024, then present in all four sittings from 2025. Counts are
 * raw per era (not per paper) because the claim is presence/absence.
 */
export const FORMAT_FIRST_SEEN: ReadonlyArray<{
  era: string;
  papers: number;
  transformation: number;
  wordClass: number;
}> = [
  { era: "2017–19", papers: 6, transformation: 0, wordClass: 0 },
  { era: "2020–22", papers: 5, transformation: 0, wordClass: 0 },
  { era: "2023–24", papers: 4, transformation: 0, wordClass: 10 },
  { era: "2025", papers: 2, transformation: 8, wordClass: 0 },
  { era: "2026", papers: 2, transformation: 6, wordClass: 10 },
];

/** Sittings with zero transformation questions, and the run since. */
export const TRANSFORMATION_DEBUT = {
  sittingsWithNoneThrough2024: 15,
  sittingsWithSomeSince2025: 4,
  firstYear: 2025,
} as const;

/** Economics, every sitting, all decade. The "stop over-preparing this" line. */
export const ECONOMICS_RANGE = { min: 0, max: 3, thisPaper: 1 } as const;

/**
 * Difficulty by subject WITHIN this paper only. Safe despite the labeller seam
 * because one reader graded all 150 — internally consistent even if it is not
 * calibrated against the other 18 sittings. It is our reading, not an official
 * rating, and the post says so.
 */
export const SUBJECT_DIFFICULTY: ReadonlyArray<{
  subject: string;
  count: number;
  easy: number;
  moderate: number;
  hard: number;
}> = [
  { subject: "English", count: 50, easy: 8, moderate: 36, hard: 6 },
  { subject: "Physics", count: 24, easy: 3, moderate: 14, hard: 7 },
  { subject: "Geography", count: 20, easy: 2, moderate: 15, hard: 3 },
  { subject: "Chemistry", count: 16, easy: 1, moderate: 14, hard: 1 },
  { subject: "Current Affairs", count: 11, easy: 0, moderate: 7, hard: 4 },
  { subject: "Biology", count: 10, easy: 4, moderate: 6, hard: 0 },
  { subject: "History", count: 9, easy: 1, moderate: 5, hard: 3 },
  { subject: "Polity", count: 9, easy: 2, moderate: 5, hard: 2 },
  { subject: "Economics", count: 1, easy: 0, moderate: 1, hard: 0 },
];

/** Questions contributed by a named group of English chapters. */
export function englishQuestionsIn(chapters: readonly string[]): number {
  return ENGLISH_SPLIT.filter((r) => chapters.includes(r.chapter)).reduce(
    (sum, r) => sum + r.count,
    0
  );
}

/** Marks for a question count, at this paper's own rate. */
export function marksFor(questions: number): number {
  return questions * PAPER.markPerQuestion;
}

/** Share of the paper a subject carries, rounded to a whole percent. */
export function shareOfPaper(count: number): number {
  return Math.round((count / PAPER.questions) * 100);
}

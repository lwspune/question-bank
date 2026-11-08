/**
 * "Start next" on Home (2026-11-09, step 4 of the Home · Review · Progress
 * redesign): the highest-value chapters of the student's exam that they have
 * not answered a single question in, each with what it is worth in a real
 * paper, in the owner's format: "about 10 questions a paper · 24 of 300 marks
 * (8%)".
 *
 * The weights are measured from the published past papers
 * (get_chapter_paper_weights, migration 0242): each chapter's questions and
 * their own marks, averaged over that exam's papers, out of the paper's total.
 * An exam with no published full past paper has no weights, so no card.
 *
 * Pure. Spec: tests/start-next.test.ts.
 */

export type ChapterWeight = {
  chapterId: string;
  chapter: string;
  subject: string;
  /** The exam by name, as the practice link takes it. */
  exam: string;
  paperCode: string;
  /** How many published papers the figure averages over. */
  papers: number;
  qPerPaper: number;
  marksPerPaper: number;
  /** The paper's total marks. */
  paperMarks: number;
};

/** A chapter a paper asks less often than this, on average, is not high value. */
export const MIN_QUESTIONS_PER_PAPER = 1;

export const START_NEXT_LIMIT = 2;

type Weight = Pick<ChapterWeight, "qPerPaper" | "marksPerPaper" | "paperMarks">;

function parts(w: Weight) {
  const q = Math.max(1, Math.round(w.qPerPaper));
  const marks = Math.max(1, Math.round(w.marksPerPaper));
  const pct = w.paperMarks > 0 ? (100 * w.marksPerPaper) / w.paperMarks : 0;
  const share = pct < 1 ? "under 1%" : `${Math.round(pct)}%`;
  return { q, questions: `about ${q} ${q === 1 ? "question" : "questions"}`, marks, of: Math.round(w.paperMarks), share };
}

/** One line: "about 10 questions a paper · 24 of 300 marks (8%)" (the smoke's report). */
export function weightLine(w: Weight): string {
  const p = parts(w);
  return `${p.questions} a paper · ${p.marks} of ${p.of} marks (${p.share})`;
}

/** The card's bold line, the point of it: "24 of 300 marks a paper (8%)". */
export function marksLine(w: Weight): string {
  const p = parts(w);
  return `${p.marks} of ${p.of} marks a paper (${p.share})`;
}

/** The card's small line: "about 10 questions". */
export function questionsLine(w: Weight): string {
  return parts(w).questions;
}

/** Not started, worth at least a question a paper, most marks first. A
 *  chapter that two papers of one exam both ask (MPSC State Services Prelims,
 *  SSC CGL Tier II) is listed once, at its highest weight. */
export function pickStartNext(
  weights: readonly ChapterWeight[],
  started: ReadonlySet<string>,
  limit = START_NEXT_LIMIT
): ChapterWeight[] {
  const best = new Map<string, ChapterWeight>();
  for (const w of weights) {
    const have = best.get(w.chapterId);
    if (!have || w.marksPerPaper > have.marksPerPaper) best.set(w.chapterId, w);
  }
  return [...best.values()]
    .filter((w) => !started.has(w.chapterId) && w.qPerPaper >= MIN_QUESTIONS_PER_PAPER)
    .sort((a, b) => b.marksPerPaper - a.marksPerPaper || a.chapter.localeCompare(b.chapter))
    .slice(0, limit);
}

/** The exam whose papers rank the chapters: the one in focus, else the student's first. */
export function startNextExam(input: { focusSlug: string | null; targets: readonly string[] }): string | null {
  return input.focusSlug ?? input.targets[0] ?? null;
}

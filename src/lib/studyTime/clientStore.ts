/**
 * What the study clock (components/header/StudyClock) needs to know about the
 * page, told by the page itself:
 * - the chapter a reading page is about (components/StudyContext);
 * - the question last answered or shown (the practice beacon, the drill
 *   runner, V's question card).
 *
 * Module state on purpose, like the practice beacon's queue: every caller is
 * on the same page as the one clock. Holds no user data; the clock only reads
 * it while a student is signed in.
 */

type QuestionListener = (questionId: string) => void;

let pageChapterId: string | null = null;
let lastQuestion: { id: string; at: number } | null = null;
const listeners = new Set<QuestionListener>();

/** A reading page names its chapter while it is on screen (null when it leaves). */
export function setStudyChapter(chapterId: string | null): void {
  pageChapterId = chapterId;
}

/** A question was answered, revealed or shown on its own. */
export function noteStudyQuestion(questionId: string): void {
  if (!questionId) return;
  lastQuestion = { id: questionId, at: Date.now() };
  for (const fn of listeners) fn(questionId);
}

/** A new page: the last page's question no longer says what the student is doing. */
export function resetStudyQuestion(): void {
  lastQuestion = null;
}

export function readStudyContext(): { chapterId: string | null; lastQuestion: { id: string; at: number } | null } {
  return { chapterId: pageChapterId, lastQuestion };
}

/** The clock listens so the first question touched can claim unassigned time. */
export function onStudyQuestion(fn: QuestionListener): () => void {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}

/**
 * Pure shaping of a public-quiz submission into the results payload the client
 * renders. No I/O — unit-tested in tests/quiz-submit-result.test.ts. The route
 * fetches the key (getGradingBySlug), calls this, records the lead, and returns
 * the result. The answer key is revealed ONLY here, in the POST response, after
 * the visitor has been captured.
 */
import { gradeQuiz, type GradeResult } from "./grade";
import type { GradingData, GradingQuestion } from "./publicQuiz";

export type SubmitResult = GradeResult & {
  total: number;
  /** q → the correct letter (revealed post-submit). */
  key: Record<string, string>;
  /** q → a "learn this" /notes deep-link, or null when the concept isn't mapped. */
  notesLinks: Record<string, string | null>;
  /** Whether the premium upsell CTA should show (Razorpay configured). */
  billingLive: boolean;
};

/** The /notes deep-link for a question's concept, or null if unmapped. */
export function notesHrefFor(q: GradingQuestion): string | null {
  if (!q.subjectRoute || !q.chapterSlug || !q.subtopicSlug) return null;
  const anchor = q.conceptSlug ? `#${q.conceptSlug}` : "";
  return `/notes/${q.subjectRoute}/${q.chapterSlug}/${q.subtopicSlug}${anchor}`;
}

export function buildSubmitResult(
  grading: GradingData,
  answers: Record<string, string | undefined>,
  billingLive: boolean
): SubmitResult {
  const graded = gradeQuiz(grading.questions, answers, grading.marking);
  const key: Record<string, string> = {};
  const notesLinks: Record<string, string | null> = {};
  for (const q of grading.questions) {
    const k = String(q.q);
    key[k] = String(q.answer).toUpperCase();
    notesLinks[k] = notesHrefFor(q);
  }
  return {
    ...graded,
    total: grading.questions.length,
    key,
    notesLinks,
    billingLive,
  };
}

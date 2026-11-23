import { inferStudentExam, onSiteExam, type GuessSource, type InferredExam } from "@/lib/profile/suggestExam";

/** A student_exam_guesses row (migration 0254), as the roster reads it. */
export type StoredExamGuess = {
  exam: string;
  source: GuessSource;
  /** The student's answer to the Home card: null (none yet), "correct" or "change". */
  answer: string | null;
};

/**
 * The exam /dashboard/students shows, muted, for a student who never chose one.
 *
 * The stored guess comes first: the daily job (scripts/profile/infer-exams.ts)
 * reads practice, which the roster cannot afford per student. The job only
 * guesses for accounts 3-5 days old, so a new account has nothing stored yet,
 * and the page they landed on stands in, read by the same `inferStudentExam`
 * the job uses. A guess the student said was wrong ("change") is dropped
 * without a re-guess, since the page would only repeat it.
 *
 * Pure. Spec: tests/students-roster-exam-guess.test.ts.
 */
export function rosterExamGuess(input: {
  targetExams: readonly string[];
  stored: StoredExamGuess | null;
  landing: string | null;
}): InferredExam | null {
  if (input.targetExams.length > 0) return null;
  const { stored } = input;
  if (stored?.answer === "change") return null;
  if (stored && onSiteExam(stored.exam)) return { slug: stored.exam, source: stored.source };
  return inferStudentExam({ practice: {}, landing: input.landing });
}

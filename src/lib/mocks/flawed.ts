/**
 * Questions defective as printed are GRACE in every mock: full marks to all,
 * no penalty (owner, 2026-10-29). Defective means no option is right, two are,
 * the data are impossible, or a condition is missing and cannot be recovered
 * from the source. Each such question also stays PUBLIC with a notice above its
 * solution, so the list and the notice are written together.
 *
 * One committed list, applied by `mockTestRow`, the one row builder every mock
 * builder uses, so a rebuild can never drop a grace. Published mocks pick up a
 * new entry through scripts/mocks/regrace-flawed.ts, which changes nothing else.
 *
 * Not `cancelled_note` (migration 0119): that is for a question the exam body
 * itself cancelled, and it removes the key. These keep one key.
 */
import type { MockQuestionSnapshot } from "./reconstruct";
import list from "./flawed.json";

export type FlawedQuestion = { id: string; reason: string };

export const FLAWED_QUESTIONS: readonly FlawedQuestion[] = list;

const FLAWED_IDS: ReadonlySet<string> = new Set(FLAWED_QUESTIONS.map((f) => f.id));

export function withFlawedGrace(
  questions: MockQuestionSnapshot[],
  flawed: ReadonlySet<string> = FLAWED_IDS
): MockQuestionSnapshot[] {
  return questions.map((q) => (flawed.has(q.questionId) && !q.grace ? { ...q, grace: true } : q));
}

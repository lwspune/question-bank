/**
 * How an MCQ option looks once its question's answer is showing. Pure and
 * shared by the /browse card and the /board reader (2026-10-04), so a tap
 * checks an answer the same way on both.
 *
 *   correct — the keyed option (picked or not)
 *   wrong   — the viewer's pick, when it is not the key
 *   none    — everything else, and everything before the answer shows
 *
 * A cancelled question (MPSC, migration 0119) has no right option, so a pick
 * is never painted wrong.
 */
export type OptionMark = "correct" | "wrong" | "none";

export function optionMark(input: {
  revealed: boolean;
  picked: boolean;
  isCorrect: boolean;
  cancelled?: boolean;
}): OptionMark {
  const { revealed, picked, isCorrect, cancelled = false } = input;
  if (!revealed) return "none";
  if (isCorrect) return "correct";
  if (picked && !cancelled) return "wrong";
  return "none";
}

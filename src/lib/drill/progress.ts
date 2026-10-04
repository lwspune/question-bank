/**
 * What one drill answer did to its question, in words (2026-10-04).
 *
 * The ladder is select.ts's and is not changed here: two right answers in a
 * row since the last miss fix a question, from any surface (the user's call,
 * 2026-10-04, after the 10-day-gap question). So the copy never says "for
 * good": a later miss anywhere puts the question straight back.
 *
 * Spec: tests/drill-progress.test.ts.
 */
import type { QuestionState } from "./select";

export type AnswerProgress = "wrong" | "fixed" | "rested" | "right";

export function answerProgress(input: {
  correct: boolean;
  /** The student had an `answer_wrong` for this question before this answer. */
  missedBefore: boolean;
  stateAfter: QuestionState;
}): AnswerProgress {
  if (!input.correct) return "wrong";
  if (input.stateAfter === "retired") return "fixed";
  return input.missedBefore ? "rested" : "right";
}

/** The line under the options once the answer is in. */
export function progressLine(p: AnswerProgress): string {
  switch (p) {
    case "fixed":
      return "Fixed: right twice since you missed it.";
    case "rested":
      return "Right. It rests now and comes back in 10 days to check it stuck.";
    case "right":
      return "Right.";
    case "wrong":
      return "Not this time.";
  }
}

/** The celebration when an answer fixes a question, with the running total. */
export function fixedMessage(totalFixed: number): string {
  const tail = totalFixed <= 1 ? "That's your first fix." : `${totalFixed} questions fixed so far.`;
  return `Fixed: right twice since you missed it. ${tail}`;
}

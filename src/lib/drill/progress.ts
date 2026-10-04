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
import { crowdMessage, type CrowdTier } from "@/lib/celebrate/crowd";
import { milestoneMessage } from "@/lib/celebrate/milestones";

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
      return "Got it this time! I'll bring it back in 10 days to check it stuck.";
    case "right":
      return "Right.";
    case "wrong":
      return "Not this time.";
  }
}

/** V's line when an answer fixes a question, with the running total. */
export function fixedMessage(totalFixed: number): string {
  if (totalFixed <= 1) return "Fixed! That's your first one.";
  return `Fixed! Right twice since you missed it. That's ${totalFixed} you've fixed.`;
}

/**
 * What V says inside the drill's answer panel (2026-10-04). V's launcher is
 * hidden on the drill (its "Next" bar owns that corner), so V speaks in the
 * panel instead of a bubble. Null = V stays quiet: a miss, or a plain right
 * answer to a new question. Order: the fix (the student's own progress), then
 * beating the crowd, then a milestone. V laughs at a win, talks otherwise.
 */
export function drillVSays(input: {
  correct: boolean;
  progress: AnswerProgress;
  fixedTotal: number | null;
  crowd: CrowdTier | null;
  milestone: number | null;
}): { lines: string[]; face: "laugh" | "talk"; fixed: boolean } | null {
  if (!input.correct) return null;
  const lines: string[] = [];
  const fixed = input.progress === "fixed" && input.fixedTotal !== null;
  if (fixed) lines.push(fixedMessage(input.fixedTotal!));
  else if (input.progress === "rested") lines.push(progressLine("rested"));
  if (input.crowd !== null) lines.push(crowdMessage(input.crowd));
  if (input.milestone !== null) lines.push(milestoneMessage(input.milestone));
  if (lines.length === 0) return null;
  return { lines, face: fixed || input.crowd !== null ? "laugh" : "talk", fixed };
}

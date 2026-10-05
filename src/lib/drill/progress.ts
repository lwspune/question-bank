/**
 * What one drill answer did to its question, in words (2026-10-04).
 *
 * The rule is select.ts's and is not changed here: one right answer since the
 * last miss fixes a question, from any surface (the user's call, 2026-10-05;
 * it took two before). So the copy never says "for good": a later miss
 * anywhere puts the question straight back.
 *
 * Spec: tests/drill-progress.test.ts.
 */
import type { QuestionState } from "./select";
import { crowdMessage, type CrowdTier } from "@/lib/celebrate/crowd";
import { milestoneMessage } from "@/lib/celebrate/milestones";

export type AnswerProgress = "wrong" | "fixed" | "right";

/**
 * A right answer is "fixed" only when the log, read back after the write, says
 * so. A lost write leaves the question due, and the student is told "right":
 * the drill never claims a fix it did not record.
 */
export function answerProgress(input: { correct: boolean; stateAfter: QuestionState }): AnswerProgress {
  if (!input.correct) return "wrong";
  return input.stateAfter === "retired" ? "fixed" : "right";
}

/** The line under the options once the answer is in. */
export function progressLine(p: AnswerProgress): string {
  switch (p) {
    case "fixed":
      return "Fixed: it's off your list. Miss it again and it comes back.";
    case "right":
      return "Right.";
    case "wrong":
      return "Not this time.";
  }
}

/** V's line when an answer fixes a question, with the running total. */
export function fixedMessage(totalFixed: number): string {
  if (totalFixed <= 1) return "Fixed! That's your first one.";
  return `Fixed! That's ${totalFixed} you've fixed.`;
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
  if (input.crowd !== null) lines.push(crowdMessage(input.crowd));
  if (input.milestone !== null) lines.push(milestoneMessage(input.milestone));
  if (lines.length === 0) return null;
  return { lines, face: fixed || input.crowd !== null ? "laugh" : "talk", fixed };
}

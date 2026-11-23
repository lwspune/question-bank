/**
 * How a notes/guide question card (WorkedExampleCard) reveals its answer. Board banks are
 * mostly written-answer rows (2026-11-23), so the card cannot assume options: an MCQ is
 * answered on its options, a written question opens its model answer in one tap, and a
 * numeric question prints its value through the bank's own formatter.
 * Spec: tests/worked-answer-mode.test.ts.
 */
import { formatNumericKey } from "@/lib/questions/formatKey";

export type WorkedFormat = "mcq" | "subjective" | "numeric" | "msq";

export type WorkedAnswerMode =
  | { kind: "options" }
  | { kind: "model" }
  | { kind: "numeric"; answer: string | null };

export function workedAnswerMode(q: {
  format: WorkedFormat | null;
  options: readonly unknown[];
  numericAnswer: number | null;
  numericAnswerMax: number | null;
}): WorkedAnswerMode {
  if (q.format === "subjective") return { kind: "model" };
  if (q.format === "numeric") return { kind: "numeric", answer: formatNumericKey(q.numericAnswer, q.numericAnswerMax) };
  return { kind: "options" };
}

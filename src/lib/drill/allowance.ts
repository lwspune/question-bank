/**
 * The free drill allowance (2026-10-05, owner): `limit` drill questions a day
 * for a free account (15 = three sets of five), unlimited with a pass. Pure;
 * /api/drill/answer enforces it, and the page serves no more than is left.
 *
 * It counts QUESTIONS ANSWERED in the drill today, never drill opens: the page
 * logs `drill_started` on every load, so counting opens would charge a student
 * for pressing refresh. A question answered once today can be answered again
 * without spending anything.
 */
import { DRILL_SIZE } from "./select";

export type DrillAllowanceInput = {
  /** null = the limit is off. */
  limit: number | null;
  hasPass: boolean;
  /** Question ids answered in the drill since midnight IST (repeats allowed). */
  answeredToday: readonly string[];
};

export type DrillAllowance =
  | { kind: "open" }
  | { kind: "free"; left: number; limit: number }
  | { kind: "locked"; limit: number };

export function drillAllowance(input: DrillAllowanceInput): DrillAllowance {
  if (input.limit === null || input.hasPass) return { kind: "open" };
  const left = input.limit - new Set(input.answeredToday).size;
  return left > 0 ? { kind: "free", left, limit: input.limit } : { kind: "locked", limit: input.limit };
}

/** How many questions the drill page serves now: a full set, or what is left. */
export function servedCount(allowance: DrillAllowance, size: number = DRILL_SIZE): number {
  if (allowance.kind === "open") return size;
  if (allowance.kind === "locked") return 0;
  return Math.min(size, allowance.left);
}

/** May this answer be graded? A question already answered today always may. */
export function canAnswerDrillQuestion(input: DrillAllowanceInput, questionId: string): boolean {
  if (input.answeredToday.includes(questionId)) return true;
  return drillAllowance(input).kind !== "locked";
}

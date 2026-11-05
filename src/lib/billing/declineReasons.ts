/**
 * Why a student did not buy (2026-11-05). The pass offers on the daily answer
 * limit and the download boxes carry a one-tap question, "Not buying today?
 * Tell us why", so a lost sale can be placed: price, a parent who pays, a free
 * plan that is enough, or a pass that does not look worth it. About 85% of the
 * students an offer met closed it without opening checkout (7 Oct to 4 Nov),
 * and nothing recorded why.
 *
 * Pure: the closed list of reasons (the API refuses anything else), their
 * labels (shared by the chips and /dashboard/sales) and the dashboard's sum.
 */
import type { ExamTier } from "@/lib/exam/examContext";
import type { PaywallGate } from "@/lib/activity/clientEvents";

export const DECLINE_REASONS = [
  "too_expensive",
  "ask_parent",
  "free_enough",
  "not_worth_it",
  "payment_failed",
] as const;
export type DeclineReason = (typeof DECLINE_REASONS)[number];

export const DECLINE_REASON_LABELS: Record<DeclineReason, string> = {
  too_expensive: "Too expensive",
  ask_parent: "Need to ask a parent",
  free_enough: "Free is enough for me",
  not_worth_it: "Not sure it's worth it",
  payment_failed: "Payment didn't work",
};

const REASON_SET: ReadonlySet<string> = new Set(DECLINE_REASONS);

export function isDeclineReason(v: unknown): v is DeclineReason {
  return typeof v === "string" && REASON_SET.has(v);
}

/** "Payment didn't work" only makes sense once a checkout has been opened. */
export const AFTER_CHECKOUT_ONLY: ReadonlySet<DeclineReason> = new Set<DeclineReason>(["payment_failed"]);

/** The chips a student sees, in order. */
export function reasonsOffered(afterCheckout: boolean): DeclineReason[] {
  return DECLINE_REASONS.filter((r) => afterCheckout || !AFTER_CHECKOUT_ONLY.has(r));
}

/**
 * Who answered. Class 9-12 students mostly cannot pay without a parent and
 * graduates pay for themselves, so the two are read apart; school and senior
 * tiers go together.
 */
export type DeclineGroup = "class_9_12" | "graduate" | "unknown";
export const DECLINE_GROUPS: readonly DeclineGroup[] = ["class_9_12", "graduate", "unknown"];
export const DECLINE_GROUP_LABELS: Record<DeclineGroup, string> = {
  class_9_12: "Class 9-12",
  graduate: "Graduate",
  unknown: "Not known",
};

export function declineGroupOf(tier: ExamTier | null): DeclineGroup {
  if (tier === "graduate") return "graduate";
  if (tier === "school" || tier === "senior") return "class_9_12";
  return "unknown";
}

/** Which offer it was: the answer limit, a download box, or anything else. */
export type DeclineOffer = "answers" | "downloads" | "other";
function offerOf(gate: PaywallGate): DeclineOffer {
  if (gate === "reveals") return "answers";
  if (gate === "teacher") return "downloads";
  return "other";
}

export type DeclineRow = {
  userId: string;
  reason: DeclineReason;
  gate: PaywallGate;
  afterCheckout: boolean;
  /** The student's tier (resolveStudentTier on their profile), null when unknown. */
  tier: ExamTier | null;
};

export type DeclineReasonCount = {
  reason: DeclineReason;
  label: string;
  total: number;
  byGroup: Record<DeclineGroup, number>;
  byOffer: Record<DeclineOffer, number>;
};

export type DeclineSummary = {
  /** Answers given (a student answers at most once per offer per day). */
  answers: number;
  /** Distinct students who answered. */
  students: number;
  /** Answers given after closing a checkout. */
  afterCheckout: number;
  /** Answers by student group. */
  groups: Record<DeclineGroup, number>;
  /** Every reason, in DECLINE_REASONS order, zeros included. */
  reasons: DeclineReasonCount[];
};

const zeroGroups = (): Record<DeclineGroup, number> => ({ class_9_12: 0, graduate: 0, unknown: 0 });
const zeroOffers = (): Record<DeclineOffer, number> => ({ answers: 0, downloads: 0, other: 0 });

export function summariseDeclines(rows: readonly DeclineRow[]): DeclineSummary {
  const reasons = new Map<DeclineReason, DeclineReasonCount>(
    DECLINE_REASONS.map((reason) => [
      reason,
      { reason, label: DECLINE_REASON_LABELS[reason], total: 0, byGroup: zeroGroups(), byOffer: zeroOffers() },
    ])
  );
  const groups = zeroGroups();
  const students = new Set<string>();
  let afterCheckout = 0;

  for (const r of rows) {
    const group = declineGroupOf(r.tier);
    const count = reasons.get(r.reason);
    if (!count) continue;
    count.total += 1;
    count.byGroup[group] += 1;
    count.byOffer[offerOf(r.gate)] += 1;
    groups[group] += 1;
    students.add(r.userId);
    if (r.afterCheckout) afterCheckout += 1;
  }

  return {
    answers: rows.filter((r) => reasons.has(r.reason)).length,
    students: students.size,
    afterCheckout,
    groups,
    reasons: [...reasons.values()],
  };
}

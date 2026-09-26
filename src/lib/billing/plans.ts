/**
 * One-time premium pass catalog + expiry math. Pure — safe to import anywhere
 * (the price is shown on /pricing, the duration is applied server-side on grant).
 *
 * Two passes (2026-09-26): a student mock pass and a teacher pass. Neither
 * sells scope "all" — that satisfies every scope, so a ₹99 student pass would
 * unlock the teacher's downloads. Pinned by tests/billing-plans.test.ts.
 */
import { SCOPE_MOCKS, SCOPE_TEACHER } from "@/lib/entitlements/access";

export type Plan = {
  /** Stable id stamped into Razorpay order notes + used to look up duration. */
  id: string;
  /** Shown on /pricing. */
  label: string;
  /** Amount in paise (₹999 = 99900). Razorpay works in the smallest unit. */
  amountPaise: number;
  currency: "INR";
  /** Access length in days from purchase; null = lifetime (no expiry). */
  durationDays: number | null;
  /** Entitlement scope granted (see lib/entitlements/access). */
  scope: string;
  /** One-line value prop for the pricing card. */
  blurb: string;
};

export const PLANS: readonly Plan[] = [
  {
    id: "mock-pass-6m",
    label: "Student Mock Pass",
    amountPaise: 9900,
    currency: "INR",
    durationDays: 182,
    scope: SCOPE_MOCKS,
    blurb: "Unlimited timed mock tests for 6 months, past your free mocks.",
  },
  {
    id: "teacher-pass-1y",
    label: "Teacher Pass",
    amountPaise: 49900,
    currency: "INR",
    durationDays: 365,
    scope: SCOPE_TEACHER,
    blurb: "Download Word question papers and answer keys for a year. Includes unlimited mocks.",
  },
];

export function getPlan(id: string): Plan | null {
  return PLANS.find((p) => p.id === id) ?? null;
}

/** ISO expiry `durationDays` from `nowMs`; null for a lifetime plan. */
export function computeExpiry(nowMs: number, durationDays: number | null): string | null {
  if (durationDays === null) return null;
  return new Date(nowMs + durationDays * 86_400_000).toISOString();
}

/** Display helper: how long a plan lasts, e.g. "6 months", "1 year". */
export function planLengthLabel(plan: Pick<Plan, "durationDays">): string {
  if (plan.durationDays === null) return "lifetime";
  if (plan.durationDays === 365) return "1 year";
  if (plan.durationDays === 182) return "6 months";
  return `${plan.durationDays} days`;
}

/** Display helper: paise → "₹999". */
export function formatRupees(amountPaise: number): string {
  return `₹${(amountPaise / 100).toLocaleString("en-IN")}`;
}

/** The fields of a Razorpay order that decide what it bought. */
export type PaidOrder = {
  status?: string;
  amount_paid?: number;
  currency?: string;
  notes?: Record<string, string> | null;
};

/**
 * The plan a paid order bought, for the account that is claiming it. Everything
 * comes from the order Razorpay holds — never from the caller — because the
 * checkout signature proves payment, not which plan was paid for.
 */
export function planForPaidOrder(
  order: PaidOrder,
  sessionUserId: string
): { ok: true; plan: Plan } | { ok: false; reason: string } {
  if (order.status !== "paid") return { ok: false, reason: "order not paid" };
  const notes = order.notes ?? {};
  if (notes.userId !== sessionUserId) return { ok: false, reason: "order belongs to another account" };
  const plan = getPlan(notes.planId ?? "");
  if (!plan) return { ok: false, reason: "unknown plan" };
  if (order.amount_paid !== plan.amountPaise || order.currency !== plan.currency) {
    return { ok: false, reason: "amount does not match plan" };
  }
  return { ok: true, plan };
}

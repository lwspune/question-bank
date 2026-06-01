/**
 * One-time premium pass catalog + expiry math. Pure — safe to import anywhere
 * (the price is shown on /pricing, the duration is applied server-side on grant).
 *
 * Single tier today (scope "all" = full premium). Add entries to sell more.
 */

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
  /** Entitlement scope granted. "all" = full premium. */
  scope: string;
  /** One-line value prop for the pricing card. */
  blurb: string;
};

export const PLANS: readonly Plan[] = [
  {
    id: "premium-365",
    label: "1-year premium",
    amountPaise: 99900,
    currency: "INR",
    durationDays: 365,
    scope: "all",
    blurb: "Full access to every premium notes chapter for 365 days.",
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

/** Display helper: paise → "₹999". */
export function formatRupees(amountPaise: number): string {
  return `₹${(amountPaise / 100).toLocaleString("en-IN")}`;
}

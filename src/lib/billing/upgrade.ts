/**
 * Pass upgrade (owner, 2026-11-11): a student holding a paid pass that a
 * dearer pass includes (today the Practice Pass, which the Premium Pass
 * includes) buys the dearer one for its price less what is left of the one
 * they hold. Before this, a Practice Pass holder at a download box was asked
 * the full Premium price, with "Everything in the Practice Pass" listed as a
 * perk they had paid for minutes earlier (11-10: one did, and said "too
 * expensive").
 *
 * THE CREDIT (owner: "shrinks with time used"): what the student PAID for the
 * pass (the entitlement's amount_paise, so points or a parent's payment are
 * counted as paid), times the share of its days still left, to the nearest
 * whole rupee. A free grant (comp, manual, referral days) carries no payment
 * and so no credit. Vault Points then come off the upgrade price (owner: "yes,
 * on top"): fixPoints.stampDiscountNotes discounts whatever the notes say is
 * being charged.
 *
 * THE ORDER IS STILL THE CONTRACT: /api/billing/order (and the parent order)
 * stamps the upgrade price into the Razorpay order, and the grant paths hold
 * the payment to it. The pass granted is the dearer pass for its full length
 * from the day of the upgrade; the old row is left alone (the new one
 * includes it).
 *
 * Pure.
 */
import { isEntitlementActive, scopeIncludes, type Entitlement } from "@/lib/entitlements/access";
import { fixPointsGrantNote } from "./fixPoints";
import { parentGrantNote } from "./parentLink";
import type { Plan } from "./plans";

/** Razorpay's smallest charge, ₹1: a credit never brings a price under it. */
export const MIN_CHARGE_PAISE = 100;

const FALLBACK_LABEL = "current pass";

export type CreditRow = Pick<Entitlement, "scope" | "source" | "status" | "grantedAt" | "expiresAt"> & {
  amountPaise?: number | null;
  currency?: string | null;
};

export type UpgradeCredit = {
  /** Whole rupees, in paise; 0 = not an upgrade. */
  creditPaise: number;
  /** The pass the credit comes from, as the offer names it ("Practice Pass"); null with no credit. */
  fromLabel: string | null;
};

const NONE: UpgradeCredit = { creditPaise: 0, fromLabel: null };

/** The unused share of a paid row, in paise (fractional); 0 for a row that earns no credit. */
function unusedPaise(row: CreditRow, target: Pick<Plan, "scope" | "currency">, nowMs: number): number {
  if (row.source !== "razorpay" || !isEntitlementActive(row, nowMs)) return 0;
  // An upgrade only: the target gives everything the row gave, and more.
  if (row.scope === target.scope || !scopeIncludes(target.scope, row.scope)) return 0;
  if (row.currency !== target.currency) return 0;
  const paid = row.amountPaise ?? 0;
  if (!Number.isFinite(paid) || paid <= 0 || !row.expiresAt) return 0;
  const start = Date.parse(row.grantedAt);
  const end = Date.parse(row.expiresAt);
  if (!Number.isFinite(start) || !Number.isFinite(end) || end <= start) return 0;
  const left = Math.min(1, Math.max(0, (end - nowMs) / (end - start)));
  return paid * left;
}

/**
 * What `rows` (one student's entitlements) take off `target` at `nowMs`. Zero
 * when the student already holds the target, or holds nothing paid that the
 * target includes. `plans` names the credited pass for the offer.
 */
export function upgradeCredit(
  rows: readonly CreditRow[],
  target: Pick<Plan, "scope" | "currency" | "amountPaise">,
  plans: readonly Pick<Plan, "scope" | "label" | "site" | "currency">[],
  nowMs: number
): UpgradeCredit {
  if (rows.some((r) => isEntitlementActive(r, nowMs) && scopeIncludes(r.scope, target.scope))) return NONE;
  let total = 0;
  let fromScope: string | null = null;
  for (const r of rows) {
    const part = unusedPaise(r, target, nowMs);
    if (part > 0) {
      total += part;
      fromScope ??= r.scope;
    }
  }
  // Nearest rupee: a pass bought minutes ago credits its full price, not a rupee less.
  const whole = Math.round(total / 100) * 100;
  const creditPaise = Math.max(0, Math.min(whole, target.amountPaise - MIN_CHARGE_PAISE));
  if (creditPaise <= 0) return NONE;
  const named = plans.find((p) => p.scope === fromScope && p.currency === target.currency);
  return { creditPaise, fromLabel: named?.label ?? FALLBACK_LABEL };
}

/**
 * The order notes for an upgrade: `amountPaise` becomes the list price less
 * the credit, with the list price and the credit beside it. Runs BEFORE
 * fixPoints.stampDiscountNotes, which takes points off what is charged. No
 * credit returns the notes untouched.
 */
export function stampUpgradeNotes(notes: Record<string, string>, creditPaise: number): Record<string, string> {
  if (!Number.isInteger(creditPaise) || creditPaise <= 0) return notes;
  const charged = Number(notes.amountPaise);
  return {
    ...notes,
    amountPaise: String(Math.max(MIN_CHARGE_PAISE, charged - creditPaise)),
    listPaise: notes.listPaise ?? notes.amountPaise,
    upgradeCreditPaise: String(creditPaise),
  };
}

/** "upgrade_credit:<paise>" for a pass bought as an upgrade; null otherwise. */
export function upgradeGrantNote(notes: Record<string, string> | null | undefined): string | null {
  const n = Number(notes?.upgradeCreditPaise);
  return Number.isInteger(n) && n > 0 ? `upgrade_credit:${n}` : null;
}

/**
 * The entitlement note for a paid order, written by every grant path (verify,
 * parent-verify, the webhook), whichever lands first. The parent or points
 * mark stays FIRST because /dashboard/sales and the fix-points readout find
 * them with LIKE 'parent_link:%' and LIKE 'fix_points:%'; the upgrade mark
 * follows.
 */
export function orderGrantNote(notes: Record<string, string> | null | undefined): string | null {
  const parts = [parentGrantNote(notes?.parentLink) ?? fixPointsGrantNote(notes), upgradeGrantNote(notes)].filter(
    (p): p is string => p !== null
  );
  return parts.length > 0 ? parts.join(" ") : null;
}

/**
 * The credit toward each rupee pass on www that one of `rows` is an upgrade
 * to, for the offers (/api/me/fix-points, /pricing). planId -> paise, plus the
 * credited pass's name.
 */
export function upgradeCredits(
  rows: readonly CreditRow[],
  plans: readonly Plan[],
  nowMs: number
): { credits: Record<string, number>; creditFrom: string | null } {
  const credits: Record<string, number> = {};
  let creditFrom: string | null = null;
  for (const p of plans) {
    if (!p.active || p.site !== "pyqvault" || p.currency !== "INR") continue;
    const c = upgradeCredit(rows, p, plans, nowMs);
    if (c.creditPaise > 0) {
      credits[p.id] = c.creditPaise;
      creditFrom ??= c.fromLabel;
    }
  }
  return { credits, creditFrom };
}

/** `plan`'s price for the student holding `rows`: list less any upgrade credit (no points; a parent's price). */
export function upgradePricePaise(plan: Plan, rows: readonly CreditRow[], plans: readonly Plan[], nowMs: number): number {
  return plan.amountPaise - upgradeCredit(rows, plan, plans, nowMs).creditPaise;
}

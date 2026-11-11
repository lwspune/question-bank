/**
 * Pass upgrade (owner, 2026-11-11): a student holding a paid pass that a
 * dearer pass includes (today the Practice Pass, which the Premium Pass
 * includes) moves to the dearer pass for the days their pass has LEFT, paying
 * the difference for those days, and the dearer pass ends on the same date.
 * Before this, a Practice Pass holder at a download box was asked the full
 * Premium price, with "Everything in the Practice Pass" listed as a perk they
 * had paid for minutes earlier (11-10: one did, and said "too expensive").
 *
 * THE PRICE (owner: "pay the difference, same end date", chosen over a fresh
 * 6 months, which made the upgrade dearer the longer the student waited):
 *
 *   price = target list x left / target length  -  paid x left / pass length
 *
 * to the nearest rupee, where `left` is the time to the pass's end and `paid`
 * is what the student PAID for it (points or a parent's payment count as
 * paid). With both passes 6 months long that is (₹499 - ₹199) x days left /
 * 182: ₹300 on day 0, ₹218 on day 50, ₹150 halfway. A free grant (comp,
 * manual, referral days) carries no payment and is no upgrade. Vault Points
 * then come off the upgrade price (owner: "yes, on top"):
 * fixPoints.stampDiscountNotes discounts whatever the notes say is charged.
 *
 * THE ORDER IS STILL THE CONTRACT: the order route (and the parent order)
 * stamps the upgrade price AND its end date into the Razorpay order, and the
 * grant paths hold the payment to the price and grant until that date
 * (plans.grantExpiry). The old pass row is left alone: the new one includes it.
 *
 * Pure.
 */
import { isEntitlementActive, scopeIncludes, type Entitlement } from "@/lib/entitlements/access";
import { fixPointsGrantNote } from "./fixPoints";
import { parentGrantNote } from "./parentLink";
import type { Plan } from "./plans";

/** Razorpay's smallest charge, ₹1: an upgrade never costs less. */
export const MIN_CHARGE_PAISE = 100;

const DAY_MS = 86_400_000;
const FALLBACK_LABEL = "current pass";

export type CreditRow = Pick<Entitlement, "scope" | "source" | "status" | "grantedAt" | "expiresAt"> & {
  amountPaise?: number | null;
  currency?: string | null;
};

export type Upgrade = {
  /** What the upgrade costs, in paise, whole rupees, before any Vault Points. */
  pricePaise: number;
  /** The target's list price less the upgrade price: what the student does not pay. */
  creditPaise: number;
  /** When the upgraded pass ends: the held pass's own end (ISO). */
  endsAt: string;
  /** The pass upgraded from, as the offer names it ("Practice Pass"). */
  fromLabel: string;
};

type Held = { paid: number; start: number; end: number; scope: string };

/** A row the target is an upgrade to: paid, active, strictly included by the target, same currency. */
function heldPass(row: CreditRow, target: Pick<Plan, "scope" | "currency">, nowMs: number): Held | null {
  if (row.source !== "razorpay" || !isEntitlementActive(row, nowMs)) return null;
  if (row.scope === target.scope || !scopeIncludes(target.scope, row.scope)) return null;
  if (row.currency !== target.currency) return null;
  const paid = row.amountPaise ?? 0;
  if (!Number.isFinite(paid) || paid <= 0 || !row.expiresAt) return null;
  const start = Date.parse(row.grantedAt);
  const end = Date.parse(row.expiresAt);
  if (!Number.isFinite(start) || !Number.isFinite(end) || end <= start || end <= nowMs) return null;
  return { paid, start, end, scope: row.scope };
}

/**
 * The upgrade to `target` that `rows` (one student's entitlements) allow at
 * `nowMs`, or null: the student holds the target already, holds nothing paid
 * that the target includes, or holds a pass that outlasts the target's own
 * length (it would sell more of the target than the target sells). With two
 * such passes, the one that ends last decides.
 */
export function upgradeFor(
  rows: readonly CreditRow[],
  target: Pick<Plan, "scope" | "currency" | "amountPaise" | "durationDays">,
  plans: readonly Pick<Plan, "scope" | "label" | "currency">[],
  nowMs: number
): Upgrade | null {
  if (target.durationDays === null || target.durationDays <= 0) return null;
  if (rows.some((r) => isEntitlementActive(r, nowMs) && scopeIncludes(r.scope, target.scope))) return null;
  let held: Held | null = null;
  for (const r of rows) {
    const h = heldPass(r, target, nowMs);
    if (h && (!held || h.end > held.end)) held = h;
  }
  if (!held) return null;
  const left = held.end - nowMs;
  const targetMs = target.durationDays * DAY_MS;
  if (left > targetMs) return null;
  const owed = (target.amountPaise * left) / targetMs - (held.paid * left) / (held.end - held.start);
  const pricePaise = Math.max(MIN_CHARGE_PAISE, Math.min(target.amountPaise, Math.round(owed / 100) * 100));
  const creditPaise = target.amountPaise - pricePaise;
  if (creditPaise <= 0) return null;
  const named = plans.find((p) => p.scope === held.scope && p.currency === target.currency);
  return { pricePaise, creditPaise, endsAt: new Date(held.end).toISOString(), fromLabel: named?.label ?? FALLBACK_LABEL };
}

/**
 * The upgrades a student has to each rupee pass on www, for the offers
 * (/api/me/fix-points, /pricing): planId -> what they do not pay, plus the
 * pass upgraded from and when the upgrade would end.
 */
export function upgradeCredits(
  rows: readonly CreditRow[],
  plans: readonly Plan[],
  nowMs: number
): { credits: Record<string, number>; creditFrom: string | null; creditEndsAt: string | null } {
  const credits: Record<string, number> = {};
  let creditFrom: string | null = null;
  let creditEndsAt: string | null = null;
  for (const p of plans) {
    if (!p.active || p.site !== "pyqvault" || p.currency !== "INR") continue;
    const u = upgradeFor(rows, p, plans, nowMs);
    if (u) {
      credits[p.id] = u.creditPaise;
      creditFrom ??= u.fromLabel;
      creditEndsAt ??= u.endsAt;
    }
  }
  return { credits, creditFrom, creditEndsAt };
}

/** `plan`'s price for the student holding `rows`: the upgrade price, else the list price (no points; a parent's price). */
export function upgradePricePaise(plan: Plan, rows: readonly CreditRow[], plans: readonly Plan[], nowMs: number): number {
  return upgradeFor(rows, plan, plans, nowMs)?.pricePaise ?? plan.amountPaise;
}

/**
 * The order notes for an upgrade: `amountPaise` becomes the upgrade price,
 * with the list price, the credit and the END DATE beside it (the grant reads
 * `upgradeEndsAt` in place of the plan's length). Runs BEFORE
 * fixPoints.stampDiscountNotes. No upgrade returns the notes untouched.
 */
export function stampUpgradeNotes(notes: Record<string, string>, upgrade: Upgrade | null): Record<string, string> {
  if (!upgrade) return notes;
  return {
    ...notes,
    amountPaise: String(upgrade.pricePaise),
    listPaise: notes.listPaise ?? notes.amountPaise,
    upgradeCreditPaise: String(upgrade.creditPaise),
    upgradeEndsAt: upgrade.endsAt,
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

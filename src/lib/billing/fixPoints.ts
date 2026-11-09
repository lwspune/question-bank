/**
 * Fix Points (owner, 2026-11-09): a student earns one point for each mistake
 * they FIX (a question they had missed, then answered right, graded by the
 * server), and each point is 1% off the pass, up to FIX_POINTS_MAX_PCT.
 *
 * Only points earned in the last FIX_POINTS_WINDOW_DAYS count, and a purchase
 * starts the count again: points expire by the window alone, with no decay job
 * and no spend ledger. Referral discounts (the next branch) add on top, up to
 * COMBINED_DISCOUNT_CAP_PCT.
 *
 * WHY POINTS ONLY FOR FIXES: the rewarded act is deliberate practice on the
 * student's own misses (the engagement gate in CLAUDE.md). Points for every
 * right answer would reward volume on easy questions; points taken away for a
 * wrong one would teach students to skip the hard questions the drill exists for.
 *
 * Pure. The award and the balance read live in fixPointsService.ts.
 */
import { formatPrice, type Plan } from "./plans";
import { istDayKey } from "@/lib/email/dueNudge";
import { SCOPE_MOCKS, SCOPE_PRACTICE } from "@/lib/entitlements/access";

export const FIX_POINTS_MAX_PCT = 40;
export const FIX_POINTS_WINDOW_DAYS = 30;
export const COMBINED_DISCOUNT_CAP_PCT = 50;

const DAY_MS = 24 * 60 * 60 * 1000;

/** The percentage `points` are worth: one each, capped, junk counts as none. */
export function fixPointsPct(points: number): number {
  if (!Number.isFinite(points) || points <= 0) return 0;
  return Math.min(FIX_POINTS_MAX_PCT, Math.floor(points));
}

/** The whole discount on an order: points plus any referral, capped together. */
export function discountPct(d: { points: number; referralPct?: number }): number {
  const referral = Number.isFinite(d.referralPct) && (d.referralPct ?? 0) > 0 ? Math.floor(d.referralPct ?? 0) : 0;
  return Math.min(COMBINED_DISCOUNT_CAP_PCT, fixPointsPct(d.points) + referral);
}

/** `listPaise` less `pct`%, rounded down to a whole rupee. */
export function discountedPaise(listPaise: number, pct: number): number {
  if (pct <= 0) return listPaise;
  return Math.floor((listPaise * (100 - pct)) / 100 / 100) * 100;
}

/** Points earned at or after this instant count: the later of 30 days ago and the last purchase. */
export function fixPointsWindowStart(now: Date, lastPurchase: Date | null): Date {
  const windowStart = new Date(now.getTime() - FIX_POINTS_WINDOW_DAYS * DAY_MS);
  return lastPurchase && lastPurchase > windowStart ? lastPurchase : windowStart;
}

/** The rupee passes sold on www. Not the intl / IMAT passes, which have their own prices per country. */
export function planTakesDiscount(plan: Pick<Plan, "site" | "currency" | "scope">): boolean {
  return plan.site === "pyqvault" && plan.currency === "INR" && (plan.scope === SCOPE_MOCKS || plan.scope === SCOPE_PRACTICE);
}

/**
 * The order notes for a discounted sale: `amountPaise` becomes the price
 * charged (the paid-order check compares the payment with it, unchanged), and
 * the list price and points used ride beside it for /dashboard/sales and the
 * experiment's readout. No discount, or a plan that takes none, returns the
 * notes untouched.
 */
export function stampDiscountNotes(
  notes: Record<string, string>,
  plan: Plan,
  d: { points: number; referralPct?: number }
): Record<string, string> {
  if (!planTakesDiscount(plan)) return notes;
  const pct = discountPct(d);
  if (pct <= 0) return notes;
  return {
    ...notes,
    amountPaise: String(discountedPaise(plan.amountPaise, pct)),
    listPaise: String(plan.amountPaise),
    fixPoints: String(fixPointsPct(d.points)),
    discountPct: String(pct),
  };
}

/**
 * The entitlement note for a pass bought with points ("fix_points:<n>"), so
 * the experiment's readout can count those sales; null otherwise. Read from
 * the order's own notes by BOTH grant paths (verify and the webhook), since
 * whichever lands first writes the row.
 */
export function fixPointsGrantNote(notes: Record<string, string> | null | undefined): string | null {
  const n = Number(notes?.fixPoints);
  return Number.isInteger(n) && n > 0 ? `fix_points:${n}` : null;
}

/** What /api/me/fix-points answers: the points, what they are worth, and the new price of each pass they lower. */
export type FixPointsView = {
  points: number;
  pct: number;
  maxPct: number;
  /** A pass holder's points count toward their next pass; the offer lines stay quiet for them. */
  hasPass: boolean;
  /** planId -> discounted price, only for active passes the points lower. */
  prices: Record<string, string>;
};

export function fixPointsView(i: { points: number; plans: readonly Plan[]; hasPass: boolean }): FixPointsView {
  const pct = fixPointsPct(i.points);
  const prices: Record<string, string> = {};
  if (pct > 0) {
    for (const p of i.plans) {
      if (p.active && planTakesDiscount(p)) prices[p.id] = formatPrice(discountedPaise(p.amountPaise, pct), p.currency);
    }
  }
  return { points: Math.max(0, Math.floor(i.points) || 0), pct, maxPct: FIX_POINTS_MAX_PCT, hasPass: i.hasPass, prices };
}

const plural = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`;

/** The line under a pass offer whose price the points lowered; null when they did not. */
export function fixPointsOfferNote(v: FixPointsView | null): string | null {
  if (!v || v.hasPass || v.pct <= 0) return null;
  return `Includes ${v.pct}% off: you fixed ${plural(v.points, "mistake", "mistakes")} in the last 30 days.`;
}

/** The status line on the drill and Review (owner, 2026-11-09: shown with its value). Null for a pass holder. */
export function fixPointsStatusLine(v: FixPointsView | null): string | null {
  if (!v || v.hasPass) return null;
  if (v.points <= 0) return `Get a question right that you missed on an earlier day to earn 1% off the pass, up to ${v.maxPct}%.`;
  const pts = plural(v.points, "fix point", "fix points");
  if (v.pct >= v.maxPct) return `${pts}: the full ${v.maxPct}% off the pass. Points last 30 days.`;
  return `${pts}: ${v.pct}% off the pass. Each mistake you fix adds 1%, up to ${v.maxPct}%. Points last 30 days.`;
}

type Answer = { userId: string; questionId: string; at: string };

/**
 * The launch grant (scripts/growth/fix-points-backfill.ts): from graded right
 * answers and misses already on record, the fixes the award would have paid,
 * by the award's own rule (a miss on an EARLIER IST day; once per student and
 * question, the earliest). `earnedAt` is the fix's own time, so the 30-day
 * window lapses each point on the day it would have lapsed anyway.
 */
export function pickBackfillFixes(
  rights: readonly Answer[],
  misses: readonly Answer[]
): { userId: string; questionId: string; earnedAt: string }[] {
  const firstMissDay = new Map<string, string>();
  for (const m of misses) {
    const k = `${m.userId}|${m.questionId}`;
    const day = istDayKey(new Date(m.at));
    const had = firstMissDay.get(k);
    if (!had || day < had) firstMissDay.set(k, day);
  }
  const best = new Map<string, Answer>();
  for (const r of rights) {
    const k = `${r.userId}|${r.questionId}`;
    const missDay = firstMissDay.get(k);
    if (!missDay || missDay >= istDayKey(new Date(r.at))) continue;
    const had = best.get(k);
    if (!had || r.at < had.at) best.set(k, r);
  }
  return [...best.values()].map((r) => ({ userId: r.userId, questionId: r.questionId, earnedAt: r.at }));
}

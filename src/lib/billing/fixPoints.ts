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
  /** When the oldest point in the window runs out (its earned time + 30 days, ISO); null with no points. */
  lapsesOn: string | null;
  /** planId -> discounted price, only for active passes the points lower. */
  prices: Record<string, string>;
};

export function fixPointsView(i: {
  points: number;
  plans: readonly Plan[];
  hasPass: boolean;
  /** Earned time of the oldest point still in the window (fixPointsService.readFixPoints). */
  oldestAt?: string | null;
}): FixPointsView {
  const points = Math.max(0, Math.floor(i.points) || 0);
  const pct = fixPointsPct(points);
  const prices: Record<string, string> = {};
  if (pct > 0) {
    for (const p of i.plans) {
      if (p.active && planTakesDiscount(p)) prices[p.id] = formatPrice(discountedPaise(p.amountPaise, pct), p.currency);
    }
  }
  const oldest = i.oldestAt ? new Date(i.oldestAt) : null;
  const lapsesOn =
    points > 0 && oldest && !Number.isNaN(oldest.getTime())
      ? new Date(oldest.getTime() + FIX_POINTS_WINDOW_DAYS * DAY_MS).toISOString()
      : null;
  return { points, pct, maxPct: FIX_POINTS_MAX_PCT, hasPass: i.hasPass, lapsesOn, prices };
}

/*
 * Student-facing copy. The points are called VAULT POINTS (owner, 2026-11-09):
 * fixing a mistake is the first way to earn them, not the only one planned,
 * so the name does not say "fix". Internal names (table fix_points, these
 * functions' module) keep the first activity's name.
 */
const plural = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`;
const vp = (n: number) => plural(n, "Vault Point", "Vault Points");
/** The pass the points lower: a pass holder's points count toward the NEXT one. */
const target = (v: FixPointsView) => (v.hasPass ? "your next pass" : "the pass");

/** The line under a pass offer whose price the points lowered; null when they did not. */
export function vaultPointsOfferNote(v: FixPointsView | null): string | null {
  if (!v || v.hasPass || v.pct <= 0) return null;
  return `Includes ${v.pct}% off from your ${vp(v.points)}.`;
}

/** The status line on /me, the drill's end screen and Review (owner, 2026-11-09: shown with its value, to every student). */
export function vaultPointsLine(v: FixPointsView | null): string | null {
  if (!v) return null;
  if (v.points <= 0) {
    return `Get a question right that you missed on an earlier day to earn a Vault Point: 1% off ${target(v)}, up to ${v.maxPct}%.`;
  }
  if (v.pct >= v.maxPct) return `${vp(v.points)}: the full ${v.maxPct}% off ${target(v)}. Points last 30 days.`;
  return `${vp(v.points)}: ${v.pct}% off ${target(v)}. Each mistake you fix adds 1%, up to ${v.maxPct}%. Points last 30 days.`;
}

/** The avatar menu's one line. */
export function vaultPointsShort(v: FixPointsView | null): string | null {
  if (!v) return null;
  if (v.points <= 0) return `0 Vault Points · fix a mistake to earn 1% off`;
  if (v.pct >= v.maxPct) return `${vp(v.points)} · the full ${v.maxPct}% off`;
  return `${vp(v.points)} · ${v.pct}% off ${target(v)}`;
}

/** When the oldest points run out, as an IST date ("2 Dec"); null without a date. */
export function vaultPointsLapseLine(v: FixPointsView | null): string | null {
  if (!v || !v.lapsesOn || v.points <= 0) return null;
  const day = new Date(v.lapsesOn).toLocaleDateString("en-IN", { day: "numeric", month: "short", timeZone: "Asia/Kolkata" });
  return v.points === 1 ? `This point runs out on ${day}.` : `Your oldest points run out on ${day}.`;
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

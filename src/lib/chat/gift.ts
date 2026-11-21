/**
 * V's gift (owner, 2026-11-21): V tells a student about something they have
 * already EARNED, as a gift in its chat, to give the conversation a human
 * touch. Nothing new is given away, so no engagement rule bends:
 *
 *   - the 7-day pass is the answer-limit trial (migration 0273), offered by the
 *     server on a student's 3rd day at the daily limit and granted only by
 *     its own Activate (activate_practice_trial checks again at the tap);
 *   - the discount is their Vault Points (migration 0245), 1% off per mistake
 *     fixed, shown when they reach 10, 20, 30 or 40.
 *
 * The SERVER says which gift is earned (lib/chat/giftServer, carried by the
 * pulse); the BROWSER says whether it is still waiting (lib/chat/giftSeen).
 * The surprise is that V says only "I have a gift for you" until the box is
 * opened. Pure and browser-safe. Spec: tests/chat-gift.test.ts.
 */

export const GIFT_MILESTONES = [10, 20, 30, 40] as const;
export type GiftMilestone = (typeof GIFT_MILESTONES)[number];

export type VGift = { kind: "trial" } | { kind: "points"; milestone: GiftMilestone };

/** The highest milestone reached, or null under 10 points. */
export function pointsMilestone(points: number): GiftMilestone | null {
  if (!Number.isFinite(points)) return null;
  let best: GiftMilestone | null = null;
  for (const m of GIFT_MILESTONES) if (points >= m) best = m;
  return best;
}

/**
 * The gift a student has earned now. Nothing while a pass is active: the
 * trial would be refused and the points lower only a next pass. The 7-day
 * pass comes first: it is offered on one day at a time, the points last.
 */
export function earnedGift(i: {
  hasPass: boolean;
  /** Any pass ever, the trial included: the trial is never offered after one (0273). */
  everHadPass: boolean;
  /** The answer limit offered the 7-day pass today (a practice_trial_offers row for today). */
  trialOfferToday: boolean;
  /** Vault Points in their window (lib/billing/fixPoints). */
  points: number;
}): VGift | null {
  if (i.hasPass) return null;
  if (i.trialOfferToday && !i.everHadPass) return { kind: "trial" };
  const milestone = pointsMilestone(i.points);
  return milestone ? { kind: "points", milestone } : null;
}

/** One name per gift: the trial is one per account; each points milestone is its own gift. */
export function giftKey(g: VGift): string {
  return g.kind === "trial" ? "trial" : `points:${g.milestone}`;
}

/** A gift exactly as earnedGift builds it, or null. */
export function parseGift(v: unknown): VGift | null {
  if (!v || typeof v !== "object") return null;
  const o = v as Record<string, unknown>;
  if (o.kind === "trial") return { kind: "trial" };
  if (o.kind === "points" && (GIFT_MILESTONES as readonly unknown[]).includes(o.milestone)) {
    return { kind: "points", milestone: o.milestone as GiftMilestone };
  }
  return null;
}

/** All V says before the box is opened: the surprise. */
export const GIFT_TEASER = "I have a gift for you.";
export const GIFT_OPEN_LABEL = "Open your gift";

/** What earned it, first thing inside the box. */
export function giftReason(g: VGift): string {
  return g.kind === "trial"
    ? "You keep using all your free answers. That is real practice."
    : `You have fixed ${g.milestone} of your old mistakes.`;
}

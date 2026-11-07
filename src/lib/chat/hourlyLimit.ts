/**
 * V's hourly limit by pass (owner, 2026-11-07). Everyone may type
 * `perPersonPerHour` messages an hour (5); Premium Pass holders, the downloads
 * scope (Premium, the old teacher pass, `all`), may go on to
 * `premiumPerPersonPerHour` (50). Free answers were never the felt limit for a
 * paying student: 5 of the 33 students who sent 5 messages inside an hour
 * (19 Oct to 7 Nov) held a pass.
 *
 * At the limit a signed-in free student is offered Premium. A Practice holder
 * gets only the wait line: there is no upgrade price yet, so a ₹499 card
 * would read as a second charge.
 *
 * Pure. Spec: tests/chat-hourly-limit.test.ts. Used by /api/chat/typed.
 */
import { hasActiveScope, SCOPE_DOWNLOADS, SCOPE_PRACTICE, type Entitlement } from "@/lib/entitlements/access";
import type { PassCta } from "@/lib/billing/plans";
import { parseVPassOffer } from "./passOffer";

export type VPassTier = "premium" | "pass" | "none";

export function vPassTier(rows: readonly Entitlement[], nowMs: number): VPassTier {
  const list = [...rows];
  if (hasActiveScope(list, SCOPE_DOWNLOADS, nowMs)) return "premium";
  if (hasActiveScope(list, SCOPE_PRACTICE, nowMs)) return "pass";
  return "none";
}

export type HourlyOutcome = { allowed: true } | { allowed: false; limit: number; offerPremium: boolean };

/** `used` counts this message: the rate limiter increments before it answers. */
export function hourlyOutcome(input: {
  used: number;
  freeLimit: number;
  premiumLimit: number;
  tier: VPassTier;
  signedIn: boolean;
}): HourlyOutcome {
  const { used, freeLimit, tier, signedIn } = input;
  // A Premium limit set below the free one never shrinks a holder's allowance.
  const premiumLimit = Math.max(input.premiumLimit, freeLimit);
  const limit = tier === "premium" ? premiumLimit : freeLimit;
  if (used <= limit) return { allowed: true };
  return { allowed: false, limit, offerPremium: signedIn && tier === "none" };
}

/** What V says at the limit. Whole minutes, never "0 minutes". */
export function hourlyLimitLine(limit: number, retryAfterSec: number): string {
  const minutes = Math.max(1, Math.ceil(retryAfterSec / 60));
  return `You've asked ${limit} questions this hour. You can ask again in ${minutes} ${minutes === 1 ? "minute" : "minutes"}.`;
}

export type HourlyLimitReply = { line: string; pass: PassCta | null; premiumLimit: number | null };

/**
 * The `hourlyLimit` part of a 429 from /api/chat/typed, as the chat window
 * reads it: the wait line, and the Premium Pass to offer (only when the server
 * offered one, and only a well-formed one).
 */
export function parseHourlyLimit(raw: unknown): HourlyLimitReply | null {
  const o = raw as { line?: unknown; offer?: unknown; pass?: unknown; premiumLimit?: unknown } | null | undefined;
  if (!o || typeof o !== "object" || typeof o.line !== "string" || o.line.trim() === "") return null;
  const premiumLimit = typeof o.premiumLimit === "number" && Number.isInteger(o.premiumLimit) && o.premiumLimit > 0 ? o.premiumLimit : null;
  const pass = o.offer === true ? (parseVPassOffer({ limit: premiumLimit ?? 1, pass: o.pass })?.pass ?? null) : null;
  return { line: o.line, pass, premiumLimit };
}

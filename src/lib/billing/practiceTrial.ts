/**
 * The 7-day Practice Pass trial (migration 0273, owner 2026-11-18). Pure: the
 * copy and the parsing of what claim_reveal / activate_practice_trial return.
 *
 * The server decides everything. On a student's 3rd day at the daily answer
 * limit (paywall_settings.practice_trial_after_days) a refused claim carries
 * `trialOffer`, on at most TRIAL_OFFER_DAYS days at the limit, never to a
 * student who has ever held a pass. Nothing is granted until the student taps
 * Activate, and the 7 days count from that tap. After the trial, a refused
 * claim carries `trialEnded` for two weeks, which adds one line to the wall.
 *
 * Why it exists: 12 of 20 pass sales came within a day of a student's first
 * day at the limit, so the trial waits for the 3rd day, where only 4 of 46
 * buyers in six weeks had paid (growth experiment `practice-trial`).
 */

/** Mirrors `interval '7 days'` in the migration (pinned by tests/practice-trial.test.ts). */
export const TRIAL_DAYS = 7;
/** Days at the limit the offer shows on, at most (mirrors `v_offers >= 3`). */
export const TRIAL_OFFER_DAYS = 3;

/** The owner's words (2026-11-18). */
export const TRIAL_OFFER_TITLE = "You are doing well. Here is your 7-day practice pass.";
export const TRIAL_OFFER_BODY =
  "No limits on answers, Fix your mistakes, saves, mocks or chapter tests for 7 days from when you activate. Nothing to pay.";

export type TrialOffer = { days: number };
export type TrialEnded = { endedAt: string; answered: number };

const IST = "Asia/Kolkata";

/** "Wed, 25 Nov", in India time. */
export function trialEndLabel(iso: string): string {
  const d = new Date(iso);
  const weekday = d.toLocaleDateString("en-IN", { weekday: "short", timeZone: IST });
  const date = d.toLocaleDateString("en-IN", { day: "numeric", month: "short", timeZone: IST });
  return `${weekday}, ${date}`;
}

/** "25 Nov", in India time. */
function shortDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", timeZone: IST });
}

/** After Activate, in place of the offer. */
export function trialActiveLine(expiresAt: string): string {
  return `Practice pass active until ${trialEndLabel(expiresAt)}.`;
}

/** The one extra line on the wall once the trial is over. */
export function trialEndedLine(ended: TrialEnded): string {
  const head = `Your ${TRIAL_DAYS}-day practice pass ended on ${shortDate(ended.endedAt)}.`;
  if (ended.answered <= 0) return head;
  const noun = ended.answered === 1 ? "question" : "questions";
  return `${head} In it you answered ${ended.answered} ${noun}.`;
}

export function parseTrialOffer(v: unknown): TrialOffer | null {
  if (!v || typeof v !== "object") return null;
  const days = (v as Record<string, unknown>).days;
  if (typeof days !== "number" || !Number.isInteger(days) || days <= 0) return null;
  return { days };
}

export function parseTrialEnded(v: unknown): TrialEnded | null {
  if (!v || typeof v !== "object") return null;
  const o = v as Record<string, unknown>;
  if (typeof o.endedAt !== "string" || Number.isNaN(Date.parse(o.endedAt))) return null;
  if (typeof o.answered !== "number" || !Number.isInteger(o.answered) || o.answered < 0) return null;
  return { endedAt: o.endedAt, answered: o.answered };
}

export type ActivateResult = { ok: true; expiresAt: string } | { ok: false };

/** What activate_practice_trial returned; anything unreadable is a failure. */
export function parseActivate(v: unknown): ActivateResult {
  if (!v || typeof v !== "object") return { ok: false };
  const o = v as Record<string, unknown>;
  if (o.ok === true && typeof o.expiresAt === "string" && !Number.isNaN(Date.parse(o.expiresAt))) {
    return { ok: true, expiresAt: o.expiresAt };
  }
  return { ok: false };
}

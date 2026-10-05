/**
 * Who sees the projected score on /performance (2026-10-05, owner). Pure; the
 * page decides with it and, when the answer is not "open" or "trial", never
 * sends the projection to the browser at all.
 *
 *   open         the trial setting is off, or the student holds a pass
 *   not_started  a "Reveal" button; tapping it starts the free days, once ever
 *                (premium_trials, migration 0134)
 *   trial        revealed, with whole days left (counted up, so the last
 *                hours still read "1 day")
 *   expired      the teaser with the pass button
 *
 * Measured from the FIRST start, so a change to the setting moves the end of a
 * running trial with it rather than starting a new one.
 */

export type ProjectionAccess =
  | { kind: "open" }
  | { kind: "not_started"; days: number }
  | { kind: "trial"; endsAt: string; daysLeft: number }
  | { kind: "expired" };

const DAY_MS = 86_400_000;

export function projectionAccess(input: {
  /** null = the trial setting is off: the projected score is free. */
  trialDays: number | null;
  hasPass: boolean;
  /** When the student revealed it; null = not yet. */
  startedAt: string | null;
  now: Date;
}): ProjectionAccess {
  const { trialDays, hasPass, startedAt, now } = input;
  if (trialDays === null || hasPass) return { kind: "open" };
  if (startedAt === null) return trialDays > 0 ? { kind: "not_started", days: trialDays } : { kind: "expired" };
  const ends = Date.parse(startedAt) + trialDays * DAY_MS;
  const left = ends - now.getTime();
  if (left <= 0) return { kind: "expired" };
  return { kind: "trial", endsAt: new Date(ends).toISOString(), daysLeft: Math.ceil(left / DAY_MS) };
}

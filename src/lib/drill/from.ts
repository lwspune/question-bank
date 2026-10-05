/**
 * Where a /drill visit came from (2026-10-05).
 *
 * Every link into /drill carries `?from=<source>` and the page records it on
 * the view and on `drill_started`. Before this, 23 students opened the drill
 * and nothing said whether they came from the avatar menu, the Today card, the
 * result page, an email or the bank, so no change to any of those could be
 * measured.
 *
 * A FIXED LIST, because the value lands in user_activity metadata and the PMF
 * readout groups on it: an unlisted value becomes "other", a missing one
 * "direct", so a hand-typed URL cannot fragment the field.
 *
 * Pure. Spec: tests/drill-from.test.ts.
 */

export const DRILL_FROM = [
  "bank", // the "5 wrong today" line on a bank card
  "menu", // the avatar menu's "Fix your mistakes"
  "today", // the /me Today card
  "result", // the mock result page's headline button
  "findings", // the result page's findings card
  "map", // /me/map
  "start", // /start and the welcome screen (lib/education/howItWorks)
  "email", // the due-nudge email
  "push", // the due-nudge notification
  "again", // "Another five" at the end of a drill
] as const;

export type DrillFrom = (typeof DRILL_FROM)[number];

const FROM_SET: ReadonlySet<string> = new Set(DRILL_FROM);

export function parseDrillFrom(raw: unknown): DrillFrom | "other" | "direct" {
  if (raw === undefined || raw === null || raw === "") return "direct";
  if (typeof raw !== "string") return "other";
  return FROM_SET.has(raw) ? (raw as DrillFrom) : "other";
}

/** A tagged link into the drill, optionally scoped to one mock attempt. */
export function drillHref(from: DrillFrom, attemptId?: string): string {
  return attemptId ? `/drill?attempt=${attemptId}&from=${from}` : `/drill?from=${from}`;
}

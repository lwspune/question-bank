/**
 * Pure helpers for a mock's start page and runner (2026-11-12): how long the
 * student's open attempt has left, and how to say a time left. Spec:
 * tests/mock-start-page.test.ts.
 */

type AttemptClock = {
  status: "in_progress" | "submitted" | "expired";
  startedAt: string;
  /** The paper's length; null when unknown. */
  durationSecs: number | null;
};

/**
 * Seconds left on the student's open attempt, or null when there is none.
 * Null too when its time has already run out (the hourly sweep grades it), so
 * the page never offers "Resume" into a test that submits itself on arrival,
 * and when the paper's length is unknown.
 */
export function openAttemptSecsLeft(attempts: readonly AttemptClock[], nowMs: number = Date.now()): number | null {
  const open = attempts.find((a) => a.status === "in_progress");
  if (!open || open.durationSecs === null) return null;
  const left = Math.floor((Date.parse(open.startedAt) + open.durationSecs * 1000 - nowMs) / 1000);
  return left > 0 ? left : null;
}

/** "1 h 42 m", "9 m" or "42 s". */
export function formatTimeLeft(secs: number): string {
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  if (h > 0) return `${h} h ${m} m`;
  return m > 0 ? `${m} m` : `${secs} s`;
}

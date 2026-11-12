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

/** "45 s", "2 m 40 s", "1 h 5 m". */
function formatDuration(secs: number): string {
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const s = secs % 60;
  if (h > 0) return `${h} h ${m} m`;
  if (m > 0) return s > 0 ? `${m} m ${s} s` : `${m} m`;
  return `${s} s`;
}

/**
 * The review card's time line (2026-11-12): what the student spent on a
 * question beside the paper's own pace (its minutes over its questions), e.g.
 * "2 m 40 s here · paper pace 1 m 15 s". Null for a question never opened.
 */
export function questionTimeLine(spentSecs: number, durationSecs: number, totalQuestions: number): string | null {
  if (spentSecs <= 0) return null;
  const here = `${formatDuration(Math.round(spentSecs))} here`;
  if (durationSecs <= 0 || totalQuestions <= 0) return here;
  return `${here} · paper pace ${formatDuration(Math.round(durationSecs / totalQuestions))}`;
}

/**
 * Which abandoned mock attempts are due to be graded, and what timestamp each
 * one's submit should carry.
 *
 * WHY THIS EXISTS. `submitAttempt(id, "expired")` has always been able to close
 * out an attempt whose timer ran out, but the ONLY caller that ever passed
 * "expired" was the client runner — with the tab open. Close the laptop and
 * nothing server-side ever noticed, so the attempt sat in `in_progress`
 * forever: no score, no result page, no findings card, and not one of its
 * mistakes reaching `answer_wrong`. By 2026-09-19 that had stranded 118
 * attempts and 1,285 answered questions across 69 students, the oldest since
 * 2026-07-10 — and it was still accruing, the newest being the day before.
 *
 * THE STAMP IS THE LOAD-BEARING PART, not the selection. See `at` below.
 *
 * Pure: no DB, no clock of its own (`now` is injected).
 * Spec: tests/mock-sweep.test.ts.
 */

/**
 * How long after the timer runs out before we grade on the student's behalf.
 *
 * `submitAttempt` guards on `status='in_progress'`, so a race with the
 * student's own tab cannot double-submit and this grace is belt-and-braces
 * rather than load-bearing. Half an hour is simply well clear of any client
 * still posting its final answers, while still resolving a stranded attempt
 * the same day.
 */
export const SWEEP_GRACE_MS = 30 * 60_000;

/** An `in_progress` attempt, as the loader reads it. */
export type SweepCandidate = {
  attemptId: string;
  userId: string;
  startedAt: string;
  /** Nullable + unvalidated on purpose: this is raw DB data, not a promise. */
  expiresAt: string | null;
};

export type SweepTarget = {
  attemptId: string;
  userId: string;
  /**
   * The timestamp the submit gets stamped with — when the timer ACTUALLY ran
   * out, never when the sweep happened to run.
   *
   * This is the difference between a truthful backfill and a harmful one. The
   * report email selects candidates on `submitted_at >= SINCE`, so stamping
   * `now` would have made every one of these look freshly sat and mailed 82
   * students about a mock they walked away from in July. The drill's ladder
   * likewise sorts on the activity row's `created_at`, which `buildActivityRow`
   * writes explicitly — so backdating reaches it too, and a July mistake sorts
   * as a July mistake.
   */
  at: string;
};

export type SweepSkip = {
  attemptId: string;
  /** `no-expiry`: nothing trustworthy to stamp. `within-grace`: not yet ours. */
  reason: "no-expiry" | "within-grace";
};

export type SweepPlan = { sweep: SweepTarget[]; skipped: SweepSkip[] };

function parsed(iso: string | null): number | null {
  if (!iso) return null;
  const t = Date.parse(iso);
  return Number.isNaN(t) ? null : t;
}

/**
 * Split the `in_progress` pool into what to grade and what to leave.
 *
 * Deliberately total: every candidate lands in exactly one of the two lists, so
 * a row can never be dropped in silence. Oldest first, which means an
 * interrupted run has helped the longest-stranded students rather than an
 * arbitrary slice.
 */
export function planSweep(
  candidates: readonly SweepCandidate[],
  now: Date,
  graceMs: number = SWEEP_GRACE_MS
): SweepPlan {
  const cutoff = now.getTime() - graceMs;
  const sweep: SweepTarget[] = [];
  const skipped: SweepSkip[] = [];

  for (const c of candidates) {
    const expires = parsed(c.expiresAt);
    if (expires === null) {
      // A stamp we invented would be a fabricated fact about when a student
      // stopped working. Report it and leave the row for a human.
      skipped.push({ attemptId: c.attemptId, reason: "no-expiry" });
      continue;
    }
    if (expires > cutoff) {
      skipped.push({ attemptId: c.attemptId, reason: "within-grace" });
      continue;
    }
    // Clamp to the start: a submit dated before its own attempt began is a fact
    // that cannot be true, and it would sort wrong everywhere, forever.
    const started = parsed(c.startedAt);
    const at = started !== null && started > expires ? started : expires;
    sweep.push({ attemptId: c.attemptId, userId: c.userId, at: new Date(at).toISOString() });
  }

  // `at` is an ISO-8601 UTC string, so lexicographic order IS chronological
  // order — no need to carry a parallel numeric key just to sort.
  sweep.sort((a, b) => (a.at < b.at ? -1 : a.at > b.at ? 1 : a.attemptId < b.attemptId ? -1 : 1));
  return { sweep, skipped };
}

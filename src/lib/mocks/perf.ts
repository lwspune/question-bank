/**
 * Pure aggregation for mock performance stats. No I/O — unit-tested in
 * tests/mock-perf.test.ts. The admin dashboard reads (adminStats.ts) fetch the
 * rows; this rolls them into a per-mock summary. Ungraded (in-progress) attempts
 * carry a null score and are excluded from the counts + averages.
 */

import type { UserAttempt } from "./query";

export type AttemptStat = { userId: string; score: number | null };

export type MockSummary = {
  count: number;
  students: number;
  avgScore: number;
  topScore: number;
};

export function summarizeAttempts(attempts: AttemptStat[]): MockSummary {
  const graded = attempts.filter((a) => typeof a.score === "number");
  if (graded.length === 0) return { count: 0, students: 0, avgScore: 0, topScore: 0 };
  const students = new Set(graded.map((a) => a.userId)).size;
  const total = graded.reduce((s, a) => s + (a.score as number), 0);
  const topScore = Math.max(...graded.map((a) => a.score as number));
  const avgScore = Math.round((total / graded.length) * 100) / 100 || 0;
  return { count: graded.length, students, avgScore, topScore };
}

export type UserMockSummary = {
  /** Graded attempts (submitted/timed-out with a score). */
  completed: number;
  /** Attempts still open — resumable. */
  inProgress: number;
  /** Distinct mocks touched (across retakes). */
  distinctMocks: number;
  /** Best / average percent over graded attempts; null if none graded yet. */
  bestPct: number | null;
  avgPct: number | null;
  /** Newest resumable attempt, for the "continue" hero; null if none open. */
  resumeAttempt: UserAttempt | null;
};

/** Percent score for one graded attempt, guarding a zero/absent maxScore. */
function attemptPct(a: UserAttempt): number {
  if (a.score == null || a.maxScore == null || a.maxScore <= 0) return 0;
  return Math.round((a.score / a.maxScore) * 100);
}

/**
 * Roll a single student's own attempts (newest-first, as getUserAttempts
 * returns them) into a personal dashboard summary + a resume target. Pure —
 * unit-tested in tests/mock-perf.test.ts.
 */
export function summarizeUserMocks(attempts: UserAttempt[]): UserMockSummary {
  const graded = attempts.filter((a) => a.score != null && a.maxScore != null);
  const pcts = graded.map(attemptPct);
  const distinctMocks = new Set(attempts.map((a) => a.mockSlug).filter(Boolean)).size;
  return {
    completed: graded.length,
    inProgress: attempts.filter((a) => a.status === "in_progress").length,
    distinctMocks,
    bestPct: pcts.length ? Math.max(...pcts) : null,
    avgPct: pcts.length ? Math.round(pcts.reduce((s, p) => s + p, 0) / pcts.length) : null,
    resumeAttempt: attempts.find((a) => a.status === "in_progress") ?? null,
  };
}

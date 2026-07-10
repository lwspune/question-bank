/**
 * Pure aggregation for mock performance stats. No I/O — unit-tested in
 * tests/mock-perf.test.ts. The admin dashboard reads (adminStats.ts) fetch the
 * rows; this rolls them into a per-mock summary. Ungraded (in-progress) attempts
 * carry a null score and are excluded from the counts + averages.
 */

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

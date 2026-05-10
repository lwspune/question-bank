export type AttemptStats = {
  count: number;
  correctPct: number;
};

function clampPct(pct: number): number {
  if (pct < 0) return 0;
  if (pct > 100) return 100;
  return pct;
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

/**
 * Combine an existing aggregate with a new observation. Sums counts,
 * computes the weighted-average correct percentage. Treats null + count=0
 * cases sensibly so the orchestrator doesn't have to guard against them.
 */
export function mergeAttemptStats(
  existing: AttemptStats | null,
  incoming: AttemptStats | null
): AttemptStats | null {
  const e = existing && existing.count > 0 ? existing : null;
  const i = incoming && incoming.count > 0 ? incoming : null;

  if (!e && !i) return existing ?? incoming;
  if (!e) return { count: i!.count, correctPct: round2(clampPct(i!.correctPct)) };
  if (!i) return { count: e.count, correctPct: round2(clampPct(e.correctPct)) };

  const totalCount = e.count + i.count;
  const totalCorrect = e.correctPct * e.count + i.correctPct * i.count;
  const mergedPct = clampPct(totalCorrect / totalCount);
  return { count: totalCount, correctPct: round2(mergedPct) };
}

/**
 * The pinned daily question of a room (owner, 2026-11-25: automatic, the team
 * can swap it). Candidates come in preference order (the exam's Most Asked
 * "asked again" questions first, then its other PUBLIC PYQ MCQs); a question
 * never posted in this room wins, else the one posted longest ago. Pure.
 * Spec: tests/rooms-core.test.ts.
 */
export function pickDailyQuestion(
  candidates: readonly string[],
  /** question id -> when it was last posted in this room (ISO date or timestamp). */
  lastPosted: ReadonlyMap<string, string>
): string | null {
  if (candidates.length === 0) return null;
  const fresh = candidates.find((id) => !lastPosted.has(id));
  if (fresh) return fresh;
  let best = candidates[0];
  for (const id of candidates) {
    if ((lastPosted.get(id) ?? "") < (lastPosted.get(best) ?? "")) best = id;
  }
  return best;
}

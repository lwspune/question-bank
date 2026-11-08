/**
 * "Not taught yet" (MENTOR_SPEC.md §4, D6). A tap moves a chapter behind the
 * next one in its subject. It is "later", never "skip": the chapter comes back
 * after 14 days, or at once when the student does any work in it after the
 * tap. Both are read at view time, so nothing has to expire by job.
 *
 * Pure. Spec: tests/path-core.test.ts.
 */
export const DEFER_DAYS = 14;
const DAY_MS = 86_400_000;

export type Deferral = { chapterId: string; at: string };

/** Chapter ids deferred now. `lastWorkAt`: the latest work in each chapter. */
export function activeDeferrals(
  deferrals: readonly Deferral[],
  lastWorkAt: ReadonlyMap<string, string>,
  now: Date
): Set<string> {
  const latest = new Map<string, string>();
  for (const d of deferrals) {
    const prev = latest.get(d.chapterId);
    if (!prev || d.at > prev) latest.set(d.chapterId, d.at);
  }
  const out = new Set<string>();
  for (const [chapterId, at] of latest) {
    if (now.getTime() - Date.parse(at) >= DEFER_DAYS * DAY_MS) continue;
    const work = lastWorkAt.get(chapterId);
    if (work && work > at) continue;
    out.add(chapterId);
  }
  return out;
}

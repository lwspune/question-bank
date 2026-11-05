/**
 * Pre-build only the pages people read, on the production build (TECH_DEBT_SPEC.md 2.3,
 * owner decision D2 option c, 2026-11-05). The page lists are in prerenderHotPaths.ts.
 *
 * Active on a Vercel build only (`VERCEL` is set by deploy.yml), so a local build is unchanged.
 * `PRERENDER_ALL=1` switches it off, the way back to building every page. A page left out still
 * works: it renders on its first visit and is then cached like a built page (`revalidate`).
 */
export function prerenderBudgetActive(env: Record<string, string | undefined> = process.env): boolean {
  return Boolean(env.VERCEL) && env.PRERENDER_ALL !== "1";
}

const sets = new WeakMap<readonly string[], ReadonlySet<string>>();
function asSet(list: readonly string[]): ReadonlySet<string> {
  let s = sets.get(list);
  if (!s) sets.set(list, (s = new Set(list)));
  return s;
}

/** The items whose path is on the hot list, or every item when the budget is off. */
export function hotOnly<T>(
  items: readonly T[],
  pathOf: (item: T) => string,
  hot: readonly string[],
  active: boolean = prerenderBudgetActive()
): T[] {
  if (!active) return [...items];
  const keep = asSet(hot);
  return items.filter((i) => keep.has(pathOf(i)));
}

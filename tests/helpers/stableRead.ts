/**
 * Compare a measured count with a ground truth only when the rows stood still.
 *
 * Tests share one test database, and other files add and delete fixture rows
 * while a test runs. A test that counts the truth, then calls the function
 * under test, can see a row arrive in between and blame the function (177 vs
 * 180 in dashboard-stats, 13 vs 14 in filter-facets, 2026-11-27). Reading the
 * truth before AND after the measurement, and using only a window where the two
 * agree, removes that without hiding a real mismatch: in a still window the
 * function either matches the truth or is wrong.
 */
export type StillRead<T, M> = { truth: T; measured: M; still: boolean };

const same = (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b);

export async function readWhileStill<T, M>(
  truth: () => Promise<T>,
  measured: () => Promise<M>,
  tries = 5,
): Promise<StillRead<T, M>> {
  let last: StillRead<T, M> | null = null;
  for (let i = 0; i < tries; i++) {
    const before = await truth();
    const m = await measured();
    const after = await truth();
    last = { truth: after, measured: m, still: same(before, after) };
    if (last.still) return last;
  }
  return last!;
}

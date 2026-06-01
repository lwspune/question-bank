/**
 * Indices of the maximum value in `values`, for highlighting the standout
 * cell(s) in a scannable table column (e.g. the hardest year, the heaviest
 * concept). Tied maxima all share the highlight. Returns an empty set when
 * there's nothing to single out — fewer than two values, or every value
 * identical (no variation → no outlier worth flagging).
 *
 * Pure; unit-tested in tests/peak-values.test.ts.
 */
export function peakIndices(values: number[]): Set<number> {
  if (values.length < 2) return new Set();
  const max = Math.max(...values);
  const min = Math.min(...values);
  if (max === min) return new Set();
  const out = new Set<number>();
  values.forEach((v, i) => {
    if (v === max) out.add(i);
  });
  return out;
}

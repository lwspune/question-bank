/**
 * Returns the N most recent years from the input list.
 * Sorts descending + dedupes before selecting, so callers don't need to
 * pre-process. Used by the "Last 3 years" / "Last 5 years" PYQ presets.
 */
export function selectRecentYears(years: number[], n: number): number[] {
  if (n <= 0) return [];
  const unique = Array.from(new Set(years));
  unique.sort((a, b) => b - a);
  return unique.slice(0, n);
}

/**
 * The PYQ year span of the whole PUBLIC bank — "past papers from 2013 to
 * 2026" on /about, and the list behind /browse's year filter. Read through
 * `get_pyq_years` (migration 0067, a loose index scan, anon-safe) and cached
 * for a day: it moves only on an ingest.
 * Null when the lookup fails, so the page omits the span rather than
 * printing a guess.
 */
import { unstable_cache } from "next/cache";
import { createSupabaseAnonClient } from "@/lib/supabase/server";

export type BankYearRange = { min: number; max: number };

/** Pure: the span of a list of years, or null when there is none. */
export function yearRangeOf(years: readonly (number | null | undefined)[]): BankYearRange | null {
  let min: number | null = null;
  let max: number | null = null;
  for (const y of years) {
    if (typeof y !== "number" || !Number.isFinite(y)) continue;
    min = min === null ? y : Math.min(min, y);
    max = max === null ? y : Math.max(max, y);
  }
  return min === null || max === null ? null : { min, max };
}

/**
 * Every PYQ year in the PUBLIC bank, newest first, remembered for a day and
 * shared by /about and /browse's year filter. Read SIGNED OUT, so nothing
 * private can be remembered; /browse still reads live for staff (see
 * yearsSource in lib/questions/browseSharedReads). A failed read THROWS so it
 * is never remembered: the old version cached `null` for a whole day.
 */
export const getCachedPyqYears = unstable_cache(
  async (): Promise<number[]> => {
    const { data, error } = await createSupabaseAnonClient().rpc("get_pyq_years");
    if (error) throw new Error(`get_pyq_years: ${error.message}`);
    return (data ?? []) as number[];
  },
  ["pyq-years-v1"],
  { revalidate: 86400 }
);

export async function getCachedBankYearRange(): Promise<BankYearRange | null> {
  try {
    return yearRangeOf(await getCachedPyqYears());
  } catch (e) {
    console.warn(`[bankYears] ${(e as Error).message}`);
    return null;
  }
}

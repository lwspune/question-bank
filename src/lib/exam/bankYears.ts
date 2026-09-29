/**
 * The PYQ year span of the whole PUBLIC bank — "past papers from 2013 to
 * 2026" on /about. Read through `get_pyq_years` (migration 0067, a loose
 * index scan, anon-safe) and cached for a day: it moves only on an ingest.
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

export const getCachedBankYearRange = unstable_cache(
  async (): Promise<BankYearRange | null> => {
    const { data, error } = await createSupabaseAnonClient().rpc("get_pyq_years");
    if (error) {
      console.warn(`[bankYears] get_pyq_years failed: ${error.message}`);
      return null;
    }
    return yearRangeOf((data ?? []) as number[]);
  },
  ["bank-year-range"],
  { revalidate: 86400 }
);

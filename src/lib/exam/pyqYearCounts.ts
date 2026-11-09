/**
 * PUBLIC past-year questions per exam per year (public_pyq_year_counts, 0248),
 * for the "questions by year" bars on the homepage exam carousel cards.
 *
 * One grouped read for every exam, cached for a day: years only move on an
 * ingest. Measured as anon on production: an index-only scan, 50 ms.
 */
import { unstable_cache } from "next/cache";
import { createSupabaseAnonClient } from "@/lib/supabase/server";
import type { YearCountRow } from "@/lib/exam/examShowcase";

const getCachedPyqYearRows = unstable_cache(
  async (): Promise<YearCountRow[]> => {
    const { data, error } = await createSupabaseAnonClient().rpc("public_pyq_year_counts");
    if (error) throw new Error(`public_pyq_year_counts: ${error.message}`);
    return (data ?? []) as YearCountRow[];
  },
  ["pyq-year-counts-v1"],
  { revalidate: 86400 }
);

/**
 * The rows, or none when the read fails. The throw happens INSIDE the cache, so
 * a failure is not cached for a day; the cards just show no bars until the
 * next request succeeds.
 */
export async function getPyqYearRows(): Promise<YearCountRow[]> {
  try {
    return await getCachedPyqYearRows();
  } catch (e) {
    console.warn(`[pyqYearCounts] ${(e as Error).message}`);
    return [];
  }
}

import type { SupabaseClient } from "@supabase/supabase-js";
import {
  resolveTaxonomy,
  type ResolvedTaxonomy,
} from "@/lib/guide/resolveTaxonomy";

/**
 * Process-level memoisation for taxonomy lookups used by /notes pages.
 *
 * Taxonomy IDs are seed-stable — they change only when an admin renames or
 * merges a chapter/subtopic. Re-resolving on every render burns 3 sequential
 * Supabase round-trips (~150–250 ms) for data we can cache safely.
 *
 * Cache lives in the Node process — survives between requests in dev,
 * eliminated entirely in SSG (each path renders once at build time anyway).
 * Restart `npm run dev` after taxonomy changes to bust.
 *
 * Keyed by (examName, subjectName) so multiple notes for different subjects
 * share the cache when they all sit under the same subject.
 */
const cache = new Map<string, ResolvedTaxonomy>();

export async function getNotesTaxonomy(
  client: SupabaseClient,
  examName: string,
  subjectName: string
): Promise<ResolvedTaxonomy> {
  const key = `${examName}|${subjectName}`;
  const hit = cache.get(key);
  if (hit) return hit;

  const fresh = await resolveTaxonomy(client, examName, subjectName);
  cache.set(key, fresh);
  return fresh;
}

/** Test hook — clears the cache so test suites stay deterministic. */
export function _resetNotesTaxonomyCache() {
  cache.clear();
}

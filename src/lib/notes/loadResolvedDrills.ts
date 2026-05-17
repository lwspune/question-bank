import type { SupabaseClient } from "@supabase/supabase-js";
import { loadConceptDrills } from "@/lib/tags/conceptTags";

/**
 * Minimum shape from a ConceptUnit that `loadResolvedDrills` needs.
 * Defined locally so callers (notes data + the resolver) don't form a tight
 * coupling on the full SubtopicNote type.
 */
export type ConceptForResolver = {
  slug: string;
  pyqExampleId?: string;
};

/**
 * Phase 2 reader for /notes per-concept drill lists.
 *
 * Loads every (concept_slug → questionIds[]) for the subtopic from the DB via
 * `loadConceptDrills`, then per concept:
 *   - filters out the editorial `pyqExampleId` (it's already shown above the
 *     drill link in the read-mode card, so duplicating it in the drill is noise)
 *   - sorts the remaining ids ascending for stability across taggings
 *
 * Concepts with zero remaining tagged questions are omitted from the Map —
 * the caller hides the "Drill N more →" link in that case.
 *
 * RLS scopes: an anon client sees only tags on PUBLIC questions; an admin
 * client additionally sees own-org PRIVATE.
 */
export async function loadResolvedDrills(
  client: SupabaseClient,
  subtopicSlug: string,
  concepts: ConceptForResolver[]
): Promise<Map<string, string[]>> {
  const raw = await loadConceptDrills(client, subtopicSlug);

  const resolved = new Map<string, string[]>();
  for (const concept of concepts) {
    const ids = raw.get(concept.slug);
    if (!ids || ids.length === 0) continue;
    const filtered = ids
      .filter((id) => id !== concept.pyqExampleId)
      .slice()
      .sort();
    if (filtered.length === 0) continue;
    resolved.set(concept.slug, filtered);
  }
  return resolved;
}

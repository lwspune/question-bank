import type { SupabaseClient } from "@supabase/supabase-js";

export type ConceptTagRef = {
  subtopicSlug: string;
  conceptSlug: string;
};

export type ResourceTags = {
  /** Principle slugs this question is tagged with (any number; usually 0–3). */
  principleSlugs: string[];
  /** Concept tags (subtopic + concept slug pairs). */
  conceptTags: ConceptTagRef[];
};

/**
 * Batched per-question tag fetch for the /browse page. One round-trip per
 * tag table (parallel), then merged client-side into a Map keyed by
 * questionId. Questions with NO tags in either table are omitted from
 * the map (callers should treat `map.get(qid)` undefined as "no tags").
 *
 * RLS-respecting — anon sees only tags on PUBLIC questions.
 */
export async function getResourceTagsForQuestions(
  client: SupabaseClient,
  questionIds: string[]
): Promise<Map<string, ResourceTags>> {
  if (questionIds.length === 0) return new Map();

  // Dedupe in case the same id appears multiple times in the page.
  const ids = Array.from(new Set(questionIds));

  const [principleRes, conceptRes] = await Promise.all([
    client
      .from("question_principle_tags")
      .select("question_id, principle_slug")
      .in("question_id", ids),
    client
      .from("question_concept_tags")
      .select("question_id, subtopic_slug, concept_slug")
      .in("question_id", ids),
  ]);

  if (principleRes.error) {
    throw new Error(
      `getResourceTagsForQuestions principles: ${principleRes.error.message}`
    );
  }
  if (conceptRes.error) {
    throw new Error(
      `getResourceTagsForQuestions concepts: ${conceptRes.error.message}`
    );
  }

  const map = new Map<string, ResourceTags>();

  function ensure(qid: string): ResourceTags {
    let entry = map.get(qid);
    if (!entry) {
      entry = { principleSlugs: [], conceptTags: [] };
      map.set(qid, entry);
    }
    return entry;
  }

  type PRow = { question_id: string; principle_slug: string };
  type CRow = {
    question_id: string;
    subtopic_slug: string;
    concept_slug: string;
  };

  // Defensive dedup on principle slugs in case the DB ever yields the same
  // (question_id, principle_slug) twice (shouldn't, given the composite PK,
  // but the per-question filter is cheap).
  const seenPrinciple = new Set<string>();
  for (const row of (principleRes.data ?? []) as PRow[]) {
    const dedupKey = `${row.question_id}::${row.principle_slug}`;
    if (seenPrinciple.has(dedupKey)) continue;
    seenPrinciple.add(dedupKey);
    ensure(row.question_id).principleSlugs.push(row.principle_slug);
  }

  const seenConcept = new Set<string>();
  for (const row of (conceptRes.data ?? []) as CRow[]) {
    const dedupKey = `${row.question_id}::${row.subtopic_slug}::${row.concept_slug}`;
    if (seenConcept.has(dedupKey)) continue;
    seenConcept.add(dedupKey);
    ensure(row.question_id).conceptTags.push({
      subtopicSlug: row.subtopic_slug,
      conceptSlug: row.concept_slug,
    });
  }

  return map;
}

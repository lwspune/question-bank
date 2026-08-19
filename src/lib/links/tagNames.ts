/**
 * Slug → display-name lookups for question_principle_tags and
 * question_concept_tags. Used by the /browse QuestionCard backlink row to
 * render specific labels ("Lever: AM-GM", "Concept: Weighted Mean") rather
 * than generic chapter chips.
 *
 * Pure maps built at module load:
 *   - principles: only the TOP_PRINCIPLES (slugged, DB-tagged) entries. Long-tail
 *     DOMAINS principles have no slug + no detail page, so a backlink
 *     wouldn't have anywhere to land.
 *   - concepts: aggregated from every chapter registered in NOTES_CHAPTERS.
 *     Adding a new chapter to that registry automatically extends this map.
 */

import { TOP_PRINCIPLES } from "@/app/guide/nda-maths/_data/principles";
import { NOTES_CHAPTERS } from "@/lib/notes/chapters";

const PRINCIPLE_BY_SLUG: Map<string, string> = new Map();
for (const p of TOP_PRINCIPLES) {
  if (p.slug) PRINCIPLE_BY_SLUG.set(p.slug, p.name);
}

type ConceptKey = string;
const CONCEPT_BY_TAG: Map<ConceptKey, string> = new Map();
const conceptKey = (subtopicSlug: string, conceptSlug: string): ConceptKey =>
  `${subtopicSlug}::${conceptSlug}`;

for (const chapter of NOTES_CHAPTERS) {
  for (const [subtopicSlug, note] of Object.entries(chapter.notes)) {
    for (const concept of note.concepts) {
      CONCEPT_BY_TAG.set(conceptKey(subtopicSlug, concept.slug), concept.name);
    }
  }
}

/**
 * Display name for a principle slug, when it has a `/principles/[slug]`
 * detail page (i.e. it's a TOP_PRINCIPLES principle). Returns null otherwise.
 */
export function getPrincipleName(slug: string): string | null {
  if (!slug) return null;
  return PRINCIPLE_BY_SLUG.get(slug) ?? null;
}

/**
 * Display name for a concept tag's (subtopic, concept) pair. Returns null
 * if either side doesn't resolve under the shipped notes data.
 */
export function getConceptName(
  subtopicSlug: string,
  conceptSlug: string
): string | null {
  if (!subtopicSlug || !conceptSlug) return null;
  return CONCEPT_BY_TAG.get(conceptKey(subtopicSlug, conceptSlug)) ?? null;
}

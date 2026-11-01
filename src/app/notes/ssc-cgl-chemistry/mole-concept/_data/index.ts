import type { SubtopicNote } from "@/app/notes/_types";
import { SSC_CMO_MOLE_NOTE } from "./mole";

export { SSC_MOLE_CONCEPT_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-chemistry/mole-concept/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc-cmo-` here and `ssccmo-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape/mole-concept.ts). Order matches `subtopicOrder`.
 */
export const SSC_MOLE_CONCEPT_NOTES: Record<string, SubtopicNote> = {
  "ssc-cmo-mole": SSC_CMO_MOLE_NOTE,
};

export const SSC_MOLE_CONCEPT_SLUGS = Object.keys(SSC_MOLE_CONCEPT_NOTES);

import type { SubtopicNote } from "@/app/notes/_types";
import { SSC_BBI_BIOMOLECULES_NOTE } from "./biomolecules";

export { SSC_BIOCHEMISTRY_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-biology/biochemistry/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc-bbi-` here and `sscbbi-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape/biochemistry.ts). Order matches `subtopicOrder`.
 */
export const SSC_BIOCHEMISTRY_NOTES: Record<string, SubtopicNote> = {
  "ssc-bbi-biomolecules": SSC_BBI_BIOMOLECULES_NOTE,
};

export const SSC_BIOCHEMISTRY_SLUGS = Object.keys(SSC_BIOCHEMISTRY_NOTES);

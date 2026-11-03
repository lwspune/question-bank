import type { SubtopicNote } from "@/app/notes/_types";
import { SSC_CAT_PERIODIC_NOTE } from "./periodic";
import { SSC_CAT_ATOMS_NOTE } from "./atoms";

export { SSC_ATOMIC_STRUCTURE_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-chemistry/atomic-structure/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc-cat-` here and `ssccat-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape/atomic-structure.ts). Order matches `subtopicOrder`.
 */
export const SSC_ATOMIC_STRUCTURE_NOTES: Record<string, SubtopicNote> = {
  "ssc-cat-periodic": SSC_CAT_PERIODIC_NOTE,
  "ssc-cat-atoms": SSC_CAT_ATOMS_NOTE,
};

export const SSC_ATOMIC_STRUCTURE_SLUGS = Object.keys(SSC_ATOMIC_STRUCTURE_NOTES);

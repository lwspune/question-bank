import type { SubtopicNote } from "@/app/notes/_types";
import { SSC_CCB_BONDING_NOTE } from "./bonding";

export { SSC_CHEMICAL_BONDING_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-chemistry/chemical-bonding/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc-ccb-` here and `sscccb-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape/chemical-bonding.ts). Order matches `subtopicOrder`.
 */
export const SSC_CHEMICAL_BONDING_NOTES: Record<string, SubtopicNote> = {
  "ssc-ccb-bonding": SSC_CCB_BONDING_NOTE,
};

export const SSC_CHEMICAL_BONDING_SLUGS = Object.keys(SSC_CHEMICAL_BONDING_NOTES);

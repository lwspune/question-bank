import type { SubtopicNote } from "@/app/notes/_types";
import { SSC2_QU_PROPERTIES_NOTE } from "./properties";

export { SSC2_QUADRILATERALS_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-tier-2-maths/quadrilaterals/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc2-qu-` here and `ssc2qu-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape-t2/quadrilaterals.ts). Order matches `subtopicOrder`.
 */
export const SSC2_QUADRILATERALS_NOTES: Record<string, SubtopicNote> = {
  "ssc2-qu-properties": SSC2_QU_PROPERTIES_NOTE,
};

export const SSC2_QUADRILATERALS_SLUGS = Object.keys(SSC2_QUADRILATERALS_NOTES);

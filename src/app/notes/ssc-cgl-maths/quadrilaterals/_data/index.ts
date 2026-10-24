import type { SubtopicNote } from "@/app/notes/_types";
import { SSC_QU_PROPERTIES_NOTE } from "./properties";

export { SSC_QUADRILATERALS_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-maths/quadrilaterals/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc-qu-` here and `sscqu-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape/quadrilaterals.ts). Order matches `subtopicOrder`.
 */
export const SSC_QUADRILATERALS_NOTES: Record<string, SubtopicNote> = {
  "ssc-qu-properties": SSC_QU_PROPERTIES_NOTE,
};

export const SSC_QUADRILATERALS_SLUGS = Object.keys(SSC_QUADRILATERALS_NOTES);

import type { SubtopicNote } from "@/app/notes/_types";
import { SSC_RFC_TRIANGLES_NOTE } from "./triangles";
import { SSC_RFC_SQUARES_NOTE } from "./squares";

export { SSC_FIGURE_COUNTING_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-reasoning/figure-counting/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc-rfc-` here and `sscrfc-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape/figure-counting.ts). Order matches `subtopicOrder`.
 */
export const SSC_FIGURE_COUNTING_NOTES: Record<string, SubtopicNote> = {
  "ssc-rfc-triangles": SSC_RFC_TRIANGLES_NOTE,
  "ssc-rfc-squares": SSC_RFC_SQUARES_NOTE,
};

export const SSC_FIGURE_COUNTING_SLUGS = Object.keys(SSC_FIGURE_COUNTING_NOTES);

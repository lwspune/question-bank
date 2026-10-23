import type { SubtopicNote } from "@/app/notes/_types";
import { SSC_LA_SUMS_NOTE } from "./sums";
import { SSC_LA_REGULAR_NOTE } from "./regular";

export { SSC_LINES_ANGLES_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-maths/lines-angles/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc-la-` here and `sscla-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape/lines-angles.ts). Order matches `subtopicOrder`.
 */
export const SSC_LINES_ANGLES_NOTES: Record<string, SubtopicNote> = {
  "ssc-la-sums": SSC_LA_SUMS_NOTE,
  "ssc-la-regular": SSC_LA_REGULAR_NOTE,
};

export const SSC_LINES_ANGLES_SLUGS = Object.keys(SSC_LINES_ANGLES_NOTES);

import type { SubtopicNote } from "@/app/notes/_types";
import { SSC_RMN_GRIDS_NOTE } from "./grids";

export { SSC_MISSING_NUMBER_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-reasoning/missing-number/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc-rmn-` here and `sscrmn-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape/missing-number.ts). Order matches `subtopicOrder`.
 */
export const SSC_MISSING_NUMBER_NOTES: Record<string, SubtopicNote> = {
  "ssc-rmn-grids": SSC_RMN_GRIDS_NOTE,
};

export const SSC_MISSING_NUMBER_SLUGS = Object.keys(SSC_MISSING_NUMBER_NOTES);

import type { SubtopicNote } from "@/app/notes/_types";
import { SSC_RNV_COUNT_NOTE } from "./count";
import { SSC_RNV_TURNING_NOTE } from "./turning";
import { SSC_RNV_MOVING_NOTE } from "./moving";
import { SSC_RNV_ALTERNATING_NOTE } from "./alternating";
import { SSC_RNV_GRIDS_NOTE } from "./grids";

export { SSC_NON_VERBAL_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-reasoning/non-verbal/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc-rnv-` here and `sscrnv-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape/non-verbal.ts). Order matches `subtopicOrder`.
 */
export const SSC_NON_VERBAL_NOTES: Record<string, SubtopicNote> = {
  "ssc-rnv-count": SSC_RNV_COUNT_NOTE,
  "ssc-rnv-turning": SSC_RNV_TURNING_NOTE,
  "ssc-rnv-moving": SSC_RNV_MOVING_NOTE,
  "ssc-rnv-alternating": SSC_RNV_ALTERNATING_NOTE,
  "ssc-rnv-grids": SSC_RNV_GRIDS_NOTE,
};

export const SSC_NON_VERBAL_SLUGS = Object.keys(SSC_NON_VERBAL_NOTES);

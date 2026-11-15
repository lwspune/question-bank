import type { SubtopicNote } from "@/app/notes/_types";
import { SSC2_RNV_FIGURES_NOTE } from "./figures";

export { SSC2_NON_VERBAL_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-tier-2-reasoning/non-verbal/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc2-rnv-` here and `ssc2rnv-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape-t2/non-verbal.ts). Order matches `subtopicOrder`.
 */
export const SSC2_NON_VERBAL_NOTES: Record<string, SubtopicNote> = {
  "ssc2-rnv-figures": SSC2_RNV_FIGURES_NOTE,
};

export const SSC2_NON_VERBAL_SLUGS = Object.keys(SSC2_NON_VERBAL_NOTES);

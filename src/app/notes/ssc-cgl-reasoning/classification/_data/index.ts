import type { SubtopicNote } from "@/app/notes/_types";
import { SSC_RCL_NUMBERS_NOTE } from "./numbers";
import { SSC_RCL_PAIRS_NOTE } from "./pairs";
import { SSC_RCL_TRIADS_NOTE } from "./triads";
import { SSC_RCL_LETTERS_NOTE } from "./letters";
import { SSC_RCL_GAPS_NOTE } from "./gaps";
import { SSC_RCL_MIXED_NOTE } from "./mixed";
import { SSC_RCL_WORDS_NOTE } from "./words";

export { SSC_CLASSIFICATION_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-reasoning/classification/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc-rcl-` here and `sscrcl-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape/classification.ts). Order matches `subtopicOrder`.
 */
export const SSC_CLASSIFICATION_NOTES: Record<string, SubtopicNote> = {
  "ssc-rcl-numbers": SSC_RCL_NUMBERS_NOTE,
  "ssc-rcl-pairs": SSC_RCL_PAIRS_NOTE,
  "ssc-rcl-triads": SSC_RCL_TRIADS_NOTE,
  "ssc-rcl-letters": SSC_RCL_LETTERS_NOTE,
  "ssc-rcl-gaps": SSC_RCL_GAPS_NOTE,
  "ssc-rcl-mixed": SSC_RCL_MIXED_NOTE,
  "ssc-rcl-words": SSC_RCL_WORDS_NOTE,
};

export const SSC_CLASSIFICATION_SLUGS = Object.keys(SSC_CLASSIFICATION_NOTES);

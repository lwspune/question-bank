import type { SubtopicNote } from "@/app/notes/_types";
import { SSC2_RCL_ODD_NOTE } from "./odd";

export { SSC2_CLASSIFICATION_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-tier-2-reasoning/classification/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc2-rcl-` here and `ssc2rcl-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape-t2/classification.ts). Order matches `subtopicOrder`.
 */
export const SSC2_CLASSIFICATION_NOTES: Record<string, SubtopicNote> = {
  "ssc2-rcl-odd": SSC2_RCL_ODD_NOTE,
};

export const SSC2_CLASSIFICATION_SLUGS = Object.keys(SSC2_CLASSIFICATION_NOTES);

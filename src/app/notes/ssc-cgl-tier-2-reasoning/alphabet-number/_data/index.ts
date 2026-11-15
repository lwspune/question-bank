import type { SubtopicNote } from "@/app/notes/_types";
import { SSC2_RAL_WORDS_NOTE } from "./words";

export { SSC2_ALPHABET_NUMBER_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-tier-2-reasoning/alphabet-number/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc2-ral-` here and `ssc2ral-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape-t2/alphabet-number.ts). Order matches `subtopicOrder`.
 */
export const SSC2_ALPHABET_NUMBER_NOTES: Record<string, SubtopicNote> = {
  "ssc2-ral-words": SSC2_RAL_WORDS_NOTE,
};

export const SSC2_ALPHABET_NUMBER_SLUGS = Object.keys(SSC2_ALPHABET_NUMBER_NOTES);

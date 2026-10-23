import type { SubtopicNote } from "@/app/notes/_types";
import { SSC_RAL_POSITIONS_NOTE } from "./positions";
import { SSC_RAL_ARRANGING_NOTE } from "./arranging";
import { SSC_RAL_DICTIONARY_NOTE } from "./dictionary";
import { SSC_RAL_WORDS_NOTE } from "./words";
import { SSC_RAL_MATCHING_NOTE } from "./matching";

export { SSC_ALPHABET_NUMBER_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-reasoning/alphabet-number/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc-ral-` here and `sscral-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape/alphabet-number.ts). Order matches `subtopicOrder`.
 */
export const SSC_ALPHABET_NUMBER_NOTES: Record<string, SubtopicNote> = {
  "ssc-ral-positions": SSC_RAL_POSITIONS_NOTE,
  "ssc-ral-arranging": SSC_RAL_ARRANGING_NOTE,
  "ssc-ral-dictionary": SSC_RAL_DICTIONARY_NOTE,
  "ssc-ral-words": SSC_RAL_WORDS_NOTE,
  "ssc-ral-matching": SSC_RAL_MATCHING_NOTE,
};

export const SSC_ALPHABET_NUMBER_SLUGS = Object.keys(SSC_ALPHABET_NUMBER_NOTES);

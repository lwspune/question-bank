import type { SubtopicNote } from "@/app/notes/_types";
import { SSC_ESE_AGREEMENT_NOTE } from "./agreement";
import { SSC_ESE_VERBS_NOTE } from "./verbs";
import { SSC_ESE_MODIFIERS_NOTE } from "./modifiers";
import { SSC_ESE_STRUCTURE_NOTE } from "./structure";
import { SSC_ESE_WORDS_NOTE } from "./words";

export { SSC_SPOTTING_ERRORS_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-english/spotting-errors/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc-ese-` here and `sscese-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape/spotting-errors.ts). Order matches `subtopicOrder`.
 */
export const SSC_SPOTTING_ERRORS_NOTES: Record<string, SubtopicNote> = {
  "ssc-ese-agreement": SSC_ESE_AGREEMENT_NOTE,
  "ssc-ese-verbs": SSC_ESE_VERBS_NOTE,
  "ssc-ese-modifiers": SSC_ESE_MODIFIERS_NOTE,
  "ssc-ese-structure": SSC_ESE_STRUCTURE_NOTE,
  "ssc-ese-words": SSC_ESE_WORDS_NOTE,
};

export const SSC_SPOTTING_ERRORS_SLUGS = Object.keys(SSC_SPOTTING_ERRORS_NOTES);

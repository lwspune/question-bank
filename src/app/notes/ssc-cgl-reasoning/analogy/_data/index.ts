import type { SubtopicNote } from "@/app/notes/_types";
import { SSC_RAN_WORDS_NOTE } from "./words";
import { SSC_RAN_LETTERS_NOTE } from "./letters";
import { SSC_RAN_REARRANGEMENT_NOTE } from "./rearrangement";
import { SSC_RAN_NUMBERS_NOTE } from "./numbers";
import { SSC_RAN_SETS_NOTE } from "./sets";
import { SSC_RAN_POWERS_NOTE } from "./powers";

export { SSC_ANALOGY_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-reasoning/analogy/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc-ran-` here and `sscran-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape/analogy.ts). Order matches `subtopicOrder`.
 */
export const SSC_ANALOGY_NOTES: Record<string, SubtopicNote> = {
  "ssc-ran-words": SSC_RAN_WORDS_NOTE,
  "ssc-ran-letters": SSC_RAN_LETTERS_NOTE,
  "ssc-ran-rearrangement": SSC_RAN_REARRANGEMENT_NOTE,
  "ssc-ran-numbers": SSC_RAN_NUMBERS_NOTE,
  "ssc-ran-sets": SSC_RAN_SETS_NOTE,
  "ssc-ran-powers": SSC_RAN_POWERS_NOTE,
};

export const SSC_ANALOGY_SLUGS = Object.keys(SSC_ANALOGY_NOTES);

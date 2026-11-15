import type { SubtopicNote } from "@/app/notes/_types";
import { SSC2_ESE_VERBS_NOTE } from "./verbs";
import { SSC2_ESE_WORDS_NOTE } from "./words";

export { SSC2_SPOTTING_ERRORS_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-tier-2-english/spotting-errors/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc2-ese-` here and `ssc2ese-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape-t2/spotting-errors.ts). Order matches `subtopicOrder`.
 */
export const SSC2_SPOTTING_ERRORS_NOTES: Record<string, SubtopicNote> = {
  "ssc2-ese-verbs": SSC2_ESE_VERBS_NOTE,
  "ssc2-ese-words": SSC2_ESE_WORDS_NOTE,
};

export const SSC2_SPOTTING_ERRORS_SLUGS = Object.keys(SSC2_SPOTTING_ERRORS_NOTES);

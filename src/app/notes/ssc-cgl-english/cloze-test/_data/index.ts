import type { SubtopicNote } from "@/app/notes/_types";
import { SSC_ECZ_MEANING_NOTE } from "./meaning";
import { SSC_ECZ_WORDS_NOTE } from "./words";
import { SSC_ECZ_GRAMMAR_NOTE } from "./grammar";

export { SSC_CLOZE_TEST_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-english/cloze-test/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc-ecz-` here and `sscecz-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape/cloze-test.ts). Order matches `subtopicOrder`.
 */
export const SSC_CLOZE_TEST_NOTES: Record<string, SubtopicNote> = {
  "ssc-ecz-meaning": SSC_ECZ_MEANING_NOTE,
  "ssc-ecz-words": SSC_ECZ_WORDS_NOTE,
  "ssc-ecz-grammar": SSC_ECZ_GRAMMAR_NOTE,
};

export const SSC_CLOZE_TEST_SLUGS = Object.keys(SSC_CLOZE_TEST_NOTES);

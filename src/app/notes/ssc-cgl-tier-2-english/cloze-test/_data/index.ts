import type { SubtopicNote } from "@/app/notes/_types";
import { SSC2_ECZ_GRAMMAR_NOTE } from "./grammar";
import { SSC2_ECZ_MEANING_NOTE } from "./meaning";

export { SSC2_CLOZE_TEST_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-tier-2-english/cloze-test/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc2-ecz-` here and `ssc2ecz-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape-t2/cloze-test.ts). Order matches `subtopicOrder`.
 */
export const SSC2_CLOZE_TEST_NOTES: Record<string, SubtopicNote> = {
  "ssc2-ecz-grammar": SSC2_ECZ_GRAMMAR_NOTE,
  "ssc2-ecz-meaning": SSC2_ECZ_MEANING_NOTE,
};

export const SSC2_CLOZE_TEST_SLUGS = Object.keys(SSC2_CLOZE_TEST_NOTES);

import type { SubtopicNote } from "@/app/notes/_types";
import { SSC_EVO_ONEWORD_NOTE } from "./oneword";
import { SSC_EVO_SPELLING_NOTE } from "./spelling";
import { SSC_EVO_SYNONYMS_NOTE } from "./synonyms";
import { SSC_EVO_ANTONYMS_NOTE } from "./antonyms";
import { SSC_EVO_USAGE_NOTE } from "./usage";

export { SSC_VOCABULARY_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-english/vocabulary/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc-evo-` here and `sscevo-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape/vocabulary.ts). Order matches `subtopicOrder`.
 */
export const SSC_VOCABULARY_NOTES: Record<string, SubtopicNote> = {
  "ssc-evo-oneword": SSC_EVO_ONEWORD_NOTE,
  "ssc-evo-spelling": SSC_EVO_SPELLING_NOTE,
  "ssc-evo-synonyms": SSC_EVO_SYNONYMS_NOTE,
  "ssc-evo-antonyms": SSC_EVO_ANTONYMS_NOTE,
  "ssc-evo-usage": SSC_EVO_USAGE_NOTE,
};

export const SSC_VOCABULARY_SLUGS = Object.keys(SSC_VOCABULARY_NOTES);

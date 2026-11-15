import type { SubtopicNote } from "@/app/notes/_types";
import { SSC2_EVO_MEANING_NOTE } from "./meaning";
import { SSC2_EVO_ONEWORD_NOTE } from "./oneword";
import { SSC2_EVO_SPELLING_NOTE } from "./spelling";

export { SSC2_VOCABULARY_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-tier-2-english/vocabulary/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc2-evo-` here and `ssc2evo-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape-t2/vocabulary.ts). Order matches `subtopicOrder`.
 */
export const SSC2_VOCABULARY_NOTES: Record<string, SubtopicNote> = {
  "ssc2-evo-meaning": SSC2_EVO_MEANING_NOTE,
  "ssc2-evo-oneword": SSC2_EVO_ONEWORD_NOTE,
  "ssc2-evo-spelling": SSC2_EVO_SPELLING_NOTE,
};

export const SSC2_VOCABULARY_SLUGS = Object.keys(SSC2_VOCABULARY_NOTES);

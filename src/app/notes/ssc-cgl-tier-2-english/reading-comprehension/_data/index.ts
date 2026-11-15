import type { SubtopicNote } from "@/app/notes/_types";
import { SSC2_ERC_FACTS_NOTE } from "./facts";
import { SSC2_ERC_IDEAS_NOTE } from "./ideas";
import { SSC2_ERC_WORDS_NOTE } from "./words";

export { SSC2_READING_COMPREHENSION_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-tier-2-english/reading-comprehension/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc2-erc-` here and `ssc2erc-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape-t2/reading-comprehension.ts). Order matches `subtopicOrder`.
 */
export const SSC2_READING_COMPREHENSION_NOTES: Record<string, SubtopicNote> = {
  "ssc2-erc-facts": SSC2_ERC_FACTS_NOTE,
  "ssc2-erc-ideas": SSC2_ERC_IDEAS_NOTE,
  "ssc2-erc-words": SSC2_ERC_WORDS_NOTE,
};

export const SSC2_READING_COMPREHENSION_SLUGS = Object.keys(SSC2_READING_COMPREHENSION_NOTES);

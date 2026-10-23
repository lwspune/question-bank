import type { SubtopicNote } from "@/app/notes/_types";
import { SSC_ERC_FACTS_NOTE } from "./facts";
import { SSC_ERC_WORDS_NOTE } from "./words";
import { SSC_ERC_IDEAS_NOTE } from "./ideas";

export { SSC_READING_COMPREHENSION_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-english/reading-comprehension/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc-erc-` here and `sscerc-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape/reading-comprehension.ts). Order matches `subtopicOrder`.
 */
export const SSC_READING_COMPREHENSION_NOTES: Record<string, SubtopicNote> = {
  "ssc-erc-facts": SSC_ERC_FACTS_NOTE,
  "ssc-erc-words": SSC_ERC_WORDS_NOTE,
  "ssc-erc-ideas": SSC_ERC_IDEAS_NOTE,
};

export const SSC_READING_COMPREHENSION_SLUGS = Object.keys(SSC_READING_COMPREHENSION_NOTES);

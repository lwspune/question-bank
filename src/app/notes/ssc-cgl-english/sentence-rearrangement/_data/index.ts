import type { SubtopicNote } from "@/app/notes/_types";
import { SSC_ESR_PARAGRAPH_NOTE } from "./paragraph";
import { SSC_ESR_LINKS_NOTE } from "./links";
import { SSC_ESR_PARTS_NOTE } from "./parts";

export { SSC_SENTENCE_REARRANGEMENT_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-english/sentence-rearrangement/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc-esr-` here and `sscesr-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape/sentence-rearrangement.ts). Order matches `subtopicOrder`.
 */
export const SSC_SENTENCE_REARRANGEMENT_NOTES: Record<string, SubtopicNote> = {
  "ssc-esr-paragraph": SSC_ESR_PARAGRAPH_NOTE,
  "ssc-esr-links": SSC_ESR_LINKS_NOTE,
  "ssc-esr-parts": SSC_ESR_PARTS_NOTE,
};

export const SSC_SENTENCE_REARRANGEMENT_SLUGS = Object.keys(SSC_SENTENCE_REARRANGEMENT_NOTES);

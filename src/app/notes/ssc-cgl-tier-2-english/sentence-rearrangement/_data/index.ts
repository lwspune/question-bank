import type { SubtopicNote } from "@/app/notes/_types";
import { SSC2_ESR_PARAGRAPH_NOTE } from "./paragraph";
import { SSC2_ESR_PARTS_NOTE } from "./parts";

export { SSC2_SENTENCE_REARRANGEMENT_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-tier-2-english/sentence-rearrangement/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc2-esr-` here and `ssc2esr-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape-t2/sentence-rearrangement.ts). Order matches `subtopicOrder`.
 */
export const SSC2_SENTENCE_REARRANGEMENT_NOTES: Record<string, SubtopicNote> = {
  "ssc2-esr-paragraph": SSC2_ESR_PARAGRAPH_NOTE,
  "ssc2-esr-parts": SSC2_ESR_PARTS_NOTE,
};

export const SSC2_SENTENCE_REARRANGEMENT_SLUGS = Object.keys(SSC2_SENTENCE_REARRANGEMENT_NOTES);

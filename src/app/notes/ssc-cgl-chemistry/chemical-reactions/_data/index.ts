import type { SubtopicNote } from "@/app/notes/_types";
import { SSC_CCR_REACTIONS_NOTE } from "./reactions";

export { SSC_CHEMICAL_REACTIONS_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-chemistry/chemical-reactions/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc-ccr-` here and `sscccr-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape/chemical-reactions.ts). Order matches `subtopicOrder`.
 */
export const SSC_CHEMICAL_REACTIONS_NOTES: Record<string, SubtopicNote> = {
  "ssc-ccr-reactions": SSC_CCR_REACTIONS_NOTE,
};

export const SSC_CHEMICAL_REACTIONS_SLUGS = Object.keys(SSC_CHEMICAL_REACTIONS_NOTES);

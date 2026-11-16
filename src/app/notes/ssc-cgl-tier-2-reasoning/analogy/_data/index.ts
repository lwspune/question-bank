import type { SubtopicNote } from "@/app/notes/_types";
import { SSC2_RAN_ANALOGY_NOTE } from "./analogy";

export { SSC2_ANALOGY_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-tier-2-reasoning/analogy/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc2-ran-` here and `ssc2ran-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape-t2/analogy.ts). Order matches `subtopicOrder`.
 */
export const SSC2_ANALOGY_NOTES: Record<string, SubtopicNote> = {
  "ssc2-ran-analogy": SSC2_RAN_ANALOGY_NOTE,
};

export const SSC2_ANALOGY_SLUGS = Object.keys(SSC2_ANALOGY_NOTES);

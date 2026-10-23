import type { SubtopicNote } from "@/app/notes/_types";
import { SSC_RIN_CHAINS_NOTE } from "./chains";

export { SSC_INEQUALITIES_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-reasoning/inequalities/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc-rin-` here and `sscrin-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape/inequalities.ts). Order matches `subtopicOrder`.
 */
export const SSC_INEQUALITIES_NOTES: Record<string, SubtopicNote> = {
  "ssc-rin-chains": SSC_RIN_CHAINS_NOTE,
};

export const SSC_INEQUALITIES_SLUGS = Object.keys(SSC_INEQUALITIES_NOTES);

import type { SubtopicNote } from "@/app/notes/_types";
import { SSC_LE_SOLVE_NOTE } from "./solve";
import { SSC_LE_COUNT_NOTE } from "./count";
import { SSC_LE_WORD_NOTE } from "./word";
import { SSC_LE_AGES_NOTE } from "./ages";

export { SSC_LINEAR_EQUATIONS_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-maths/linear-equations/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc-le-` here and `sscle-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape/linear-equations.ts). Order matches `subtopicOrder`.
 */
export const SSC_LINEAR_EQUATIONS_NOTES: Record<string, SubtopicNote> = {
  "ssc-le-solve": SSC_LE_SOLVE_NOTE,
  "ssc-le-count": SSC_LE_COUNT_NOTE,
  "ssc-le-word": SSC_LE_WORD_NOTE,
  "ssc-le-ages": SSC_LE_AGES_NOTE,
};

export const SSC_LINEAR_EQUATIONS_SLUGS = Object.keys(SSC_LINEAR_EQUATIONS_NOTES);

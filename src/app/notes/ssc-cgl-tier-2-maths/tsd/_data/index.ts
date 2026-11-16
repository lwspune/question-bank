import type { SubtopicNote } from "@/app/notes/_types";
import { SSC2_TD_BASICS_NOTE } from "./basics";
import { SSC2_TD_RELATIVE_NOTE } from "./relative";

export { SSC2_TSD_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-tier-2-maths/tsd/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc2-td-` here and `ssc2td-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape-t2/tsd.ts). Order matches `subtopicOrder`.
 */
export const SSC2_TSD_NOTES: Record<string, SubtopicNote> = {
  "ssc2-td-basics": SSC2_TD_BASICS_NOTE,
  "ssc2-td-relative": SSC2_TD_RELATIVE_NOTE,
};

export const SSC2_TSD_SLUGS = Object.keys(SSC2_TSD_NOTES);

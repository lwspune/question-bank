import type { SubtopicNote } from "@/app/notes/_types";
import { SSC_RBR_DIRECT_NOTE } from "./direct";
import { SSC_RBR_SPOKEN_NOTE } from "./spoken";
import { SSC_RBR_PUZZLES_NOTE } from "./puzzles";
import { SSC_RBR_CODED_NOTE } from "./coded";
import { SSC_RBR_STATEMENTS_NOTE } from "./statements";

export { SSC_BLOOD_RELATIONS_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-reasoning/blood-relations/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc-rbr-` here and `sscrbr-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape/blood-relations.ts). Order matches `subtopicOrder`.
 */
export const SSC_BLOOD_RELATIONS_NOTES: Record<string, SubtopicNote> = {
  "ssc-rbr-direct": SSC_RBR_DIRECT_NOTE,
  "ssc-rbr-spoken": SSC_RBR_SPOKEN_NOTE,
  "ssc-rbr-puzzles": SSC_RBR_PUZZLES_NOTE,
  "ssc-rbr-coded": SSC_RBR_CODED_NOTE,
  "ssc-rbr-statements": SSC_RBR_STATEMENTS_NOTE,
};

export const SSC_BLOOD_RELATIONS_SLUGS = Object.keys(SSC_BLOOD_RELATIONS_NOTES);

import type { SubtopicNote } from "@/app/notes/_types";
import { SSC2_RBR_RELATIONS_NOTE } from "./relations";

export { SSC2_BLOOD_RELATIONS_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-tier-2-reasoning/blood-relations/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc2-rbr-` here and `ssc2rbr-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape-t2/blood-relations.ts). Order matches `subtopicOrder`.
 */
export const SSC2_BLOOD_RELATIONS_NOTES: Record<string, SubtopicNote> = {
  "ssc2-rbr-relations": SSC2_RBR_RELATIONS_NOTE,
};

export const SSC2_BLOOD_RELATIONS_SLUGS = Object.keys(SSC2_BLOOD_RELATIONS_NOTES);

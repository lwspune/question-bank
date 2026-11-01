import type { SubtopicNote } from "@/app/notes/_types";
import { SSC_BHP_NUTRITION_NOTE } from "./nutrition";
import { SSC_BHP_SYSTEMS_NOTE } from "./systems";

export { SSC_HUMAN_PHYSIOLOGY_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-biology/human-physiology/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc-bhp-` here and `sscbhp-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape/human-physiology.ts). Order matches `subtopicOrder`.
 */
export const SSC_HUMAN_PHYSIOLOGY_NOTES: Record<string, SubtopicNote> = {
  "ssc-bhp-nutrition": SSC_BHP_NUTRITION_NOTE,
  "ssc-bhp-systems": SSC_BHP_SYSTEMS_NOTE,
};

export const SSC_HUMAN_PHYSIOLOGY_SLUGS = Object.keys(SSC_HUMAN_PHYSIOLOGY_NOTES);

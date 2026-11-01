import type { SubtopicNote } from "@/app/notes/_types";
import { SSC_GWH_WORLD_NOTE } from "./world";
import { SSC_GWH_HUMAN_NOTE } from "./human";

export { SSC_WORLD_HUMAN_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-geography/world-human/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc-gwh-` here and `sscgwh-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape/world-human.ts). Order matches `subtopicOrder`.
 */
export const SSC_WORLD_HUMAN_NOTES: Record<string, SubtopicNote> = {
  "ssc-gwh-world": SSC_GWH_WORLD_NOTE,
  "ssc-gwh-human": SSC_GWH_HUMAN_NOTE,
};

export const SSC_WORLD_HUMAN_SLUGS = Object.keys(SSC_WORLD_HUMAN_NOTES);

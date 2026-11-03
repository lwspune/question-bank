import type { SubtopicNote } from "@/app/notes/_types";
import { SSC_BPB_PLANTS_NOTE } from "./plants";

export { SSC_PLANT_BIOLOGY_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-biology/plant-biology/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc-bpb-` here and `sscbpb-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape/plant-biology.ts). Order matches `subtopicOrder`.
 */
export const SSC_PLANT_BIOLOGY_NOTES: Record<string, SubtopicNote> = {
  "ssc-bpb-plants": SSC_BPB_PLANTS_NOTE,
};

export const SSC_PLANT_BIOLOGY_SLUGS = Object.keys(SSC_PLANT_BIOLOGY_NOTES);

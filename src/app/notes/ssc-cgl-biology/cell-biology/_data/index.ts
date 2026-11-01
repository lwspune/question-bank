import type { SubtopicNote } from "@/app/notes/_types";
import { SSC_BCB_STRUCTURE_NOTE } from "./structure";
import { SSC_BCB_PROCESSES_NOTE } from "./processes";

export { SSC_CELL_BIOLOGY_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-biology/cell-biology/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc-bcb-` here and `sscbcb-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape/cell-biology.ts). Order matches `subtopicOrder`.
 */
export const SSC_CELL_BIOLOGY_NOTES: Record<string, SubtopicNote> = {
  "ssc-bcb-structure": SSC_BCB_STRUCTURE_NOTE,
  "ssc-bcb-processes": SSC_BCB_PROCESSES_NOTE,
};

export const SSC_CELL_BIOLOGY_SLUGS = Object.keys(SSC_CELL_BIOLOGY_NOTES);

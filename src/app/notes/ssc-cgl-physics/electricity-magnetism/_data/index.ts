import type { SubtopicNote } from "@/app/notes/_types";
import { SSC_FEM_ELECTRICITY_NOTE } from "./electricity";

export { SSC_ELECTRICITY_MAGNETISM_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-physics/electricity-magnetism/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc-fem-` here and `sscfem-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape/electricity-magnetism.ts). Order matches `subtopicOrder`.
 */
export const SSC_ELECTRICITY_MAGNETISM_NOTES: Record<string, SubtopicNote> = {
  "ssc-fem-electricity": SSC_FEM_ELECTRICITY_NOTE,
};

export const SSC_ELECTRICITY_MAGNETISM_SLUGS = Object.keys(SSC_ELECTRICITY_MAGNETISM_NOTES);

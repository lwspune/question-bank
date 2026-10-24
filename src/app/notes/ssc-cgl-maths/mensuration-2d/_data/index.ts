import type { SubtopicNote } from "@/app/notes/_types";
import { SSC_M2_QUADS_NOTE } from "./quads";
import { SSC_M2_TRIANGLES_NOTE } from "./triangles";
import { SSC_M2_CIRCLES_NOTE } from "./circles";
import { SSC_M2_ARCS_NOTE } from "./arcs";
import { SSC_M2_SECTORS_NOTE } from "./sectors";
import { SSC_M2_SHADED_NOTE } from "./shaded";

export { SSC_MENSURATION_2D_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-maths/mensuration-2d/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc-m2-` here and `sscm2-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape/mensuration-2d.ts). Order matches `subtopicOrder`.
 */
export const SSC_MENSURATION_2D_NOTES: Record<string, SubtopicNote> = {
  "ssc-m2-quads": SSC_M2_QUADS_NOTE,
  "ssc-m2-triangles": SSC_M2_TRIANGLES_NOTE,
  "ssc-m2-circles": SSC_M2_CIRCLES_NOTE,
  "ssc-m2-arcs": SSC_M2_ARCS_NOTE,
  "ssc-m2-sectors": SSC_M2_SECTORS_NOTE,
  "ssc-m2-shaded": SSC_M2_SHADED_NOTE,
};

export const SSC_MENSURATION_2D_SLUGS = Object.keys(SSC_MENSURATION_2D_NOTES);

import type { SubtopicNote } from "@/app/notes/_types";
import { SSC_M3_CUBOIDS_NOTE } from "./cuboids";
import { SSC_M3_PRISMS_NOTE } from "./prisms";
import { SSC_M3_CYLINDERS_NOTE } from "./cylinders";
import { SSC_M3_CONES_NOTE } from "./cones";
import { SSC_M3_SPHERES_NOTE } from "./spheres";
import { SSC_M3_SCALING_NOTE } from "./scaling";
import { SSC_M3_RECASTING_NOTE } from "./recasting";

export { SSC_MENSURATION_3D_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-maths/mensuration-3d/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc-m3-` here and `sscm3-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape/mensuration-3d.ts). Order matches `subtopicOrder`.
 */
export const SSC_MENSURATION_3D_NOTES: Record<string, SubtopicNote> = {
  "ssc-m3-cuboids": SSC_M3_CUBOIDS_NOTE,
  "ssc-m3-prisms": SSC_M3_PRISMS_NOTE,
  "ssc-m3-cylinders": SSC_M3_CYLINDERS_NOTE,
  "ssc-m3-cones": SSC_M3_CONES_NOTE,
  "ssc-m3-spheres": SSC_M3_SPHERES_NOTE,
  "ssc-m3-scaling": SSC_M3_SCALING_NOTE,
  "ssc-m3-recasting": SSC_M3_RECASTING_NOTE,
};

export const SSC_MENSURATION_3D_SLUGS = Object.keys(SSC_MENSURATION_3D_NOTES);

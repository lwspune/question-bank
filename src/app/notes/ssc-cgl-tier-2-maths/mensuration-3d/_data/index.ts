import type { SubtopicNote } from "@/app/notes/_types";
import { SSC2_M3_PRISMS_NOTE } from "./prisms";
import { SSC2_M3_CYLINDERS_NOTE } from "./cylinders";
import { SSC2_M3_CONES_NOTE } from "./cones";
import { SSC2_M3_SPHERES_NOTE } from "./spheres";
import { SSC2_M3_SCALING_NOTE } from "./scaling";
import { SSC2_M3_RECASTING_NOTE } from "./recasting";

export { SSC2_MENSURATION_3D_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-tier-2-maths/mensuration-3d/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc2-m3-` here and `ssc2m3-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape-t2/mensuration-3d.ts). Order matches `subtopicOrder`.
 */
export const SSC2_MENSURATION_3D_NOTES: Record<string, SubtopicNote> = {
  "ssc2-m3-prisms": SSC2_M3_PRISMS_NOTE,
  "ssc2-m3-cylinders": SSC2_M3_CYLINDERS_NOTE,
  "ssc2-m3-cones": SSC2_M3_CONES_NOTE,
  "ssc2-m3-spheres": SSC2_M3_SPHERES_NOTE,
  "ssc2-m3-scaling": SSC2_M3_SCALING_NOTE,
  "ssc2-m3-recasting": SSC2_M3_RECASTING_NOTE,
};

export const SSC2_MENSURATION_3D_SLUGS = Object.keys(SSC2_MENSURATION_3D_NOTES);

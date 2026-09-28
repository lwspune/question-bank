import type { SubtopicNote } from "@/app/notes/_types";
import { CDS_M3_CUBOIDS_NOTE } from "./cuboids";
import { CDS_M3_DIAGONALS_NOTE } from "./diagonals";
import { CDS_M3_CYLINDERS_NOTE } from "./cylinders";
import { CDS_M3_CONES_NOTE } from "./cones";
import { CDS_M3_SPHERES_NOTE } from "./spheres";
import { CDS_M3_FRUSTUMS_NOTE } from "./frustums";
import { CDS_M3_RECASTING_NOTE } from "./recasting";
import { CDS_M3_WATER_NOTE } from "./water";
import { CDS_M3_SCALING_NOTE } from "./scaling";
import { CDS_M3_INSIDE_NOTE } from "./inside";

export { CDS_MENSURATION_3D_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/cds-maths/mensuration-3d/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is
 * GLOBALLY unique across NOTES_CHAPTERS — hence `cds-m3-` here and `cdsm3-` on concept slugs.
 *
 * The ten pages were cut by reading all 171 solutions (scripts/cds-maths/reshape/mensuration-3d.ts):
 * one page per solid, then the cuboid identities, frustums and joined solids, melting, water,
 * scaling, and solids fitted inside solids. Order matches `subtopicOrder`.
 */
export const CDS_MENSURATION_3D_NOTES: Record<string, SubtopicNote> = {
  "cds-m3-cuboids": CDS_M3_CUBOIDS_NOTE,
  "cds-m3-diagonals": CDS_M3_DIAGONALS_NOTE,
  "cds-m3-cylinders": CDS_M3_CYLINDERS_NOTE,
  "cds-m3-cones": CDS_M3_CONES_NOTE,
  "cds-m3-spheres": CDS_M3_SPHERES_NOTE,
  "cds-m3-frustums": CDS_M3_FRUSTUMS_NOTE,
  "cds-m3-recasting": CDS_M3_RECASTING_NOTE,
  "cds-m3-water": CDS_M3_WATER_NOTE,
  "cds-m3-scaling": CDS_M3_SCALING_NOTE,
  "cds-m3-inside": CDS_M3_INSIDE_NOTE,
};

export const CDS_MENSURATION_3D_SLUGS = Object.keys(CDS_MENSURATION_3D_NOTES);

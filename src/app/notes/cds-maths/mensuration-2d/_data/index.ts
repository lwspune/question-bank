import type { SubtopicNote } from "@/app/notes/_types";
import { CDS_M2_TRIANGLES_NOTE } from "./triangles";
import { CDS_M2_QUADRILATERALS_NOTE } from "./quadrilaterals";
import { CDS_M2_EQUAL_PERIMETERS_NOTE } from "./equal-perimeters";
import { CDS_M2_CIRCLES_NOTE } from "./circles";
import { CDS_M2_SECTORS_NOTE } from "./sectors";
import { CDS_M2_INSCRIBED_NOTE } from "./inscribed";
import { CDS_M2_TOUCHING_CIRCLES_NOTE } from "./touching-circles";
import { CDS_M2_SHADED_REGIONS_NOTE } from "./shaded-regions";

export { CDS_MENSURATION_2D_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/cds-maths/mensuration-2d/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is
 * GLOBALLY unique across NOTES_CHAPTERS — hence `cds-m2-` here and `cdsm2-` on concept
 * slugs (NDA and MHT-CET both ship mensuration notes).
 *
 * The eight pages were cut by reading all 197 solutions (scripts/cds-maths/reshape/mensuration-2d.ts):
 * the classification grouped by shape name, the pages group by the technique the solution
 * uses. Order matches `subtopicOrder`.
 */
export const CDS_MENSURATION_2D_NOTES: Record<string, SubtopicNote> = {
  "cds-m2-triangles": CDS_M2_TRIANGLES_NOTE,
  "cds-m2-quadrilaterals": CDS_M2_QUADRILATERALS_NOTE,
  "cds-m2-equal-perimeters": CDS_M2_EQUAL_PERIMETERS_NOTE,
  "cds-m2-circles": CDS_M2_CIRCLES_NOTE,
  "cds-m2-sectors": CDS_M2_SECTORS_NOTE,
  "cds-m2-inscribed": CDS_M2_INSCRIBED_NOTE,
  "cds-m2-touching-circles": CDS_M2_TOUCHING_CIRCLES_NOTE,
  "cds-m2-shaded-regions": CDS_M2_SHADED_REGIONS_NOTE,
};

export const CDS_MENSURATION_2D_SLUGS = Object.keys(CDS_MENSURATION_2D_NOTES);

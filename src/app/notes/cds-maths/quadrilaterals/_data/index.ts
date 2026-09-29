import type { SubtopicNote } from "@/app/notes/_types";
import { CDS_QU_GENERAL_NOTE } from "./general";
import { CDS_QU_PARALLELOGRAMS_NOTE } from "./parallelograms";
import { CDS_QU_RHOMBUS_NOTE } from "./rhombus";
import { CDS_QU_TRAPEZIUM_NOTE } from "./trapezium";
import { CDS_QU_CYCLIC_NOTE } from "./cyclic";

export { CDS_QUADRILATERALS_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/cds-maths/quadrilaterals/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `cds-qu-` here and `cdsqu-` on concept slugs.
 *
 * The five pages were cut by reading all 54 solutions (scripts/cds-maths/reshape/quadrilaterals.ts):
 * "Trapezium, Rhombus and Kite" split in two; the midpoint-figure rows joined Parallelograms.
 * Order matches `subtopicOrder`.
 */
export const CDS_QUADRILATERALS_NOTES: Record<string, SubtopicNote> = {
  "cds-qu-general": CDS_QU_GENERAL_NOTE,
  "cds-qu-parallelograms": CDS_QU_PARALLELOGRAMS_NOTE,
  "cds-qu-rhombus": CDS_QU_RHOMBUS_NOTE,
  "cds-qu-trapezium": CDS_QU_TRAPEZIUM_NOTE,
  "cds-qu-cyclic": CDS_QU_CYCLIC_NOTE,
};

export const CDS_QUADRILATERALS_SLUGS = Object.keys(CDS_QUADRILATERALS_NOTES);

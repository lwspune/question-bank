import type { SubtopicNote } from "@/app/notes/_types";
import { CDS_BI_CE_KINDS_NOTE } from "./kinds";
import { CDS_BI_CE_BOUNDARY_NOTE } from "./boundary";
import { CDS_BI_CE_ORGANELLES_NOTE } from "./organelles";
import { CDS_BI_CE_NUCLEUS_NOTE } from "./nucleus";

export { CDS_BI_CELL_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/cds-biology/cell-biology/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `cdsbi-ce-` here and `cdsbice-` on concept slugs.
 *
 * 4 pages cut by reading every solution (scripts/cds-gs/reshape/cell-biology.ts).
 * Order matches `subtopicOrder`.
 */
export const CDS_BI_CELL_NOTES: Record<string, SubtopicNote> = {
  "cdsbi-ce-kinds": CDS_BI_CE_KINDS_NOTE,
  "cdsbi-ce-boundary": CDS_BI_CE_BOUNDARY_NOTE,
  "cdsbi-ce-organelles": CDS_BI_CE_ORGANELLES_NOTE,
  "cdsbi-ce-nucleus": CDS_BI_CE_NUCLEUS_NOTE,
};

export const CDS_BI_CELL_SLUGS = Object.keys(CDS_BI_CELL_NOTES);

import type { SubtopicNote } from "@/app/notes/_types";
import { CDS_BI_BC_CARBOHYDRATES_NOTE } from "./carbohydrates";
import { CDS_BI_BC_PROTEINS_NOTE } from "./proteins";

export { CDS_BI_BIOCHEMISTRY_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/cds-biology/biochemistry/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `cdsbi-bc-` here and `cdsbibc-` on concept slugs.
 *
 * 2 pages cut by reading every solution (scripts/cds-gs/reshape/biochemistry.ts).
 * Order matches `subtopicOrder`.
 */
export const CDS_BI_BIOCHEMISTRY_NOTES: Record<string, SubtopicNote> = {
  "cdsbi-bc-carbohydrates": CDS_BI_BC_CARBOHYDRATES_NOTE,
  "cdsbi-bc-proteins": CDS_BI_BC_PROTEINS_NOTE,
};

export const CDS_BI_BIOCHEMISTRY_SLUGS = Object.keys(CDS_BI_BIOCHEMISTRY_NOTES);

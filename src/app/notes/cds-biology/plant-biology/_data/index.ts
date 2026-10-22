import type { SubtopicNote } from "@/app/notes/_types";
import { CDS_BI_PL_ORGANS_NOTE } from "./organs";
import { CDS_BI_PL_TISSUES_NOTE } from "./tissues";
import { CDS_BI_PL_FOOD_NOTE } from "./food";

export { CDS_BI_PLANT_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/cds-biology/plant-biology/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `cdsbi-pl-` here and `cdsbipl-` on concept slugs.
 *
 * 3 pages cut by reading every solution (scripts/cds-gs/reshape/plant-biology.ts).
 * Order matches `subtopicOrder`.
 */
export const CDS_BI_PLANT_NOTES: Record<string, SubtopicNote> = {
  "cdsbi-pl-organs": CDS_BI_PL_ORGANS_NOTE,
  "cdsbi-pl-tissues": CDS_BI_PL_TISSUES_NOTE,
  "cdsbi-pl-food": CDS_BI_PL_FOOD_NOTE,
};

export const CDS_BI_PLANT_SLUGS = Object.keys(CDS_BI_PLANT_NOTES);

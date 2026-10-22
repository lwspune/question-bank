import type { SubtopicNote } from "@/app/notes/_types";
import { CDS_BI_BD_GROUPS_NOTE } from "./groups";
import { CDS_BI_BD_ANIMALS_NOTE } from "./animals";

export { CDS_BI_BIODIVERSITY_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/cds-biology/biodiversity-classification/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `cdsbi-bd-` here and `cdsbibd-` on concept slugs.
 *
 * 2 pages cut by reading every solution (scripts/cds-gs/reshape/biodiversity-classification.ts).
 * Order matches `subtopicOrder`.
 */
export const CDS_BI_BIODIVERSITY_NOTES: Record<string, SubtopicNote> = {
  "cdsbi-bd-groups": CDS_BI_BD_GROUPS_NOTE,
  "cdsbi-bd-animals": CDS_BI_BD_ANIMALS_NOTE,
};

export const CDS_BI_BIODIVERSITY_SLUGS = Object.keys(CDS_BI_BIODIVERSITY_NOTES);

import type { SubtopicNote } from "@/app/notes/_types";
import { CDS_BI_MI_PATHOGENS_NOTE } from "./pathogens";
import { CDS_BI_MI_CURES_NOTE } from "./cures";

export { CDS_BI_MICROBES_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/cds-biology/microbiology-disease/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `cdsbi-mi-` here and `cdsbimi-` on concept slugs.
 *
 * 2 pages cut by reading every solution (scripts/cds-gs/reshape/microbiology-disease.ts).
 * Order matches `subtopicOrder`.
 */
export const CDS_BI_MICROBES_NOTES: Record<string, SubtopicNote> = {
  "cdsbi-mi-pathogens": CDS_BI_MI_PATHOGENS_NOTE,
  "cdsbi-mi-cures": CDS_BI_MI_CURES_NOTE,
};

export const CDS_BI_MICROBES_SLUGS = Object.keys(CDS_BI_MICROBES_NOTES);

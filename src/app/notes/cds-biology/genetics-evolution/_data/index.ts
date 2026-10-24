import type { SubtopicNote } from "@/app/notes/_types";
import { CDS_BI_GE_HEREDITY_NOTE } from "./heredity";
import { CDS_BI_GE_EVOLUTION_NOTE } from "./evolution";

export { CDS_BI_GENETICS_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/cds-biology/genetics-evolution/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `cdsbi-ge-` here and `cdsbige-` on concept slugs.
 *
 * 2 pages cut by reading every solution (scripts/cds-gs/reshape/genetics-evolution.ts).
 * Order matches `subtopicOrder`.
 */
export const CDS_BI_GENETICS_NOTES: Record<string, SubtopicNote> = {
  "cdsbi-ge-heredity": CDS_BI_GE_HEREDITY_NOTE,
  "cdsbi-ge-evolution": CDS_BI_GE_EVOLUTION_NOTE,
};

export const CDS_BI_GENETICS_SLUGS = Object.keys(CDS_BI_GENETICS_NOTES);

import type { SubtopicNote } from "@/app/notes/_types";
import { CDS_BI_RE_REPRODUCTION_NOTE } from "./reproduction";

export { CDS_BI_REPRODUCTION_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/cds-biology/reproduction/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `cdsbi-re-` here and `cdsbire-` on concept slugs.
 *
 * 1 pages cut by reading every solution (scripts/cds-gs/reshape/reproduction.ts).
 * Order matches `subtopicOrder`.
 */
export const CDS_BI_REPRODUCTION_NOTES: Record<string, SubtopicNote> = {
  "cdsbi-re-reproduction": CDS_BI_RE_REPRODUCTION_NOTE,
};

export const CDS_BI_REPRODUCTION_SLUGS = Object.keys(CDS_BI_REPRODUCTION_NOTES);

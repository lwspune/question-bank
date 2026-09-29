import type { SubtopicNote } from "@/app/notes/_types";
import { CDS_SE_SETS_NOTE } from "./sets";
import { CDS_SE_VENN_NOTE } from "./venn";

export { CDS_SETS_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/cds-maths/sets/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `cds-se-` here and `cdsse-` on concept slugs.
 *
 * Two pages, cut by reading all 28 solutions (scripts/cds-maths/reshape/sets.ts):
 * what a set is, and counting with Venn diagrams.
 * Order matches `subtopicOrder`.
 */
export const CDS_SETS_NOTES: Record<string, SubtopicNote> = {
  "cds-se-sets": CDS_SE_SETS_NOTE,
  "cds-se-venn": CDS_SE_VENN_NOTE,
};

export const CDS_SETS_SLUGS = Object.keys(CDS_SETS_NOTES);

import type { SubtopicNote } from "@/app/notes/_types";
import { CDS_SS_SERIES_NOTE } from "./series";
import { CDS_SS_MEANS_NOTE } from "./means";

export { CDS_SEQUENCES_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/cds-maths/sequences/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `cds-ss-` here and `cdsss-` on concept slugs.
 *
 * Two pages, cut by reading all 19 solutions (scripts/cds-maths/reshape/sequences.ts):
 * progressions and special sums, and the three means.
 * Order matches `subtopicOrder`.
 */
export const CDS_SEQUENCES_NOTES: Record<string, SubtopicNote> = {
  "cds-ss-series": CDS_SS_SERIES_NOTE,
  "cds-ss-means": CDS_SS_MEANS_NOTE,
};

export const CDS_SEQUENCES_SLUGS = Object.keys(CDS_SEQUENCES_NOTES);

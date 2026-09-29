import type { SubtopicNote } from "@/app/notes/_types";
import { CDS_LA_LINES_NOTE } from "./lines";
import { CDS_LA_POLYGONS_NOTE } from "./polygons";

export { CDS_LINES_ANGLES_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/cds-maths/lines-angles/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `cds-la-` here and `cdsla-` on concept slugs.
 *
 * Two pages, cut by reading all 22 solutions (scripts/cds-maths/reshape/lines-angles.ts):
 * the four line buckets became one page; polygons keep theirs.
 * Order matches `subtopicOrder`.
 */
export const CDS_LINES_ANGLES_NOTES: Record<string, SubtopicNote> = {
  "cds-la-lines": CDS_LA_LINES_NOTE,
  "cds-la-polygons": CDS_LA_POLYGONS_NOTE,
};

export const CDS_LINES_ANGLES_SLUGS = Object.keys(CDS_LINES_ANGLES_NOTES);

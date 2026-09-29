import type { SubtopicNote } from "@/app/notes/_types";
import { CDS_HD_SINGLE_NOTE } from "./single";
import { CDS_HD_TWOPOINTS_NOTE } from "./twopoints";
import { CDS_HD_ABOVE_NOTE } from "./above";
import { CDS_HD_PLANE_NOTE } from "./plane";

export { CDS_HEIGHTS_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/cds-maths/heights/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `cds-hd-` here and `cdshd-` on concept slugs.
 *
 * The four pages were cut by reading all 41 solutions (scripts/cds-maths/reshape/heights.ts):
 * "Angles of Elevation and Depression" (34) split by set-up.
 * Order matches `subtopicOrder`.
 */
export const CDS_HEIGHTS_NOTES: Record<string, SubtopicNote> = {
  "cds-hd-single": CDS_HD_SINGLE_NOTE,
  "cds-hd-twopoints": CDS_HD_TWOPOINTS_NOTE,
  "cds-hd-above": CDS_HD_ABOVE_NOTE,
  "cds-hd-plane": CDS_HD_PLANE_NOTE,
};

export const CDS_HEIGHTS_SLUGS = Object.keys(CDS_HEIGHTS_NOTES);

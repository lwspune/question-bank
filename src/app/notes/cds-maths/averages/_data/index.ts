import type { SubtopicNote } from "@/app/notes/_types";
import { CDS_AV_TOTALS_NOTE } from "./totals";
import { CDS_AV_WEIGHTED_NOTE } from "./weighted";
import { CDS_AV_SEQUENCES_NOTE } from "./sequences";

export { CDS_AVERAGES_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/cds-maths/averages/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `cds-av-` here and `cdsav-` on concept slugs.
 *
 * The three pages were cut by reading all 47 solutions (scripts/cds-maths/reshape/averages.ts):
 * "Average and Weighted Average" (43) split by technique; "Correction of Mean" joined the totals page.
 * Order matches `subtopicOrder`.
 */
export const CDS_AVERAGES_NOTES: Record<string, SubtopicNote> = {
  "cds-av-totals": CDS_AV_TOTALS_NOTE,
  "cds-av-weighted": CDS_AV_WEIGHTED_NOTE,
  "cds-av-sequences": CDS_AV_SEQUENCES_NOTE,
};

export const CDS_AVERAGES_SLUGS = Object.keys(CDS_AVERAGES_NOTES);

import type { SubtopicNote } from "@/app/notes/_types";
import { CDS_ST_DATA_NOTE } from "./data";
import { CDS_ST_TABLES_NOTE } from "./tables";
import { CDS_ST_MEAN_NOTE } from "./mean";
import { CDS_ST_MEDIAN_NOTE } from "./median";
import { CDS_ST_GROUPED_NOTE } from "./grouped";
import { CDS_ST_CHOOSING_NOTE } from "./choosing";

export { CDS_STATISTICS_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/cds-maths/statistics/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `cds-st-` here and `cdsst-` on concept slugs.
 *
 * The six pages were cut by reading all 80 solutions (scripts/cds-maths/reshape/statistics.ts):
 * cut by the kind of data rather than by measure, because ten premise sets ask for the mean,
 * median and mode of one table. Order matches `subtopicOrder`.
 */
export const CDS_STATISTICS_NOTES: Record<string, SubtopicNote> = {
  "cds-st-data": CDS_ST_DATA_NOTE,
  "cds-st-tables": CDS_ST_TABLES_NOTE,
  "cds-st-mean": CDS_ST_MEAN_NOTE,
  "cds-st-median": CDS_ST_MEDIAN_NOTE,
  "cds-st-grouped": CDS_ST_GROUPED_NOTE,
  "cds-st-choosing": CDS_ST_CHOOSING_NOTE,
};

export const CDS_STATISTICS_SLUGS = Object.keys(CDS_STATISTICS_NOTES);

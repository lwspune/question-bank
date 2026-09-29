import type { SubtopicNote } from "@/app/notes/_types";
import { CDS_TD_AVERAGE_NOTE } from "./average";
import { CDS_TD_EQUATIONS_NOTE } from "./equations";
import { CDS_TD_RELATIVE_NOTE } from "./relative";
import { CDS_TD_TRAINS_NOTE } from "./trains";
import { CDS_TD_BOATS_NOTE } from "./boats";
import { CDS_TD_RACES_NOTE } from "./races";
import { CDS_TD_CLOCKS_NOTE } from "./clocks";

export { CDS_TSD_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/cds-maths/tsd/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `cds-td-` here and `cdstd-` on concept slugs.
 *
 * The seven pages were cut by reading all 75 solutions (scripts/cds-maths/reshape/tsd.ts):
 * the chapter-named catch-all split into average speed, speed-change equations and relative speed.
 * Order matches `subtopicOrder`.
 */
export const CDS_TSD_NOTES: Record<string, SubtopicNote> = {
  "cds-td-average": CDS_TD_AVERAGE_NOTE,
  "cds-td-equations": CDS_TD_EQUATIONS_NOTE,
  "cds-td-relative": CDS_TD_RELATIVE_NOTE,
  "cds-td-trains": CDS_TD_TRAINS_NOTE,
  "cds-td-boats": CDS_TD_BOATS_NOTE,
  "cds-td-races": CDS_TD_RACES_NOTE,
  "cds-td-clocks": CDS_TD_CLOCKS_NOTE,
};

export const CDS_TSD_SLUGS = Object.keys(CDS_TSD_NOTES);

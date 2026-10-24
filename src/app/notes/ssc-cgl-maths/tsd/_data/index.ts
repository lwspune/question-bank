import type { SubtopicNote } from "@/app/notes/_types";
import { SSC_TD_BASICS_NOTE } from "./basics";
import { SSC_TD_AVERAGE_NOTE } from "./average";
import { SSC_TD_CHANGES_NOTE } from "./changes";
import { SSC_TD_RELATIVE_NOTE } from "./relative";
import { SSC_TD_TRAINS_NOTE } from "./trains";
import { SSC_TD_BOATS_NOTE } from "./boats";
import { SSC_TD_RACES_NOTE } from "./races";
import { SSC_TD_CIRCULAR_NOTE } from "./circular";

export { SSC_TSD_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-maths/tsd/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc-td-` here and `ssctd-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape/tsd.ts). Order matches `subtopicOrder`.
 */
export const SSC_TSD_NOTES: Record<string, SubtopicNote> = {
  "ssc-td-basics": SSC_TD_BASICS_NOTE,
  "ssc-td-average": SSC_TD_AVERAGE_NOTE,
  "ssc-td-changes": SSC_TD_CHANGES_NOTE,
  "ssc-td-relative": SSC_TD_RELATIVE_NOTE,
  "ssc-td-trains": SSC_TD_TRAINS_NOTE,
  "ssc-td-boats": SSC_TD_BOATS_NOTE,
  "ssc-td-races": SSC_TD_RACES_NOTE,
  "ssc-td-circular": SSC_TD_CIRCULAR_NOTE,
};

export const SSC_TSD_SLUGS = Object.keys(SSC_TSD_NOTES);

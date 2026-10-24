import type { SubtopicNote } from "@/app/notes/_types";
import { SSC_TW_RATES_NOTE } from "./rates";
import { SSC_TW_EFFICIENCY_NOTE } from "./efficiency";
import { SSC_TW_JOINING_NOTE } from "./joining";
import { SSC_TW_ALTERNATE_NOTE } from "./alternate";
import { SSC_TW_MANDAYS_NOTE } from "./mandays";
import { SSC_TW_EQUIVALENT_NOTE } from "./equivalent";
import { SSC_TW_PIPES_NOTE } from "./pipes";

export { SSC_TIME_WORK_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-maths/time-work/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc-tw-` here and `ssctw-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape/time-work.ts). Order matches `subtopicOrder`.
 */
export const SSC_TIME_WORK_NOTES: Record<string, SubtopicNote> = {
  "ssc-tw-rates": SSC_TW_RATES_NOTE,
  "ssc-tw-efficiency": SSC_TW_EFFICIENCY_NOTE,
  "ssc-tw-joining": SSC_TW_JOINING_NOTE,
  "ssc-tw-alternate": SSC_TW_ALTERNATE_NOTE,
  "ssc-tw-mandays": SSC_TW_MANDAYS_NOTE,
  "ssc-tw-equivalent": SSC_TW_EQUIVALENT_NOTE,
  "ssc-tw-pipes": SSC_TW_PIPES_NOTE,
};

export const SSC_TIME_WORK_SLUGS = Object.keys(SSC_TIME_WORK_NOTES);

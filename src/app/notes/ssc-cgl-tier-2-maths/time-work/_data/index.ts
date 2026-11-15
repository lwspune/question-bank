import type { SubtopicNote } from "@/app/notes/_types";
import { SSC2_TW_WORK_NOTE } from "./work";
import { SSC2_TW_PIPES_NOTE } from "./pipes";

export { SSC2_TIME_WORK_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-tier-2-maths/time-work/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc2-tw-` here and `ssc2tw-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape-t2/time-work.ts). Order matches `subtopicOrder`.
 */
export const SSC2_TIME_WORK_NOTES: Record<string, SubtopicNote> = {
  "ssc2-tw-work": SSC2_TW_WORK_NOTE,
  "ssc2-tw-pipes": SSC2_TW_PIPES_NOTE,
};

export const SSC2_TIME_WORK_SLUGS = Object.keys(SSC2_TIME_WORK_NOTES);

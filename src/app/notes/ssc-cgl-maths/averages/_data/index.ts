import type { SubtopicNote } from "@/app/notes/_types";
import { SSC_AV_SUM_NOTE } from "./sum";
import { SSC_AV_CHANGE_NOTE } from "./change";
import { SSC_AV_REPLACE_NOTE } from "./replace";
import { SSC_AV_PARTS_NOTE } from "./parts";
import { SSC_AV_WEIGHTED_NOTE } from "./weighted";
import { SSC_AV_SEQUENCES_NOTE } from "./sequences";

export { SSC_AVERAGES_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-maths/averages/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc-av-` here and `sscav-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape/averages.ts). Order matches `subtopicOrder`.
 */
export const SSC_AVERAGES_NOTES: Record<string, SubtopicNote> = {
  "ssc-av-sum": SSC_AV_SUM_NOTE,
  "ssc-av-change": SSC_AV_CHANGE_NOTE,
  "ssc-av-replace": SSC_AV_REPLACE_NOTE,
  "ssc-av-parts": SSC_AV_PARTS_NOTE,
  "ssc-av-weighted": SSC_AV_WEIGHTED_NOTE,
  "ssc-av-sequences": SSC_AV_SEQUENCES_NOTE,
};

export const SSC_AVERAGES_SLUGS = Object.keys(SSC_AVERAGES_NOTES);

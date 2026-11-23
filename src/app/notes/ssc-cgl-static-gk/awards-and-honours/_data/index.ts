import type { SubtopicNote } from "@/app/notes/_types";
import { SSC_SAW_NATIONAL_NOTE } from "./national";
import { SSC_SAW_STATE_NOTE } from "./state";
import { SSC_SAW_GLOBAL_NOTE } from "./global";

export { SSC_AWARDS_AND_HONOURS_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-static-gk/awards-and-honours/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc-saw-` here and `sscsaw-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape/awards-and-honours.ts). Order matches `subtopicOrder`.
 */
export const SSC_AWARDS_AND_HONOURS_NOTES: Record<string, SubtopicNote> = {
  "ssc-saw-national": SSC_SAW_NATIONAL_NOTE,
  "ssc-saw-state": SSC_SAW_STATE_NOTE,
  "ssc-saw-global": SSC_SAW_GLOBAL_NOTE,
};

export const SSC_AWARDS_AND_HONOURS_SLUGS = Object.keys(SSC_AWARDS_AND_HONOURS_NOTES);

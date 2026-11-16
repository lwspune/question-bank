import type { SubtopicNote } from "@/app/notes/_types";
import { SSC2_COS_OS_NOTE } from "./os";

export { SSC2_OPERATING_SYSTEM_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-tier-2-computer/operating-system/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc2-cos-` here and `ssc2cos-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape-t2/operating-system.ts). Order matches `subtopicOrder`.
 */
export const SSC2_OPERATING_SYSTEM_NOTES: Record<string, SubtopicNote> = {
  "ssc2-cos-os": SSC2_COS_OS_NOTE,
};

export const SSC2_OPERATING_SYSTEM_SLUGS = Object.keys(SSC2_OPERATING_SYSTEM_NOTES);

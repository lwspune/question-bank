import type { SubtopicNote } from "@/app/notes/_types";
import { SSC2_CHW_HW_NOTE } from "./hw";

export { SSC2_HARDWARE_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-tier-2-computer/hardware/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc2-chw-` here and `ssc2chw-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape-t2/hardware.ts). Order matches `subtopicOrder`.
 */
export const SSC2_HARDWARE_NOTES: Record<string, SubtopicNote> = {
  "ssc2-chw-hw": SSC2_CHW_HW_NOTE,
};

export const SSC2_HARDWARE_SLUGS = Object.keys(SSC2_HARDWARE_NOTES);

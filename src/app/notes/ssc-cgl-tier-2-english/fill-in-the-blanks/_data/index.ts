import type { SubtopicNote } from "@/app/notes/_types";
import { SSC2_EFB_BLANKS_NOTE } from "./blanks";

export { SSC2_FILL_IN_THE_BLANKS_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-tier-2-english/fill-in-the-blanks/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc2-efb-` here and `ssc2efb-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape-t2/fill-in-the-blanks.ts). Order matches `subtopicOrder`.
 */
export const SSC2_FILL_IN_THE_BLANKS_NOTES: Record<string, SubtopicNote> = {
  "ssc2-efb-blanks": SSC2_EFB_BLANKS_NOTE,
};

export const SSC2_FILL_IN_THE_BLANKS_SLUGS = Object.keys(SSC2_FILL_IN_THE_BLANKS_NOTES);

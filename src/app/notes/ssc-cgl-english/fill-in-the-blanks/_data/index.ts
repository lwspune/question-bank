import type { SubtopicNote } from "@/app/notes/_types";
import { SSC_EFB_BLANKS_NOTE } from "./blanks";

export { SSC_FILL_IN_THE_BLANKS_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-english/fill-in-the-blanks/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc-efb-` here and `sscefb-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape/fill-in-the-blanks.ts). Order matches `subtopicOrder`.
 */
export const SSC_FILL_IN_THE_BLANKS_NOTES: Record<string, SubtopicNote> = {
  "ssc-efb-blanks": SSC_EFB_BLANKS_NOTE,
};

export const SSC_FILL_IN_THE_BLANKS_SLUGS = Object.keys(SSC_FILL_IN_THE_BLANKS_NOTES);

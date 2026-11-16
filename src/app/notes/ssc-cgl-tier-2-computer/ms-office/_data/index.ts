import type { SubtopicNote } from "@/app/notes/_types";
import { SSC2_CMS_OFFICE_NOTE } from "./office";

export { SSC2_MS_OFFICE_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-tier-2-computer/ms-office/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc2-cms-` here and `ssc2cms-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape-t2/ms-office.ts). Order matches `subtopicOrder`.
 */
export const SSC2_MS_OFFICE_NOTES: Record<string, SubtopicNote> = {
  "ssc2-cms-office": SSC2_CMS_OFFICE_NOTE,
};

export const SSC2_MS_OFFICE_SLUGS = Object.keys(SSC2_MS_OFFICE_NOTES);

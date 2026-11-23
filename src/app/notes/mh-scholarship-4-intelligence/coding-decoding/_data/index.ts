import type { SubtopicNote } from "@/app/notes/_types";
import { MS4_CD_TABLES_NOTE } from "./tables";
import { MS4_CD_NUMBERS_NOTE } from "./numbers";

export { MS4_CODING_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/mh-scholarship-4-intelligence/coding-decoding/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ms4-cd-` here and `ms4cd-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/mh-scholarship/notes/plans/4cd.ts). Order matches `subtopicOrder`.
 */
export const MS4_CODING_NOTES: Record<string, SubtopicNote> = {
  "ms4-cd-tables": MS4_CD_TABLES_NOTE,
  "ms4-cd-numbers": MS4_CD_NUMBERS_NOTE,
};

export const MS4_CODING_SLUGS = Object.keys(MS4_CODING_NOTES);

import type { SubtopicNote } from "@/app/notes/_types";
import { MS4_NU_PLACE_NOTE } from "./place";
import { MS4_NU_PATTERNS_NOTE } from "./patterns";

export { MS4_NUMBERS_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/mh-scholarship-4-maths/numbers-number-system/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ms4-nu-` here and `ms4nu-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/mh-scholarship/notes/plans/4nu.ts). Order matches `subtopicOrder`.
 */
export const MS4_NUMBERS_NOTES: Record<string, SubtopicNote> = {
  "ms4-nu-place": MS4_NU_PLACE_NOTE,
  "ms4-nu-patterns": MS4_NU_PATTERNS_NOTE,
};

export const MS4_NUMBERS_SLUGS = Object.keys(MS4_NUMBERS_NOTES);

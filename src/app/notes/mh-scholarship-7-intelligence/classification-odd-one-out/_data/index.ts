import type { SubtopicNote } from "@/app/notes/_types";
import { MS7_CL_WORDS_NOTE } from "./words";
import { MS7_CL_LETTERS_NOTE } from "./letters";

export { MS7_ODD_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/mh-scholarship-7-intelligence/classification-odd-one-out/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ms7-cl-` here and `ms7cl-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/mh-scholarship/notes/plans/7cl.ts). Order matches `subtopicOrder`.
 */
export const MS7_ODD_NOTES: Record<string, SubtopicNote> = {
  "ms7-cl-words": MS7_CL_WORDS_NOTE,
  "ms7-cl-letters": MS7_CL_LETTERS_NOTE,
};

export const MS7_ODD_SLUGS = Object.keys(MS7_ODD_NOTES);

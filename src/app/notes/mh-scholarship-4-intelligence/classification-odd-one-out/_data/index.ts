import type { SubtopicNote } from "@/app/notes/_types";
import { MS4_CL_WORDS_NOTE } from "./words";
import { MS4_CL_LETTERS_NOTE } from "./letters";

export { MS4_ODD_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/mh-scholarship-4-intelligence/classification-odd-one-out/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ms4-cl-` here and `ms4cl-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/mh-scholarship/notes/plans/4cl.ts). Order matches `subtopicOrder`.
 */
export const MS4_ODD_NOTES: Record<string, SubtopicNote> = {
  "ms4-cl-words": MS4_CL_WORDS_NOTE,
  "ms4-cl-letters": MS4_CL_LETTERS_NOTE,
};

export const MS4_ODD_SLUGS = Object.keys(MS4_ODD_NOTES);

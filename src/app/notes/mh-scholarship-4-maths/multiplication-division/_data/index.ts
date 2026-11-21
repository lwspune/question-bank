import type { SubtopicNote } from "@/app/notes/_types";
import { MS4_MD_DIVISION_NOTE } from "./division";
import { MS4_MD_PROBLEMS_NOTE } from "./problems";

export { MS4_MULDIV_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/mh-scholarship-4-maths/multiplication-division/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ms4-md-` here and `ms4md-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/mh-scholarship/notes/plans/4md.ts). Order matches `subtopicOrder`.
 */
export const MS4_MULDIV_NOTES: Record<string, SubtopicNote> = {
  "ms4-md-division": MS4_MD_DIVISION_NOTE,
  "ms4-md-problems": MS4_MD_PROBLEMS_NOTE,
};

export const MS4_MULDIV_SLUGS = Object.keys(MS4_MULDIV_NOTES);

import type { SubtopicNote } from "@/app/notes/_types";
import { MS7_AL_IDENTITIES_NOTE } from "./identities";
import { MS7_AL_FACTORS_NOTE } from "./factors";

export { MS7_ALGEBRA_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/mh-scholarship-7-maths/algebraic-expressions/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ms7-al-` here and `ms7al-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/mh-scholarship/notes/plans/7al.ts). Order matches `subtopicOrder`.
 */
export const MS7_ALGEBRA_NOTES: Record<string, SubtopicNote> = {
  "ms7-al-identities": MS7_AL_IDENTITIES_NOTE,
  "ms7-al-factors": MS7_AL_FACTORS_NOTE,
};

export const MS7_ALGEBRA_SLUGS = Object.keys(MS7_ALGEBRA_NOTES);

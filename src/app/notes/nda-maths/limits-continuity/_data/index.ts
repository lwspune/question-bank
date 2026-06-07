import type { SubtopicNote } from "@/app/notes/_types";
import { EVALUATION_NOTE } from "./evaluation";
import { ONE_SIDED_SPECIAL_NOTE } from "./one-sided-special";
import { CONTINUITY_NOTE } from "./continuity";

export { LIMITS_CONTINUITY_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/nda-maths/limits-continuity/[subtopicSlug].
 * Keys are globally-unique subtopic slugs (`lim-` prefixed) — also the
 * subtopic_slug in question_concept_tags. Order = chapter teaching order
 * (evaluation → one-sided/special → continuity).
 */
export const LIMITS_CONTINUITY_NOTES: Record<string, SubtopicNote> = {
  "lim-evaluation": EVALUATION_NOTE,
  "lim-one-sided-special": ONE_SIDED_SPECIAL_NOTE,
  "lim-continuity": CONTINUITY_NOTE,
};

export const LIMITS_CONTINUITY_SLUGS = Object.keys(LIMITS_CONTINUITY_NOTES);

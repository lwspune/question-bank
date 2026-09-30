import type { SubtopicNote } from "@/app/notes/_types";
import { QUADRATIC_TEQ_NOTE } from "./quadratic";
import { FACTORISE_TEQ_NOTE } from "./factorise";
import { RANGE_TEQ_NOTE } from "./range";
import { NONSTANDARD_TEQ_NOTE } from "./nonstandard";

export { JEE_TRIG_EQUATIONS_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/jee-mains-maths/trigonometric-equations/[subtopicSlug].
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is
 * GLOBALLY unique across NOTES_CHAPTERS — hence `jee-teq-` here and `jteq-` on
 * concept slugs.
 */
export const JEE_TRIG_EQUATIONS_NOTES: Record<string, SubtopicNote> = {
  "jee-teq-quadratic": QUADRATIC_TEQ_NOTE,
  "jee-teq-factorise": FACTORISE_TEQ_NOTE,
  "jee-teq-range": RANGE_TEQ_NOTE,
  "jee-teq-nonstandard": NONSTANDARD_TEQ_NOTE,
};

export const JEE_TRIG_EQUATIONS_SLUGS = Object.keys(JEE_TRIG_EQUATIONS_NOTES);

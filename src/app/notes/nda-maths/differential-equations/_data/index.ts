import type { SubtopicNote } from "@/app/notes/_types";
import { ORDER_DEGREE_NOTE } from "./order-degree";
import { FORMATION_NOTE } from "./formation";
import { SOLVING_NOTE } from "./solving";

export { DIFFERENTIAL_EQUATIONS_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/nda-maths/differential-equations/[subtopicSlug].
 * Keys are GLOBALLY-unique (`defeq-` prefixed) because they double as the
 * question_concept_tags subtopic_slug; chapter.subtopicOrder owns render order
 * (taught order/degree → formation → solving, not the bank's count order which
 * leads with Solving).
 */
export const DIFFERENTIAL_EQUATIONS_NOTES: Record<string, SubtopicNote> = {
  "defeq-order-degree": ORDER_DEGREE_NOTE,
  "defeq-formation": FORMATION_NOTE,
  "defeq-solving": SOLVING_NOTE,
};

export const DIFFERENTIAL_EQUATIONS_SLUGS = Object.keys(DIFFERENTIAL_EQUATIONS_NOTES);

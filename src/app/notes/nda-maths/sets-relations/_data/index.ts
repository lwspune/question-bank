import type { SubtopicNote } from "@/app/notes/_types";
import { OPERATIONS_NOTE } from "./operations";
import { COUNTING_NOTE } from "./counting";
import { RELATIONS_NOTE } from "./relations";

export { SETS_RELATIONS_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/nda-maths/sets-relations/[subtopicSlug].
 * Keys are GLOBALLY-unique (`sets-` prefixed) because they double as the
 * question_concept_tags subtopic_slug; chapter.subtopicOrder owns render order
 * (taught fundamentals → counting → relations, not the bank's count order).
 */
export const SETS_RELATIONS_NOTES: Record<string, SubtopicNote> = {
  "sets-operations": OPERATIONS_NOTE,
  "sets-counting": COUNTING_NOTE,
  "sets-relations": RELATIONS_NOTE,
};

export const SETS_RELATIONS_SLUGS = Object.keys(SETS_RELATIONS_NOTES);

import type { SubtopicNote } from "@/app/notes/_types";
import { TO_DECIMAL_CONVERSION_NOTE } from "./to-decimal-conversion";
import { ARITHMETIC_NOTE } from "./arithmetic";
import { REPRESENTATION_NUMBER_THEORY_NOTE } from "./representation-number-theory";

export { BINARY_NUMBERS_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for
 * /notes/nda-maths/binary-numbers/[subtopicSlug].
 * Keys are the URL slugs; chapter.subtopicOrder owns rendering order. The
 * `bin-` prefix keeps the subtopic slugs (and therefore the concept-tag keys)
 * globally unique.
 */
export const BINARY_NUMBERS_NOTES: Record<string, SubtopicNote> = {
  "bin-to-decimal-conversion": TO_DECIMAL_CONVERSION_NOTE,
  "bin-arithmetic": ARITHMETIC_NOTE,
  "bin-representation-number-theory": REPRESENTATION_NUMBER_THEORY_NOTE,
};

export const BINARY_NUMBERS_SLUGS = Object.keys(BINARY_NUMBERS_NOTES);

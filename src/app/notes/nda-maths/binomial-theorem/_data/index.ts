import type { SubtopicNote } from "@/app/notes/_types";
import { COEFFICIENTS_TERMS_NOTE } from "./coefficients-terms";
import { COEFFICIENT_SUMS_NOTE } from "./coefficient-sums";
import { INTEGER_FRACTIONAL_PARTS_NOTE } from "./integer-fractional-parts";
import { REMAINDERS_DIVISIBILITY_NOTE } from "./remainders-divisibility";

export { BINOMIAL_THEOREM_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/nda-maths/binomial-theorem/[subtopicSlug].
 * `bt-` prefix keeps the subtopic slugs (and concept-tag keys) globally unique.
 */
export const BINOMIAL_THEOREM_NOTES: Record<string, SubtopicNote> = {
  "bt-coefficients-terms": COEFFICIENTS_TERMS_NOTE,
  "bt-coefficient-sums": COEFFICIENT_SUMS_NOTE,
  "bt-integer-fractional-parts": INTEGER_FRACTIONAL_PARTS_NOTE,
  "bt-remainders-divisibility": REMAINDERS_DIVISIBILITY_NOTE,
};

export const BINOMIAL_THEOREM_SLUGS = Object.keys(BINOMIAL_THEOREM_NOTES);

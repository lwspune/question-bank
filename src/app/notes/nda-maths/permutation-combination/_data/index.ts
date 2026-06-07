import type { SubtopicNote } from "@/app/notes/_types";
import { FACTORIALS_COEFFICIENTS_NOTE } from "./factorials-coefficients";
import { ARRANGEMENTS_NOTE } from "./arrangements";
import { COMBINATIONS_NOTE } from "./combinations";
import { FORMING_NUMBERS_NOTE } from "./forming-numbers";
import { GEOMETRIC_COUNTING_NOTE } from "./geometric-counting";

export { PERMUTATION_COMBINATION_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/nda-maths/permutation-combination/[subtopicSlug].
 * Keys are globally-unique subtopic slugs (`pc-` prefixed) — also the
 * subtopic_slug in question_concept_tags. Order = chapter teaching order.
 */
export const PERMUTATION_COMBINATION_NOTES: Record<string, SubtopicNote> = {
  "pc-factorials-coefficients": FACTORIALS_COEFFICIENTS_NOTE,
  "pc-arrangements": ARRANGEMENTS_NOTE,
  "pc-combinations": COMBINATIONS_NOTE,
  "pc-forming-numbers": FORMING_NUMBERS_NOTE,
  "pc-geometric-counting": GEOMETRIC_COUNTING_NOTE,
};

export const PERMUTATION_COMBINATION_SLUGS = Object.keys(
  PERMUTATION_COMBINATION_NOTES
);

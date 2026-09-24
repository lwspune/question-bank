import type { SubtopicNote } from "@/app/notes/_types";
import { ALGEBRA_AND_CUBE_ROOTS_NOTE } from "./algebra-and-cube-roots";
import { MODULUS_ARGUMENT_POLAR_NOTE } from "./modulus-argument-polar";
import { LOCUS_NOTE } from "./locus";

export { MHTCET_COMPLEX_NUMBERS_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/mht-cet-maths/complex-numbers/[subtopicSlug].
 * `cetcn-` prefix: concept-tag keys are global and the NDA sibling owns `cn-`.
 */
export const MHTCET_COMPLEX_NUMBERS_NOTES: Record<string, SubtopicNote> = {
  "cetcn-algebra-and-cube-roots": ALGEBRA_AND_CUBE_ROOTS_NOTE,
  "cetcn-modulus-argument-polar": MODULUS_ARGUMENT_POLAR_NOTE,
  "cetcn-locus": LOCUS_NOTE,
};

export const MHTCET_COMPLEX_NUMBERS_SLUGS = Object.keys(MHTCET_COMPLEX_NUMBERS_NOTES);

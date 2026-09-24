import type { SubtopicNote } from "@/app/notes/_types";
import { DETERMINANTS_AND_ADJOINT_NOTE } from "./determinants-and-adjoint";
import { INVERSE_NOTE } from "./inverse";
import { CAYLEY_HAMILTON_NOTE } from "./cayley-hamilton";
import { LINEAR_SYSTEMS_AND_SYMMETRY_NOTE } from "./linear-systems-and-symmetry";

export { MHTCET_DETERMINANTS_MATRICES_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/mht-cet-maths/determinants-and-matrices/[subtopicSlug].
 * `cetdm-` prefix: concept-tag keys are global and the NDA sibling owns the
 * unprefixed matrices-determinants slugs.
 */
export const MHTCET_DETERMINANTS_MATRICES_NOTES: Record<string, SubtopicNote> = {
  "cetdm-determinants-and-adjoint": DETERMINANTS_AND_ADJOINT_NOTE,
  "cetdm-inverse": INVERSE_NOTE,
  "cetdm-cayley-hamilton": CAYLEY_HAMILTON_NOTE,
  "cetdm-linear-systems-and-symmetry": LINEAR_SYSTEMS_AND_SYMMETRY_NOTE,
};

export const MHTCET_DETERMINANTS_MATRICES_SLUGS = Object.keys(MHTCET_DETERMINANTS_MATRICES_NOTES);

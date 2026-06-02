import type { SubtopicNote } from "@/app/notes/_types";
import { MATRIX_OPERATIONS_NOTE } from "./matrix-operations";
import { SPECIAL_MATRICES_NOTE } from "./special-matrices";
import { DETERMINANTS_EVALUATION_PROPERTIES_NOTE } from "./determinants-evaluation-properties";
import { SPECIAL_DETERMINANTS_NOTE } from "./special-determinants";
import { COFACTORS_ADJOINT_INVERSE_NOTE } from "./cofactors-adjoint-inverse";
import { LINEAR_SYSTEMS_NOTE } from "./linear-systems";

export { MATRICES_DETERMINANTS_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/nda-maths/matrices-determinants/[subtopicSlug].
 * Keys must match the URL slug AND the subtopic_slug used in
 * question_concept_tags (globally unique across all chapters).
 */
export const MATRICES_DETERMINANTS_NOTES: Record<string, SubtopicNote> = {
  "matrix-operations": MATRIX_OPERATIONS_NOTE,
  "special-matrices": SPECIAL_MATRICES_NOTE,
  "determinants-evaluation-properties": DETERMINANTS_EVALUATION_PROPERTIES_NOTE,
  "special-determinants": SPECIAL_DETERMINANTS_NOTE,
  "cofactors-adjoint-inverse": COFACTORS_ADJOINT_INVERSE_NOTE,
  "linear-systems": LINEAR_SYSTEMS_NOTE,
};

export const MATRICES_DETERMINANTS_SLUGS = Object.keys(MATRICES_DETERMINANTS_NOTES);

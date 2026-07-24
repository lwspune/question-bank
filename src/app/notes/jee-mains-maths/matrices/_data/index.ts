import type { SubtopicNote } from "@/app/notes/_types";
import { MATRIX_ALGEBRA_NOTE } from "./matrix-algebra";
import { POWERS_CAYLEY_HAMILTON_NOTE } from "./powers-cayley-hamilton";
import { SYMMETRIC_ORTHOGONAL_NOTE } from "./symmetric-orthogonal";
import { ADJOINT_INVERSE_NOTE } from "./adjoint-inverse";

export { JEE_MATRICES_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/jee-mains-maths/matrices/[subtopicSlug].
 * Keys must match the URL slug AND the subtopic_slug used in
 * question_concept_tags (globally unique across all chapters — hence the
 * `jee-` prefix on the subtopic slugs and `jmat-` on concept slugs).
 */
export const JEE_MATRICES_NOTES: Record<string, SubtopicNote> = {
  "jee-matrix-algebra": MATRIX_ALGEBRA_NOTE,
  "jee-matrix-powers": POWERS_CAYLEY_HAMILTON_NOTE,
  "jee-symmetric-orthogonal": SYMMETRIC_ORTHOGONAL_NOTE,
  "jee-adjoint-inverse": ADJOINT_INVERSE_NOTE,
};

export const JEE_MATRICES_SLUGS = Object.keys(JEE_MATRICES_NOTES);

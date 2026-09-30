import type { SubtopicNote } from "@/app/notes/_types";
import { DOT_VEC_NOTE } from "./dot";
import { MAGNITUDE_VEC_NOTE } from "./magnitude";
import { CROSS_VEC_NOTE } from "./cross";
import { EQUATIONS_VEC_NOTE } from "./equations";
import { TRIPLE_VEC_NOTE } from "./triple";
import { GEOMETRY_VEC_NOTE } from "./geometry";

export { JEE_VECTOR_ALGEBRA_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/jee-mains-maths/vector-algebra/[subtopicSlug].
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is
 * GLOBALLY unique across NOTES_CHAPTERS — hence `jee-vec-` here and `jvec-` on
 * concept slugs.
 */
export const JEE_VECTOR_ALGEBRA_NOTES: Record<string, SubtopicNote> = {
  "jee-vec-dot": DOT_VEC_NOTE,
  "jee-vec-magnitude": MAGNITUDE_VEC_NOTE,
  "jee-vec-cross": CROSS_VEC_NOTE,
  "jee-vec-equations": EQUATIONS_VEC_NOTE,
  "jee-vec-triple": TRIPLE_VEC_NOTE,
  "jee-vec-geometry": GEOMETRY_VEC_NOTE,
};

export const JEE_VECTOR_ALGEBRA_SLUGS = Object.keys(JEE_VECTOR_ALGEBRA_NOTES);

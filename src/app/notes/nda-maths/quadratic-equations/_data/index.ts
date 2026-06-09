import type { SubtopicNote } from "@/app/notes/_types";
import { NATURE_OF_ROOTS_NOTE } from "./nature-of-roots";
import { VIETA_NOTE } from "./vieta";
import { SPECIAL_QUADRATICS_NOTE } from "./special-quadratics";

export { QUADRATIC_EQUATIONS_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for
 * /notes/nda-maths/quadratic-equations/[subtopicSlug].
 * Keys are the URL slugs; chapter.subtopicOrder owns rendering order. The
 * `qe-` prefix keeps the subtopic slugs (and therefore the concept-tag keys)
 * globally unique.
 */
export const QUADRATIC_EQUATIONS_NOTES: Record<string, SubtopicNote> = {
  "qe-nature-of-roots": NATURE_OF_ROOTS_NOTE,
  "qe-vieta-relations": VIETA_NOTE,
  "qe-special-quadratics": SPECIAL_QUADRATICS_NOTE,
};

export const QUADRATIC_EQUATIONS_SLUGS = Object.keys(QUADRATIC_EQUATIONS_NOTES);

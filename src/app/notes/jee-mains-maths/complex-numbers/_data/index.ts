import type { SubtopicNote } from "@/app/notes/_types";
import { ALGEBRA_CX_NOTE } from "./algebra";
import { POLAR_CX_NOTE } from "./polar";
import { UNITY_CX_NOTE } from "./unity";
import { QUADRATIC_CX_NOTE } from "./quadratic";
import { LINES_CIRCLES_CX_NOTE } from "./lines-circles";
import { ARCS_CX_NOTE } from "./arcs";
import { REGIONS_CX_NOTE } from "./regions";

export { JEE_COMPLEX_NUMBERS_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/jee-mains-maths/complex-numbers/[subtopicSlug].
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is
 * GLOBALLY unique across NOTES_CHAPTERS — hence `jee-cx-` here and `jcx-` on
 * concept slugs.
 */
export const JEE_COMPLEX_NUMBERS_NOTES: Record<string, SubtopicNote> = {
  "jee-cx-algebra": ALGEBRA_CX_NOTE,
  "jee-cx-polar": POLAR_CX_NOTE,
  "jee-cx-unity": UNITY_CX_NOTE,
  "jee-cx-quadratic": QUADRATIC_CX_NOTE,
  "jee-cx-lines-circles": LINES_CIRCLES_CX_NOTE,
  "jee-cx-arcs": ARCS_CX_NOTE,
  "jee-cx-regions": REGIONS_CX_NOTE,
};

export const JEE_COMPLEX_NUMBERS_SLUGS = Object.keys(JEE_COMPLEX_NUMBERS_NOTES);

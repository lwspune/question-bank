import type { SubtopicNote } from "@/app/notes/_types";
import { COMBINE_DET_NOTE } from "./combine";
import { CRAMER_DET_NOTE } from "./cramer";
import { NOSOLUTION_DET_NOTE } from "./nosolution";
import { CLASSIFY_DET_NOTE } from "./classify";
import { HOMOGENEOUS_DET_NOTE } from "./homogeneous";
import { ADJOINT_DET_NOTE } from "./adjoint";
import { OPERATIONS_DET_NOTE } from "./operations";
import { FUNCTIONS_DET_NOTE } from "./functions";

export { JEE_DETERMINANTS_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/jee-mains-maths/determinants/[subtopicSlug].
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is
 * GLOBALLY unique across NOTES_CHAPTERS — hence `jee-det-` here and `jdet-` on
 * concept slugs.
 */
export const JEE_DETERMINANTS_NOTES: Record<string, SubtopicNote> = {
  "jee-det-inf-combine": COMBINE_DET_NOTE,
  "jee-det-inf-cramer": CRAMER_DET_NOTE,
  "jee-det-no-solution": NOSOLUTION_DET_NOTE,
  "jee-det-classify": CLASSIFY_DET_NOTE,
  "jee-det-homogeneous": HOMOGENEOUS_DET_NOTE,
  "jee-det-adjoint": ADJOINT_DET_NOTE,
  "jee-det-operations": OPERATIONS_DET_NOTE,
  "jee-det-functions": FUNCTIONS_DET_NOTE,
};

export const JEE_DETERMINANTS_SLUGS = Object.keys(JEE_DETERMINANTS_NOTES);

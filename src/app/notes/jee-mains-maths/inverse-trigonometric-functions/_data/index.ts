import type { SubtopicNote } from "@/app/notes/_types";
import { PRINCIPAL_ITF_NOTE } from "./principal";
import { VALUES_ITF_NOTE } from "./values";
import { SIMPLIFY_ITF_NOTE } from "./simplify";
import { SERIES_ITF_NOTE } from "./series";
import { EQUATIONS_ITF_NOTE } from "./equations";

export { JEE_ITF_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/jee-mains-maths/inverse-trigonometric-functions/[subtopicSlug].
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is
 * GLOBALLY unique across NOTES_CHAPTERS — hence `jee-itf-` here and `jitf-` on
 * concept slugs.
 */
export const JEE_ITF_NOTES: Record<string, SubtopicNote> = {
  "jee-itf-principal": PRINCIPAL_ITF_NOTE,
  "jee-itf-values": VALUES_ITF_NOTE,
  "jee-itf-simplify": SIMPLIFY_ITF_NOTE,
  "jee-itf-series": SERIES_ITF_NOTE,
  "jee-itf-equations": EQUATIONS_ITF_NOTE,
};

export const JEE_ITF_SLUGS = Object.keys(JEE_ITF_NOTES);

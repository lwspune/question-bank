import type { SubtopicNote } from "@/app/notes/_types";
import { SETS_FN_NOTE } from "./sets";
import { RELATION_TYPES_FN_NOTE } from "./relation-types";
import { RELATION_COUNT_FN_NOTE } from "./relation-count";
import { DOMAIN_FN_NOTE } from "./domain";
import { RANGE_FN_NOTE } from "./range";
import { COUNT_FN_NOTE } from "./count";
import { COMPOSITION_FN_NOTE } from "./composition";
import { EQUATIONS_FN_NOTE } from "./equations";

export { JEE_FUNCTIONS_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/jee-mains-maths/relations-and-functions/[subtopicSlug].
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is
 * GLOBALLY unique across NOTES_CHAPTERS — hence `jee-fn-` here and `jfn-` on
 * concept slugs.
 */
export const JEE_FUNCTIONS_NOTES: Record<string, SubtopicNote> = {
  "jee-fn-sets": SETS_FN_NOTE,
  "jee-fn-relation-types": RELATION_TYPES_FN_NOTE,
  "jee-fn-relation-count": RELATION_COUNT_FN_NOTE,
  "jee-fn-domain": DOMAIN_FN_NOTE,
  "jee-fn-range": RANGE_FN_NOTE,
  "jee-fn-count": COUNT_FN_NOTE,
  "jee-fn-composition": COMPOSITION_FN_NOTE,
  "jee-fn-equations": EQUATIONS_FN_NOTE,
};

export const JEE_FUNCTIONS_SLUGS = Object.keys(JEE_FUNCTIONS_NOTES);

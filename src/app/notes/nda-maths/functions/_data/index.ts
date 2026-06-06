import type { SubtopicNote } from "@/app/notes/_types";
import { FUNCTIONS_DEFINITION_CLASSIFICATION_NOTE } from "./definition-classification";
import { FUNCTIONS_DOMAIN_RANGE_NOTE } from "./domain-range-properties";
import { FUNCTIONS_COMPOSITION_INVERSE_NOTE } from "./composition-inverse";
import { FUNCTIONS_GREATEST_INTEGER_NOTE } from "./greatest-integer";
import { FUNCTIONS_FUNCTIONAL_EQUATIONS_NOTE } from "./functional-equations";

export { FUNCTIONS_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/nda-maths/functions/[subtopicSlug].
 * Keys must match the URL slug AND the subtopic_slug used in
 * question_concept_tags (globally unique across all chapters — `funcs-` prefixed).
 * Order matches the chapter's teaching order (subtopicOrder).
 */
export const FUNCTIONS_NOTES: Record<string, SubtopicNote> = {
  "funcs-definition-classification": FUNCTIONS_DEFINITION_CLASSIFICATION_NOTE,
  "funcs-domain-range-properties": FUNCTIONS_DOMAIN_RANGE_NOTE,
  "funcs-composition-inverse": FUNCTIONS_COMPOSITION_INVERSE_NOTE,
  "funcs-greatest-integer": FUNCTIONS_GREATEST_INTEGER_NOTE,
  "funcs-functional-equations": FUNCTIONS_FUNCTIONAL_EQUATIONS_NOTE,
};

export const FUNCTIONS_SLUGS = Object.keys(FUNCTIONS_NOTES);

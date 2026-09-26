import type { SubtopicNote } from "@/app/notes/_types";
import { TRIG_EQUATIONS_NOTE } from "./equations";
import { TRIANGLE_RULES_NOTE } from "./triangle-rules";
import { TRIANGLE_HALF_ANGLE_NOTE } from "./triangle-half-angle";
import { INVERSE_VALUES_NOTE } from "./inverse-values";
import { INVERSE_IDENTITIES_NOTE } from "./inverse-identities";
import { INVERSE_EQUATIONS_NOTE } from "./inverse-equations";

export { MHTCET_TRIG_FUNCTIONS_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/mht-cet-maths/trigonometric-functions/[subtopicSlug].
 * Keys must match the URL slug; chapter.subtopicOrder owns rendering order.
 * `cettf-` prefix: the slug doubles as the concept-tag key, which is global.
 */
export const MHTCET_TRIG_FUNCTIONS_NOTES: Record<string, SubtopicNote> = {
  "cettf-equations": TRIG_EQUATIONS_NOTE,
  "cettf-triangle-rules": TRIANGLE_RULES_NOTE,
  "cettf-triangle-half-angle": TRIANGLE_HALF_ANGLE_NOTE,
  "cettf-inverse-values": INVERSE_VALUES_NOTE,
  "cettf-inverse-identities": INVERSE_IDENTITIES_NOTE,
  "cettf-inverse-equations": INVERSE_EQUATIONS_NOTE,
};

export const MHTCET_TRIG_FUNCTIONS_SLUGS = Object.keys(MHTCET_TRIG_FUNCTIONS_NOTES);

import type { SubtopicNote } from "@/app/notes/_types";
import { EVALUATION_AND_SUBSTITUTION_NOTE } from "./evaluation-and-substitution";
import { TRIGONOMETRIC_DEFINITE_INTEGRALS_NOTE } from "./trigonometric-integrals";
import { ODD_EVEN_SYMMETRY_NOTE } from "./odd-even-symmetry";
import { KINGS_PROPERTY_NOTE } from "./kings-property";
import { MODULUS_AND_GREATEST_INTEGER_NOTE } from "./modulus-and-greatest-integer";

export { MHTCET_DEFINITE_INTEGRATION_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/mht-cet-maths/definite-integration/[subtopicSlug].
 * Keys must match the URL slug; chapter.subtopicOrder owns rendering order.
 * `cetdi-` prefix: concept-tag keys are global and the NDA sibling owns `defint-`.
 */
export const MHTCET_DEFINITE_INTEGRATION_NOTES: Record<string, SubtopicNote> = {
  "cetdi-evaluation-and-substitution": EVALUATION_AND_SUBSTITUTION_NOTE,
  "cetdi-trigonometric-integrals": TRIGONOMETRIC_DEFINITE_INTEGRALS_NOTE,
  "cetdi-odd-even-symmetry": ODD_EVEN_SYMMETRY_NOTE,
  "cetdi-kings-property": KINGS_PROPERTY_NOTE,
  "cetdi-modulus-and-greatest-integer": MODULUS_AND_GREATEST_INTEGER_NOTE,
};

export const MHTCET_DEFINITE_INTEGRATION_SLUGS = Object.keys(MHTCET_DEFINITE_INTEGRATION_NOTES);

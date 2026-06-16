import type { SubtopicNote } from "@/app/notes/_types";
import { FOUNDATIONS_CHAIN_NOTE } from "./foundations-chain";
import { LOGARITHMIC_NOTE } from "./logarithmic";
import { IMPLICIT_SPECIAL_NOTE } from "./implicit-special";
import { INVERSE_FUNCTIONS_NOTE } from "./inverse-functions";
import { PARAMETRIC_HIGHER_NOTE } from "./parametric-higher";
import { DERIVATIVE_WRT_NOTE } from "./derivative-wrt";

export { DIFFERENTIATION_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for
 * /notes/mht-cet-maths/differentiation/[subtopicSlug].
 * Keys must match the URL slug; chapter.subtopicOrder owns rendering order.
 */
export const DIFFERENTIATION_NOTES: Record<string, SubtopicNote> = {
  "foundations-chain": FOUNDATIONS_CHAIN_NOTE,
  "logarithmic": LOGARITHMIC_NOTE,
  "implicit-special": IMPLICIT_SPECIAL_NOTE,
  "inverse-functions": INVERSE_FUNCTIONS_NOTE,
  "parametric-higher": PARAMETRIC_HIGHER_NOTE,
  "derivative-wrt": DERIVATIVE_WRT_NOTE,
};

export const DIFFERENTIATION_SLUGS = Object.keys(DIFFERENTIATION_NOTES);

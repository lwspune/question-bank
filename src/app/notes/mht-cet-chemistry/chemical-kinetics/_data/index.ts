import type { SubtopicNote } from "@/app/notes/_types";
import { RATE_AND_STOICHIOMETRY_NOTE } from "./cetkin-rate-and-stoichiometry";
import { RATE_LAW_AND_ORDER_NOTE } from "./cetkin-rate-law-and-order";
import { ZERO_ORDER_NOTE } from "./cetkin-zero-order";
import { FIRST_ORDER_NOTE } from "./cetkin-first-order";
import { MECHANISM_NOTE } from "./cetkin-mechanism";
import { ARRHENIUS_NOTE } from "./cetkin-arrhenius";

export { MHTCET_KINETICS_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/mht-cet-chemistry/chemical-kinetics/[subtopicSlug].
 * `cetkin-` prefix: concept-tag keys are global.
 */
export const MHTCET_KINETICS_NOTES: Record<string, SubtopicNote> = {
  "cetkin-rate-and-stoichiometry": RATE_AND_STOICHIOMETRY_NOTE,
  "cetkin-rate-law-and-order": RATE_LAW_AND_ORDER_NOTE,
  "cetkin-zero-order": ZERO_ORDER_NOTE,
  "cetkin-first-order": FIRST_ORDER_NOTE,
  "cetkin-mechanism": MECHANISM_NOTE,
  "cetkin-arrhenius": ARRHENIUS_NOTE,
};

export const MHTCET_KINETICS_SLUGS = Object.keys(MHTCET_KINETICS_NOTES);

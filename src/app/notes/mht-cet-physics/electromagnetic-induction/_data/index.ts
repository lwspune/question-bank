import type { SubtopicNote } from "@/app/notes/_types";
import { FARADAY_LENZ_NOTE } from "./cetp-emi-faraday-lenz";
import { MOTIONAL_NOTE } from "./cetp-emi-motional";
import { SELF_INDUCTANCE_NOTE } from "./cetp-emi-self-inductance";
import { MUTUAL_NOTE } from "./cetp-emi-mutual";

export { MHTCET_EMI_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/mht-cet-physics/electromagnetic-induction/[subtopicSlug].
 * `cetp-emi-` prefix: concept-tag keys are global.
 */
export const MHTCET_EMI_NOTES: Record<string, SubtopicNote> = {
  "cetp-emi-faraday-lenz": FARADAY_LENZ_NOTE,
  "cetp-emi-motional": MOTIONAL_NOTE,
  "cetp-emi-self-inductance": SELF_INDUCTANCE_NOTE,
  "cetp-emi-mutual": MUTUAL_NOTE,
};

export const MHTCET_EMI_SLUGS = Object.keys(MHTCET_EMI_NOTES);

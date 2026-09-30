import type { SubtopicNote } from "@/app/notes/_types";
import { JEE_CH_KIN_RATE_NOTE } from "./rate";
import { JEE_CH_KIN_RATE_LAW_NOTE } from "./rate-law";
import { JEE_CH_KIN_FIRST_ORDER_NOTE } from "./first-order";
import { JEE_CH_KIN_GAS_DECAY_NOTE } from "./gas-decay";
import { JEE_CH_KIN_ZERO_ORDER_NOTE } from "./zero-order";
import { JEE_CH_KIN_ARRHENIUS_NOTE } from "./arrhenius";
import { JEE_CH_KIN_MECHANISM_NOTE } from "./mechanism";

export { JEE_CH_KIN_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/jee-mains-chemistry/chemical-kinetics/[subtopicSlug].
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is
 * GLOBALLY unique across NOTES_CHAPTERS — hence `jch-kin-` here and `jckin-` on
 * concept slugs.
 */
export const JEE_CH_KIN_NOTES: Record<string, SubtopicNote> = {
  "jch-kin-rate": JEE_CH_KIN_RATE_NOTE,
  "jch-kin-rate-law": JEE_CH_KIN_RATE_LAW_NOTE,
  "jch-kin-first-order": JEE_CH_KIN_FIRST_ORDER_NOTE,
  "jch-kin-gas-decay": JEE_CH_KIN_GAS_DECAY_NOTE,
  "jch-kin-zero-order": JEE_CH_KIN_ZERO_ORDER_NOTE,
  "jch-kin-arrhenius": JEE_CH_KIN_ARRHENIUS_NOTE,
  "jch-kin-mechanism": JEE_CH_KIN_MECHANISM_NOTE,
};

export const JEE_CH_KIN_SLUGS = Object.keys(JEE_CH_KIN_NOTES);

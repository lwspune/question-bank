import type { SubtopicNote } from "@/app/notes/_types";
import { AC_BASICS_NOTE } from "./cetp-ac-basics";
import { REACTANCE_NOTE } from "./cetp-reactance";
import { LCR_IMPEDANCE_NOTE } from "./cetp-lcr-impedance";
import { RESONANCE_NOTE } from "./cetp-resonance";
import { AC_POWER_NOTE } from "./cetp-ac-power";
import { LC_TRANSFORMER_NOTE } from "./cetp-lc-transformer";

export { MHTCET_AC_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/mht-cet-physics/ac-circuits/[subtopicSlug].
 * `cetp-` prefix: concept-tag keys are global.
 */
export const MHTCET_AC_NOTES: Record<string, SubtopicNote> = {
  "cetp-ac-basics": AC_BASICS_NOTE,
  "cetp-reactance": REACTANCE_NOTE,
  "cetp-lcr-impedance": LCR_IMPEDANCE_NOTE,
  "cetp-resonance": RESONANCE_NOTE,
  "cetp-ac-power": AC_POWER_NOTE,
  "cetp-lc-transformer": LC_TRANSFORMER_NOTE,
};

export const MHTCET_AC_SLUGS = Object.keys(MHTCET_AC_NOTES);

import type { SubtopicNote } from "@/app/notes/_types";
import { BAND_THEORY_NOTE } from "./cetp-band-theory";
import { PN_JUNCTION_NOTE } from "./cetp-pn-junction";
import { DIODE_CIRCUITS_NOTE } from "./cetp-diode-circuits";
import { SPECIAL_DIODES_NOTE } from "./cetp-special-diodes";
import { TRANSISTORS_NOTE } from "./cetp-transistors";
import { LOGIC_GATES_NOTE } from "./cetp-logic-gates";

export { MHTCET_SEMI_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/mht-cet-physics/semiconductor-devices/[subtopicSlug].
 * `cetp-` prefix: concept-tag keys are global.
 */
export const MHTCET_SEMI_NOTES: Record<string, SubtopicNote> = {
  "cetp-band-theory": BAND_THEORY_NOTE,
  "cetp-pn-junction": PN_JUNCTION_NOTE,
  "cetp-diode-circuits": DIODE_CIRCUITS_NOTE,
  "cetp-special-diodes": SPECIAL_DIODES_NOTE,
  "cetp-transistors": TRANSISTORS_NOTE,
  "cetp-logic-gates": LOGIC_GATES_NOTE,
};

export const MHTCET_SEMI_SLUGS = Object.keys(MHTCET_SEMI_NOTES);

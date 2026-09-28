import type { SubtopicNote } from "@/app/notes/_types";
import { GAS_LAWS_NOTE } from "./cetp-kt-gas-laws";
import { KINETIC_NOTE } from "./cetp-kt-kinetic";
import { EQUIPARTITION_NOTE } from "./cetp-kt-equipartition";

export { MHTCET_KTG_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/mht-cet-physics/kinetic-theory-of-gases/[subtopicSlug].
 * `cetp-kt-` prefix: concept-tag keys are global.
 */
export const MHTCET_KTG_NOTES: Record<string, SubtopicNote> = {
  "cetp-kt-gas-laws": GAS_LAWS_NOTE,
  "cetp-kt-kinetic": KINETIC_NOTE,
  "cetp-kt-equipartition": EQUIPARTITION_NOTE,
};

export const MHTCET_KTG_SLUGS = Object.keys(MHTCET_KTG_NOTES);

import type { SubtopicNote } from "@/app/notes/_types";
import { FIRST_LAW_NOTE } from "./cetp-td-first-law";
import { PROCESSES_NOTE } from "./cetp-td-processes";
import { CARNOT_NOTE } from "./cetp-td-carnot";

export { MHTCET_THERMO_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/mht-cet-physics/thermodynamics/[subtopicSlug].
 * `cetp-td-` prefix: concept-tag keys are global.
 */
export const MHTCET_THERMO_NOTES: Record<string, SubtopicNote> = {
  "cetp-td-first-law": FIRST_LAW_NOTE,
  "cetp-td-processes": PROCESSES_NOTE,
  "cetp-td-carnot": CARNOT_NOTE,
};

export const MHTCET_THERMO_SLUGS = Object.keys(MHTCET_THERMO_NOTES);

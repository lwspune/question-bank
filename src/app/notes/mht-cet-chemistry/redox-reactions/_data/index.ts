import type { SubtopicNote } from "@/app/notes/_types";
import { OXIDATION_NUMBER_NOTE } from "./cetrdx-oxidation-number";
import { BALANCING_REDOX_NOTE } from "./cetrdx-balancing-redox";
import { AGENTS_AND_OXIDES_NOTE } from "./cetrdx-agents-and-oxides";

export { MHTCET_REDOX_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/mht-cet-chemistry/redox-reactions/[subtopicSlug].
 * `cetrdx-` prefix: concept-tag keys are global.
 */
export const MHTCET_REDOX_NOTES: Record<string, SubtopicNote> = {
  "cetrdx-oxidation-number": OXIDATION_NUMBER_NOTE,
  "cetrdx-balancing-redox": BALANCING_REDOX_NOTE,
  "cetrdx-agents-and-oxides": AGENTS_AND_OXIDES_NOTE,
};

export const MHTCET_REDOX_SLUGS = Object.keys(MHTCET_REDOX_NOTES);

import type { SubtopicNote } from "@/app/notes/_types";
import { FUNDAMENTALS_NOTE } from "./fundamentals";
import { ARRANGEMENTS_WITH_CONSTRAINTS_NOTE } from "./arrangements-with-constraints";
import { SELECTIONS_WITH_CONDITIONS_NOTE } from "./selections-with-conditions";
import { CIRCULAR_ARRANGEMENTS_NOTE } from "./circular-arrangements";
import { COUNTING_NUMBERS_AND_FIGURES_NOTE } from "./counting-numbers-and-figures";

export { MHTCET_PNC_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/mht-cet-maths/permutations-and-combinations/[subtopicSlug].
 * `cetpc-` prefix: concept-tag keys are global and the NDA sibling owns `pc-`.
 */
export const MHTCET_PNC_NOTES: Record<string, SubtopicNote> = {
  "cetpc-fundamentals": FUNDAMENTALS_NOTE,
  "cetpc-arrangements-with-constraints": ARRANGEMENTS_WITH_CONSTRAINTS_NOTE,
  "cetpc-selections-with-conditions": SELECTIONS_WITH_CONDITIONS_NOTE,
  "cetpc-circular-arrangements": CIRCULAR_ARRANGEMENTS_NOTE,
  "cetpc-counting-numbers-and-figures": COUNTING_NUMBERS_AND_FIGURES_NOTE,
};

export const MHTCET_PNC_SLUGS = Object.keys(MHTCET_PNC_NOTES);

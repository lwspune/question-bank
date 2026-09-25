import type { SubtopicNote } from "@/app/notes/_types";
import { NOMENCLATURE_NOTE } from "./cetald-nomenclature";
import { PREPARATION_NOTE } from "./cetald-preparation";
import { NUCLEOPHILIC_ADDITION_NOTE } from "./cetald-nucleophilic-addition";
import { REDOX_AND_TESTS_NOTE } from "./cetald-redox-and-tests";
import { CARBOXYLIC_ACIDS_NOTE } from "./cetald-carboxylic-acids";

export { MHTCET_CARBONYL_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/mht-cet-chemistry/aldehydes-ketones-and-carboxylic-acids/[subtopicSlug].
 * `cetald-` prefix: concept-tag keys are global.
 */
export const MHTCET_CARBONYL_NOTES: Record<string, SubtopicNote> = {
  "cetald-nomenclature": NOMENCLATURE_NOTE,
  "cetald-preparation": PREPARATION_NOTE,
  "cetald-nucleophilic-addition": NUCLEOPHILIC_ADDITION_NOTE,
  "cetald-redox-and-tests": REDOX_AND_TESTS_NOTE,
  "cetald-carboxylic-acids": CARBOXYLIC_ACIDS_NOTE,
};

export const MHTCET_CARBONYL_SLUGS = Object.keys(MHTCET_CARBONYL_NOTES);

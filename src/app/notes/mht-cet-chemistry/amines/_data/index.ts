import type { SubtopicNote } from "@/app/notes/_types";
import { NOMENCLATURE_NOTE } from "./cetam-nomenclature";
import { PHYSICAL_PROPERTIES_NOTE } from "./cetam-physical-properties";
import { PREPARATION_NOTE } from "./cetam-preparation";
import { REACTIONS_AND_BASICITY_NOTE } from "./cetam-reactions-and-basicity";
import { DIAZONIUM_SALTS_NOTE } from "./cetam-diazonium-salts";

export { MHTCET_AMINES_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/mht-cet-chemistry/amines/[subtopicSlug].
 * `cetam-` prefix: concept-tag keys are global.
 */
export const MHTCET_AMINES_NOTES: Record<string, SubtopicNote> = {
  "cetam-nomenclature": NOMENCLATURE_NOTE,
  "cetam-physical-properties": PHYSICAL_PROPERTIES_NOTE,
  "cetam-preparation": PREPARATION_NOTE,
  "cetam-reactions-and-basicity": REACTIONS_AND_BASICITY_NOTE,
  "cetam-diazonium-salts": DIAZONIUM_SALTS_NOTE,
};

export const MHTCET_AMINES_SLUGS = Object.keys(MHTCET_AMINES_NOTES);

import type { SubtopicNote } from "@/app/notes/_types";
import { DIPOLE_NOTE } from "./cetp-mm-dipole";
import { MAGNETISATION_NOTE } from "./cetp-mm-magnetisation";
import { CLASSIFICATION_NOTE } from "./cetp-mm-classification";

export { MHTCET_MAGMAT_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/mht-cet-physics/magnetic-materials/[subtopicSlug].
 * `cetp-mm-` prefix: concept-tag keys are global.
 */
export const MHTCET_MAGMAT_NOTES: Record<string, SubtopicNote> = {
  "cetp-mm-dipole": DIPOLE_NOTE,
  "cetp-mm-magnetisation": MAGNETISATION_NOTE,
  "cetp-mm-classification": CLASSIFICATION_NOTE,
};

export const MHTCET_MAGMAT_SLUGS = Object.keys(MHTCET_MAGMAT_NOTES);

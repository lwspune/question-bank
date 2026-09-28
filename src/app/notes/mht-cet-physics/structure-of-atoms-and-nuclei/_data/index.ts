import type { SubtopicNote } from "@/app/notes/_types";
import { BOHR_NOTE } from "./cetp-an-bohr";
import { SPECTRUM_NOTE } from "./cetp-an-spectrum";
import { NUCLEI_NOTE } from "./cetp-an-nuclei";

export { MHTCET_ATOMS_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/mht-cet-physics/structure-of-atoms-and-nuclei/[subtopicSlug].
 * `cetp-an-` prefix: concept-tag keys are global.
 */
export const MHTCET_ATOMS_NOTES: Record<string, SubtopicNote> = {
  "cetp-an-bohr": BOHR_NOTE,
  "cetp-an-spectrum": SPECTRUM_NOTE,
  "cetp-an-nuclei": NUCLEI_NOTE,
};

export const MHTCET_ATOMS_SLUGS = Object.keys(MHTCET_ATOMS_NOTES);

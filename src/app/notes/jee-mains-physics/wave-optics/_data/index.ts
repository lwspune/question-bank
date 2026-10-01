import type { SubtopicNote } from "@/app/notes/_types";
import { WAVEFRONTS_WO_NOTE } from "./wavefronts";
import { SUPERPOSITION_WO_NOTE } from "./superposition";
import { FRINGES_WO_NOTE } from "./fringes";
import { INTENSITY_WO_NOTE } from "./intensity";
import { DIFFRACTION_WO_NOTE } from "./diffraction";
import { POLARISATION_WO_NOTE } from "./polarisation";

export { JEE_PH_WO_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/jee-mains-physics/wave-optics/[subtopicSlug].
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is
 * GLOBALLY unique across NOTES_CHAPTERS — hence `jph-wo-` here and `jpwo-` on
 * concept slugs.
 */
export const JEE_PH_WO_NOTES: Record<string, SubtopicNote> = {
  "jph-wo-wavefronts": WAVEFRONTS_WO_NOTE,
  "jph-wo-superposition": SUPERPOSITION_WO_NOTE,
  "jph-wo-fringes": FRINGES_WO_NOTE,
  "jph-wo-intensity": INTENSITY_WO_NOTE,
  "jph-wo-diffraction": DIFFRACTION_WO_NOTE,
  "jph-wo-polarisation": POLARISATION_WO_NOTE,
};

export const JEE_PH_WO_SLUGS = Object.keys(JEE_PH_WO_NOTES);

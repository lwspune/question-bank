import type { SubtopicNote } from "@/app/notes/_types";
import { WAVEFRONTS_NOTE } from "./cetp-wavefronts";
import { YDSE_FRINGES_NOTE } from "./cetp-ydse-fringes";
import { INTERFERENCE_INTENSITY_NOTE } from "./cetp-interference-intensity";
import { DIFFRACTION_NOTE } from "./cetp-diffraction";
import { POLARISATION_NOTE } from "./cetp-polarisation";

export { MHTCET_WAVE_OPTICS_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/mht-cet-physics/wave-optics/[subtopicSlug].
 * `cetp-` prefix: concept-tag keys are global.
 */
export const MHTCET_WAVE_OPTICS_NOTES: Record<string, SubtopicNote> = {
  "cetp-wavefronts": WAVEFRONTS_NOTE,
  "cetp-ydse-fringes": YDSE_FRINGES_NOTE,
  "cetp-interference-intensity": INTERFERENCE_INTENSITY_NOTE,
  "cetp-diffraction": DIFFRACTION_NOTE,
  "cetp-polarisation": POLARISATION_NOTE,
};

export const MHTCET_WAVE_OPTICS_SLUGS = Object.keys(MHTCET_WAVE_OPTICS_NOTES);

import type { SubtopicNote } from "@/app/notes/_types";
import { REFLECTION_AND_MIRRORS_NOTE } from "./reflection-and-mirrors";
import { REFRACTION_AND_TIR_NOTE } from "./refraction-and-tir";
import { LENSES_AND_LENS_FORMULA_NOTE } from "./lenses-and-lens-formula";
import { PRISMS_AND_DISPERSION_NOTE } from "./prisms-and-dispersion";
import { EYE_AND_INSTRUMENTS_NOTE } from "./eye-and-instruments";
import { LIGHT_PHENOMENA_AND_SPECTRUM_NOTE } from "./light-phenomena-and-spectrum";

export { LIGHT_OPTICS_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/nda-physics/light-optics/[subtopicSlug].
 * Keys must match the URL slug; chapter.subtopicOrder owns rendering order.
 * Adding a new note = author the file + add the entry here.
 */
export const LIGHT_OPTICS_NOTES: Record<string, SubtopicNote> = {
  "opt-reflection-and-mirrors": REFLECTION_AND_MIRRORS_NOTE,
  "opt-refraction-and-tir": REFRACTION_AND_TIR_NOTE,
  "opt-lenses-and-lens-formula": LENSES_AND_LENS_FORMULA_NOTE,
  "opt-prisms-and-dispersion": PRISMS_AND_DISPERSION_NOTE,
  "opt-eye-and-instruments": EYE_AND_INSTRUMENTS_NOTE,
  "opt-light-phenomena-and-spectrum": LIGHT_PHENOMENA_AND_SPECTRUM_NOTE,
};

export const LIGHT_OPTICS_SLUGS = Object.keys(LIGHT_OPTICS_NOTES);

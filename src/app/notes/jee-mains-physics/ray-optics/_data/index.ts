import type { SubtopicNote } from "@/app/notes/_types";
import { MIRRORS_RAY_NOTE } from "./mirrors";
import { PLANE_REFRACTION_RAY_NOTE } from "./plane-refraction";
import { TIR_RAY_NOTE } from "./tir";
import { SPHERICAL_SURFACE_RAY_NOTE } from "./spherical-surface";
import { LENS_FORMULA_RAY_NOTE } from "./lens-formula";
import { SPECIAL_LENSES_RAY_NOTE } from "./special-lenses";
import { PRISMS_RAY_NOTE } from "./prisms";
import { INSTRUMENTS_RAY_NOTE } from "./instruments";

export { JEE_PH_RAY_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/jee-mains-physics/ray-optics/[subtopicSlug].
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is
 * GLOBALLY unique across NOTES_CHAPTERS — hence `jph-ray-` here and `jpray-` on
 * concept slugs.
 */
export const JEE_PH_RAY_NOTES: Record<string, SubtopicNote> = {
  "jph-ray-mirrors": MIRRORS_RAY_NOTE,
  "jph-ray-plane-refraction": PLANE_REFRACTION_RAY_NOTE,
  "jph-ray-tir": TIR_RAY_NOTE,
  "jph-ray-spherical-surface": SPHERICAL_SURFACE_RAY_NOTE,
  "jph-ray-lens-formula": LENS_FORMULA_RAY_NOTE,
  "jph-ray-special-lenses": SPECIAL_LENSES_RAY_NOTE,
  "jph-ray-prisms": PRISMS_RAY_NOTE,
  "jph-ray-instruments": INSTRUMENTS_RAY_NOTE,
};

export const JEE_PH_RAY_SLUGS = Object.keys(JEE_PH_RAY_NOTES);

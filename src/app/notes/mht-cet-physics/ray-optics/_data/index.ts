import type { SubtopicNote } from "@/app/notes/_types";
import { MIRRORS_NOTE } from "./cetp-ro-mirrors";
import { REFRACTION_NOTE } from "./cetp-ro-refraction";
import { PRISM_NOTE } from "./cetp-ro-prism";
import { LENSES_NOTE } from "./cetp-ro-lenses";
import { INSTRUMENTS_NOTE } from "./cetp-ro-instruments";

export { MHTCET_RAY_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/mht-cet-physics/ray-optics/[subtopicSlug].
 * `cetp-ro-` prefix: concept-tag keys are global.
 */
export const MHTCET_RAY_NOTES: Record<string, SubtopicNote> = {
  "cetp-ro-mirrors": MIRRORS_NOTE,
  "cetp-ro-refraction": REFRACTION_NOTE,
  "cetp-ro-prism": PRISM_NOTE,
  "cetp-ro-lenses": LENSES_NOTE,
  "cetp-ro-instruments": INSTRUMENTS_NOTE,
};

export const MHTCET_RAY_SLUGS = Object.keys(MHTCET_RAY_NOTES);

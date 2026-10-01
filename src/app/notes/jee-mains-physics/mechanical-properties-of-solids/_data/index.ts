import type { SubtopicNote } from "@/app/notes/_types";
import { YOUNG_SOLID_NOTE } from "./young";
import { LOADED_SOLID_NOTE } from "./loaded";
import { MODULI_SOLID_NOTE } from "./moduli";
import { ENERGY_SOLID_NOTE } from "./energy";

export { JEE_PH_SOLID_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/jee-mains-physics/mechanical-properties-of-solids/[subtopicSlug].
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is
 * GLOBALLY unique across NOTES_CHAPTERS — hence `jph-solid-` here and `jpsolid-` on
 * concept slugs.
 */
export const JEE_PH_SOLID_NOTES: Record<string, SubtopicNote> = {
  "jph-solid-young": YOUNG_SOLID_NOTE,
  "jph-solid-loaded": LOADED_SOLID_NOTE,
  "jph-solid-moduli": MODULI_SOLID_NOTE,
  "jph-solid-energy": ENERGY_SOLID_NOTE,
};

export const JEE_PH_SOLID_SLUGS = Object.keys(JEE_PH_SOLID_NOTES);

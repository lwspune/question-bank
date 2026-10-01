import type { SubtopicNote } from "@/app/notes/_types";
import { GAS_LAWS_KTG_NOTE } from "./gas-laws";
import { KINETIC_ENERGY_KTG_NOTE } from "./kinetic-energy";
import { SPEEDS_KTG_NOTE } from "./speeds";
import { DOF_KTG_NOTE } from "./dof";
import { ENERGY_MIXTURES_KTG_NOTE } from "./energy-mixtures";

export { JEE_PH_KTG_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/jee-mains-physics/kinetic-theory/[subtopicSlug].
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is
 * GLOBALLY unique across NOTES_CHAPTERS — hence `jph-ktg-` here and `jpktg-` on
 * concept slugs.
 */
export const JEE_PH_KTG_NOTES: Record<string, SubtopicNote> = {
  "jph-ktg-gas-laws": GAS_LAWS_KTG_NOTE,
  "jph-ktg-kinetic-energy": KINETIC_ENERGY_KTG_NOTE,
  "jph-ktg-speeds": SPEEDS_KTG_NOTE,
  "jph-ktg-dof": DOF_KTG_NOTE,
  "jph-ktg-energy-mixtures": ENERGY_MIXTURES_KTG_NOTE,
};

export const JEE_PH_KTG_SLUGS = Object.keys(JEE_PH_KTG_NOTES);

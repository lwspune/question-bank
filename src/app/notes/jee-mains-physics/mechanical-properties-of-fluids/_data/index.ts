import type { SubtopicNote } from "@/app/notes/_types";
import { PRESSURE_FLUID_NOTE } from "./pressure";
import { BERNOULLI_FLUID_NOTE } from "./bernoulli";
import { VISCOSITY_FLUID_NOTE } from "./viscosity";
import { TERMINAL_FLUID_NOTE } from "./terminal";
import { SURFACE_ENERGY_FLUID_NOTE } from "./surface-energy";
import { CAPILLARITY_FLUID_NOTE } from "./capillarity";

export { JEE_PH_FLUID_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/jee-mains-physics/mechanical-properties-of-fluids/[subtopicSlug].
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is
 * GLOBALLY unique across NOTES_CHAPTERS — hence `jph-fluid-` here and `jpfluid-` on
 * concept slugs.
 */
export const JEE_PH_FLUID_NOTES: Record<string, SubtopicNote> = {
  "jph-fluid-pressure": PRESSURE_FLUID_NOTE,
  "jph-fluid-bernoulli": BERNOULLI_FLUID_NOTE,
  "jph-fluid-viscosity": VISCOSITY_FLUID_NOTE,
  "jph-fluid-terminal": TERMINAL_FLUID_NOTE,
  "jph-fluid-surface-energy": SURFACE_ENERGY_FLUID_NOTE,
  "jph-fluid-capillarity": CAPILLARITY_FLUID_NOTE,
};

export const JEE_PH_FLUID_SLUGS = Object.keys(JEE_PH_FLUID_NOTES);

import type { SubtopicNote } from "@/app/notes/_types";
import { ELECTROSTATICS_NOTE } from "./electrostatics";
import { CURRENT_AND_OHMS_LAW_NOTE } from "./current-and-ohms-law";
import { RESISTANCE_AND_RESISTIVITY_NOTE } from "./resistance-and-resistivity";
import { RESISTOR_COMBINATIONS_NOTE } from "./resistor-combinations";
import { POWER_AND_ENERGY_NOTE } from "./power-and-energy";
import { CELLS_AND_KIRCHHOFF_NOTE } from "./cells-and-kirchhoff";
import { MAGNETISM_AND_EFFECTS_NOTE } from "./magnetism-and-effects";
import { MAGNETIC_FORCE_NOTE } from "./magnetic-force";
import { ELECTRICAL_DEVICES_NOTE } from "./electrical-devices";

export { ELECTRICITY_AND_MAGNETISM_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for
 * /notes/nda-physics/electricity-and-magnetism/[subtopicSlug].
 * Slugs are "em-" prefixed to stay globally unique across all NOTES_CHAPTERS
 * (the slug is the concept-tag key, not just a URL segment).
 * Render order is owned by chapter.subtopicOrder.
 */
export const ELECTRICITY_AND_MAGNETISM_NOTES: Record<string, SubtopicNote> = {
  "em-electrostatics": ELECTROSTATICS_NOTE,
  "em-current-and-ohms-law": CURRENT_AND_OHMS_LAW_NOTE,
  "em-resistance-and-resistivity": RESISTANCE_AND_RESISTIVITY_NOTE,
  "em-resistor-combinations": RESISTOR_COMBINATIONS_NOTE,
  "em-power-and-energy": POWER_AND_ENERGY_NOTE,
  "em-cells-and-kirchhoff": CELLS_AND_KIRCHHOFF_NOTE,
  "em-magnetism-and-effects": MAGNETISM_AND_EFFECTS_NOTE,
  "em-magnetic-force": MAGNETIC_FORCE_NOTE,
  "em-electrical-devices": ELECTRICAL_DEVICES_NOTE,
};

export const ELECTRICITY_AND_MAGNETISM_SLUGS = Object.keys(
  ELECTRICITY_AND_MAGNETISM_NOTES
);

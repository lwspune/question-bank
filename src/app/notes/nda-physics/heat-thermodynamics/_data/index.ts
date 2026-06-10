import type { SubtopicNote } from "@/app/notes/_types";
import { TEMPERATURE_AND_THERMOMETRY_NOTE } from "./temperature-and-thermometry";
import { HEAT_CALORIMETRY_SPECIFIC_HEAT_NOTE } from "./heat-calorimetry-specific-heat";
import { PHASE_CHANGE_AND_BOILING_NOTE } from "./phase-change-and-boiling";
import { THERMODYNAMIC_PROCESSES_NOTE } from "./thermodynamic-processes";

export { HEAT_THERMODYNAMICS_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for
 * /notes/nda-physics/heat-thermodynamics/[subtopicSlug].
 * Slugs are "ht-" prefixed to stay globally unique across all NOTES_CHAPTERS
 * (the slug is the concept-tag key, not just a URL segment).
 * Render order is owned by chapter.subtopicOrder.
 */
export const HEAT_THERMODYNAMICS_NOTES: Record<string, SubtopicNote> = {
  "ht-temperature-and-thermometry": TEMPERATURE_AND_THERMOMETRY_NOTE,
  "ht-heat-calorimetry-specific-heat": HEAT_CALORIMETRY_SPECIFIC_HEAT_NOTE,
  "ht-phase-change-and-boiling": PHASE_CHANGE_AND_BOILING_NOTE,
  "ht-thermodynamic-processes": THERMODYNAMIC_PROCESSES_NOTE,
};

export const HEAT_THERMODYNAMICS_SLUGS = Object.keys(HEAT_THERMODYNAMICS_NOTES);

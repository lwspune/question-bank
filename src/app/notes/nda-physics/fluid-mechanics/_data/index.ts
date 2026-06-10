import type { SubtopicNote } from "@/app/notes/_types";
import { PRESSURE_SURFACE_TENSION_NOTE } from "./pressure-surface-tension";
import { BUOYANCY_DENSITY_FLOTATION_NOTE } from "./buoyancy-density-flotation";

export { FLUID_MECHANICS_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for
 * /notes/nda-physics/fluid-mechanics/[subtopicSlug].
 * Slugs are "flu-" prefixed to stay globally unique across all NOTES_CHAPTERS
 * (the slug is the concept-tag key, not just a URL segment).
 * Render order is owned by chapter.subtopicOrder.
 */
export const FLUID_MECHANICS_NOTES: Record<string, SubtopicNote> = {
  "flu-pressure-surface-tension": PRESSURE_SURFACE_TENSION_NOTE,
  "flu-buoyancy-density-flotation": BUOYANCY_DENSITY_FLOTATION_NOTE,
};

export const FLUID_MECHANICS_SLUGS = Object.keys(FLUID_MECHANICS_NOTES);

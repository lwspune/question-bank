import type { SubtopicNote } from "@/app/notes/_types";
import { ADSORPTION_NOTE } from "./cetsurf-adsorption";
import { CATALYSIS_NOTE } from "./cetsurf-catalysis";
import { COLLOIDS_NOTE } from "./cetsurf-colloids";

export { MHTCET_SURFACE_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/mht-cet-chemistry/surface-chemistry/[subtopicSlug].
 * `cetsurf-` prefix: concept-tag keys are global.
 */
export const MHTCET_SURFACE_NOTES: Record<string, SubtopicNote> = {
  "cetsurf-adsorption": ADSORPTION_NOTE,
  "cetsurf-catalysis": CATALYSIS_NOTE,
  "cetsurf-colloids": COLLOIDS_NOTE,
};

export const MHTCET_SURFACE_SLUGS = Object.keys(MHTCET_SURFACE_NOTES);

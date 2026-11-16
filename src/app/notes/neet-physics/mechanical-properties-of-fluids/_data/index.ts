import type { SubtopicNote } from "@/app/notes/_types";
import { NEET_PH_FL_PRESSURE_NOTE } from "./pressure";
import { NEET_PH_FL_VISCOSITY_NOTE } from "./viscosity";
import { NEET_PH_FL_SURFACE_NOTE } from "./surface";

export { NEET_PH_FL_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/neet-physics/mechanical-properties-of-fluids/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `nph-fl-` here and `nphfl-` on concept slugs.
 *
 * 3 pages re-cut by scripts/neet/retax.ts from a generated-papers/_plan-*.json.
 * Order matches `subtopicOrder`.
 */
export const NEET_PH_FL_NOTES: Record<string, SubtopicNote> = {
  "nph-fl-pressure": NEET_PH_FL_PRESSURE_NOTE,
  "nph-fl-viscosity": NEET_PH_FL_VISCOSITY_NOTE,
  "nph-fl-surface": NEET_PH_FL_SURFACE_NOTE,
};

export const NEET_PH_FL_SLUGS = Object.keys(NEET_PH_FL_NOTES);

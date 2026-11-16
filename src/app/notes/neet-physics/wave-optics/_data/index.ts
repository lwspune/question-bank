import type { SubtopicNote } from "@/app/notes/_types";
import { NEET_PH_WO_WAVEFRONTS_NOTE } from "./wavefronts";
import { NEET_PH_WO_YDSE_NOTE } from "./ydse";
import { NEET_PH_WO_POLARISATION_NOTE } from "./polarisation";

export { NEET_PH_WO_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/neet-physics/wave-optics/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `nph-wo-` here and `nphwo-` on concept slugs.
 *
 * 3 pages re-cut by scripts/neet/retax.ts from a generated-papers/_plan-*.json.
 * Order matches `subtopicOrder`.
 */
export const NEET_PH_WO_NOTES: Record<string, SubtopicNote> = {
  "nph-wo-wavefronts": NEET_PH_WO_WAVEFRONTS_NOTE,
  "nph-wo-ydse": NEET_PH_WO_YDSE_NOTE,
  "nph-wo-polarisation": NEET_PH_WO_POLARISATION_NOTE,
};

export const NEET_PH_WO_SLUGS = Object.keys(NEET_PH_WO_NOTES);

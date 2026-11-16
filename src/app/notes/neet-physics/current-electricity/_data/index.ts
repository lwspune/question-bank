import type { SubtopicNote } from "@/app/notes/_types";
import { NEET_PH_CE_DRIFT_NOTE } from "./drift";
import { NEET_PH_CE_COMBINATIONS_NOTE } from "./combinations";
import { NEET_PH_CE_POWER_NOTE } from "./power";
import { NEET_PH_CE_KIRCHHOFF_NOTE } from "./kirchhoff";

export { NEET_PH_CE_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/neet-physics/current-electricity/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `nph-ce-` here and `nphce-` on concept slugs.
 *
 * 4 pages re-cut by scripts/neet/retax.ts from a generated-papers/_plan-*.json.
 * Order matches `subtopicOrder`.
 */
export const NEET_PH_CE_NOTES: Record<string, SubtopicNote> = {
  "nph-ce-drift": NEET_PH_CE_DRIFT_NOTE,
  "nph-ce-combinations": NEET_PH_CE_COMBINATIONS_NOTE,
  "nph-ce-power": NEET_PH_CE_POWER_NOTE,
  "nph-ce-kirchhoff": NEET_PH_CE_KIRCHHOFF_NOTE,
};

export const NEET_PH_CE_SLUGS = Object.keys(NEET_PH_CE_NOTES);

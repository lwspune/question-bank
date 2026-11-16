import type { SubtopicNote } from "@/app/notes/_types";
import { NEET_PH_GR_FIELD_NOTE } from "./field";
import { NEET_PH_GR_ENERGY_NOTE } from "./energy";
import { NEET_PH_GR_ORBITS_NOTE } from "./orbits";

export { NEET_PH_GR_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/neet-physics/gravitation/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `nph-gr-` here and `nphgr-` on concept slugs.
 *
 * 3 pages re-cut by scripts/neet/retax.ts from a generated-papers/_plan-*.json.
 * Order matches `subtopicOrder`.
 */
export const NEET_PH_GR_NOTES: Record<string, SubtopicNote> = {
  "nph-gr-field": NEET_PH_GR_FIELD_NOTE,
  "nph-gr-energy": NEET_PH_GR_ENERGY_NOTE,
  "nph-gr-orbits": NEET_PH_GR_ORBITS_NOTE,
};

export const NEET_PH_GR_SLUGS = Object.keys(NEET_PH_GR_NOTES);

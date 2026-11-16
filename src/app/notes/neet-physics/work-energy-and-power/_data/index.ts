import type { SubtopicNote } from "@/app/notes/_types";
import { NEET_PH_WE_WORK_NOTE } from "./work";
import { NEET_PH_WE_ENERGY_NOTE } from "./energy";
import { NEET_PH_WE_POWER_NOTE } from "./power";
import { NEET_PH_WE_COLLISIONS_NOTE } from "./collisions";

export { NEET_PH_WE_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/neet-physics/work-energy-and-power/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `nph-we-` here and `nphwe-` on concept slugs.
 *
 * 4 pages re-cut by scripts/neet/retax.ts from a generated-papers/_plan-*.json.
 * Order matches `subtopicOrder`.
 */
export const NEET_PH_WE_NOTES: Record<string, SubtopicNote> = {
  "nph-we-work": NEET_PH_WE_WORK_NOTE,
  "nph-we-energy": NEET_PH_WE_ENERGY_NOTE,
  "nph-we-power": NEET_PH_WE_POWER_NOTE,
  "nph-we-collisions": NEET_PH_WE_COLLISIONS_NOTE,
};

export const NEET_PH_WE_SLUGS = Object.keys(NEET_PH_WE_NOTES);

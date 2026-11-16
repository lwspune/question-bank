import type { SubtopicNote } from "@/app/notes/_types";
import { NEET_PH_OS_EQUATION_NOTE } from "./equation";
import { NEET_PH_OS_PERIODS_NOTE } from "./periods";
import { NEET_PH_OS_ENERGY_NOTE } from "./energy";

export { NEET_PH_OS_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/neet-physics/oscillations/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `nph-os-` here and `nphos-` on concept slugs.
 *
 * 3 pages re-cut by scripts/neet/retax.ts from a generated-papers/_plan-*.json.
 * Order matches `subtopicOrder`.
 */
export const NEET_PH_OS_NOTES: Record<string, SubtopicNote> = {
  "nph-os-equation": NEET_PH_OS_EQUATION_NOTE,
  "nph-os-periods": NEET_PH_OS_PERIODS_NOTE,
  "nph-os-energy": NEET_PH_OS_ENERGY_NOTE,
};

export const NEET_PH_OS_SLUGS = Object.keys(NEET_PH_OS_NOTES);

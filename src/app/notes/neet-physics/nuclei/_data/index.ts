import type { SubtopicNote } from "@/app/notes/_types";
import { NEET_PH_NU_SIZE_NOTE } from "./size";
import { NEET_PH_NU_ENERGY_NOTE } from "./energy";
import { NEET_PH_NU_DECAY_NOTE } from "./decay";

export { NEET_PH_NU_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/neet-physics/nuclei/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `nph-nu-` here and `nphnu-` on concept slugs.
 *
 * 3 pages re-cut by scripts/neet/retax.ts from a generated-papers/_plan-*.json.
 * Order matches `subtopicOrder`.
 */
export const NEET_PH_NU_NOTES: Record<string, SubtopicNote> = {
  "nph-nu-size": NEET_PH_NU_SIZE_NOTE,
  "nph-nu-energy": NEET_PH_NU_ENERGY_NOTE,
  "nph-nu-decay": NEET_PH_NU_DECAY_NOTE,
};

export const NEET_PH_NU_SLUGS = Object.keys(NEET_PH_NU_NOTES);

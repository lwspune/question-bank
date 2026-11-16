import type { SubtopicNote } from "@/app/notes/_types";
import { NEET_PH_LM_NEWTON_NOTE } from "./newton";
import { NEET_PH_LM_FRICTION_NOTE } from "./friction";
import { NEET_PH_LM_CIRCULAR_NOTE } from "./circular";

export { NEET_PH_LM_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/neet-physics/laws-of-motion/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `nph-lm-` here and `nphlm-` on concept slugs.
 *
 * 3 pages re-cut by scripts/neet/retax.ts from a generated-papers/_plan-*.json.
 * Order matches `subtopicOrder`.
 */
export const NEET_PH_LM_NOTES: Record<string, SubtopicNote> = {
  "nph-lm-newton": NEET_PH_LM_NEWTON_NOTE,
  "nph-lm-friction": NEET_PH_LM_FRICTION_NOTE,
  "nph-lm-circular": NEET_PH_LM_CIRCULAR_NOTE,
};

export const NEET_PH_LM_SLUGS = Object.keys(NEET_PH_LM_NOTES);

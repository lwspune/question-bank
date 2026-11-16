import type { SubtopicNote } from "@/app/notes/_types";
import { NEET_PH_SO_YOUNG_NOTE } from "./young";
import { NEET_PH_SO_MODULI_NOTE } from "./moduli";

export { NEET_PH_SO_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/neet-physics/mechanical-properties-of-solids/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `nph-so-` here and `nphso-` on concept slugs.
 *
 * 2 pages re-cut by scripts/neet/retax.ts from a generated-papers/_plan-*.json.
 * Order matches `subtopicOrder`.
 */
export const NEET_PH_SO_NOTES: Record<string, SubtopicNote> = {
  "nph-so-young": NEET_PH_SO_YOUNG_NOTE,
  "nph-so-moduli": NEET_PH_SO_MODULI_NOTE,
};

export const NEET_PH_SO_SLUGS = Object.keys(NEET_PH_SO_NOTES);

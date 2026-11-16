import type { SubtopicNote } from "@/app/notes/_types";
import { NEET_PH_AC_REACTANCE_NOTE } from "./reactance";
import { NEET_PH_AC_LCR_NOTE } from "./lcr";
import { NEET_PH_AC_TRANSFORMER_NOTE } from "./transformer";

export { NEET_PH_AC_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/neet-physics/alternating-current/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `nph-ac-` here and `nphac-` on concept slugs.
 *
 * 3 pages re-cut by scripts/neet/retax.ts from a generated-papers/_plan-*.json.
 * Order matches `subtopicOrder`.
 */
export const NEET_PH_AC_NOTES: Record<string, SubtopicNote> = {
  "nph-ac-reactance": NEET_PH_AC_REACTANCE_NOTE,
  "nph-ac-lcr": NEET_PH_AC_LCR_NOTE,
  "nph-ac-transformer": NEET_PH_AC_TRANSFORMER_NOTE,
};

export const NEET_PH_AC_SLUGS = Object.keys(NEET_PH_AC_NOTES);

import type { SubtopicNote } from "@/app/notes/_types";
import { NEET_PH_EI_FARADAY_NOTE } from "./faraday";
import { NEET_PH_EI_INDUCTANCE_NOTE } from "./inductance";

export { NEET_PH_EI_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/neet-physics/electromagnetic-induction/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `nph-ei-` here and `nphei-` on concept slugs.
 *
 * 2 pages re-cut by scripts/neet/retax.ts from a generated-papers/_plan-*.json.
 * Order matches `subtopicOrder`.
 */
export const NEET_PH_EI_NOTES: Record<string, SubtopicNote> = {
  "nph-ei-faraday": NEET_PH_EI_FARADAY_NOTE,
  "nph-ei-inductance": NEET_PH_EI_INDUCTANCE_NOTE,
};

export const NEET_PH_EI_SLUGS = Object.keys(NEET_PH_EI_NOTES);

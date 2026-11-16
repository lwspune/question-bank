import type { SubtopicNote } from "@/app/notes/_types";
import { NEET_PH_AT_RUTHERFORD_NOTE } from "./rutherford";
import { NEET_PH_AT_BOHR_NOTE } from "./bohr";
import { NEET_PH_AT_SPECTRUM_NOTE } from "./spectrum";

export { NEET_PH_AT_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/neet-physics/atoms/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `nph-at-` here and `nphat-` on concept slugs.
 *
 * 3 pages re-cut by scripts/neet/retax.ts from a generated-papers/_plan-*.json.
 * Order matches `subtopicOrder`.
 */
export const NEET_PH_AT_NOTES: Record<string, SubtopicNote> = {
  "nph-at-rutherford": NEET_PH_AT_RUTHERFORD_NOTE,
  "nph-at-bohr": NEET_PH_AT_BOHR_NOTE,
  "nph-at-spectrum": NEET_PH_AT_SPECTRUM_NOTE,
};

export const NEET_PH_AT_SLUGS = Object.keys(NEET_PH_AT_NOTES);

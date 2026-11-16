import type { SubtopicNote } from "@/app/notes/_types";
import { NEET_PH_EM_WAVES_NOTE } from "./waves";
import { NEET_PH_EM_SPECTRUM_NOTE } from "./spectrum";

export { NEET_PH_EM_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/neet-physics/electromagnetic-waves/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `nph-em-` here and `nphem-` on concept slugs.
 *
 * 2 pages re-cut by scripts/neet/retax.ts from a generated-papers/_plan-*.json.
 * Order matches `subtopicOrder`.
 */
export const NEET_PH_EM_NOTES: Record<string, SubtopicNote> = {
  "nph-em-waves": NEET_PH_EM_WAVES_NOTE,
  "nph-em-spectrum": NEET_PH_EM_SPECTRUM_NOTE,
};

export const NEET_PH_EM_SLUGS = Object.keys(NEET_PH_EM_NOTES);

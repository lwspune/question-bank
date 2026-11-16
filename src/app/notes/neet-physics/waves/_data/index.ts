import type { SubtopicNote } from "@/app/notes/_types";
import { NEET_PH_WV_TRAVELLING_NOTE } from "./travelling";
import { NEET_PH_WV_STANDING_NOTE } from "./standing";

export { NEET_PH_WV_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/neet-physics/waves/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `nph-wv-` here and `nphwv-` on concept slugs.
 *
 * 2 pages re-cut by scripts/neet/retax.ts from a generated-papers/_plan-*.json.
 * Order matches `subtopicOrder`.
 */
export const NEET_PH_WV_NOTES: Record<string, SubtopicNote> = {
  "nph-wv-travelling": NEET_PH_WV_TRAVELLING_NOTE,
  "nph-wv-standing": NEET_PH_WV_STANDING_NOTE,
};

export const NEET_PH_WV_SLUGS = Object.keys(NEET_PH_WV_NOTES);

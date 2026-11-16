import type { SubtopicNote } from "@/app/notes/_types";
import { NEET_CH_SO_CONCENTRATION_NOTE } from "./concentration";
import { NEET_CH_SO_RAOULT_NOTE } from "./raoult";
import { NEET_CH_SO_COLLIGATIVE_NOTE } from "./colligative";

export { NEET_CH_SO_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/neet-chemistry/solutions/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `nch-so-` here and `nchso-` on concept slugs.
 *
 * 3 pages re-cut by scripts/neet/retax.ts from a generated-papers/_plan-*.json.
 * Order matches `subtopicOrder`.
 */
export const NEET_CH_SO_NOTES: Record<string, SubtopicNote> = {
  "nch-so-concentration": NEET_CH_SO_CONCENTRATION_NOTE,
  "nch-so-raoult": NEET_CH_SO_RAOULT_NOTE,
  "nch-so-colligative": NEET_CH_SO_COLLIGATIVE_NOTE,
};

export const NEET_CH_SO_SLUGS = Object.keys(NEET_CH_SO_NOTES);

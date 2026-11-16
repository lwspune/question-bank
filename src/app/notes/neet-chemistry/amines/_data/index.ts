import type { SubtopicNote } from "@/app/notes/_types";
import { NEET_CH_AM_PREP_NOTE } from "./prep";
import { NEET_CH_AM_REACTIONS_NOTE } from "./reactions";
import { NEET_CH_AM_DIAZONIUM_NOTE } from "./diazonium";

export { NEET_CH_AM_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/neet-chemistry/amines/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `nch-am-` here and `ncham-` on concept slugs.
 *
 * 3 pages re-cut by scripts/neet/retax.ts from a generated-papers/_plan-*.json.
 * Order matches `subtopicOrder`.
 */
export const NEET_CH_AM_NOTES: Record<string, SubtopicNote> = {
  "nch-am-prep": NEET_CH_AM_PREP_NOTE,
  "nch-am-reactions": NEET_CH_AM_REACTIONS_NOTE,
  "nch-am-diazonium": NEET_CH_AM_DIAZONIUM_NOTE,
};

export const NEET_CH_AM_SLUGS = Object.keys(NEET_CH_AM_NOTES);

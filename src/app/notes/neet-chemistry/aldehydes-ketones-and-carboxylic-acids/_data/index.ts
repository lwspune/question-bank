import type { SubtopicNote } from "@/app/notes/_types";
import { NEET_CH_AK_PREP_NOTE } from "./prep";
import { NEET_CH_AK_ADDITION_NOTE } from "./addition";
import { NEET_CH_AK_TESTS_NOTE } from "./tests";
import { NEET_CH_AK_ACIDS_NOTE } from "./acids";

export { NEET_CH_AK_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/neet-chemistry/aldehydes-ketones-and-carboxylic-acids/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `nch-ak-` here and `nchak-` on concept slugs.
 *
 * 4 pages re-cut by scripts/neet/retax.ts from a generated-papers/_plan-*.json.
 * Order matches `subtopicOrder`.
 */
export const NEET_CH_AK_NOTES: Record<string, SubtopicNote> = {
  "nch-ak-prep": NEET_CH_AK_PREP_NOTE,
  "nch-ak-addition": NEET_CH_AK_ADDITION_NOTE,
  "nch-ak-tests": NEET_CH_AK_TESTS_NOTE,
  "nch-ak-acids": NEET_CH_AK_ACIDS_NOTE,
};

export const NEET_CH_AK_SLUGS = Object.keys(NEET_CH_AK_NOTES);

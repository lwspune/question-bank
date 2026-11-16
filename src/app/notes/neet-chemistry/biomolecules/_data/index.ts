import type { SubtopicNote } from "@/app/notes/_types";
import { NEET_CH_BM_CARBS_NOTE } from "./carbohydrates";
import { NEET_CH_BM_PROTEINS_NOTE } from "./proteins";
import { NEET_CH_BM_VITAMINS_NOTE } from "./vitamins";

export { NEET_CH_BM_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/neet-chemistry/biomolecules/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `nch-bm-` here and `nchbm-` on concept slugs.
 *
 * 3 pages re-cut by scripts/neet/retax.ts from a generated-papers/_plan-*.json.
 * Order matches `subtopicOrder`.
 */
export const NEET_CH_BM_NOTES: Record<string, SubtopicNote> = {
  "nch-bm-carbohydrates": NEET_CH_BM_CARBS_NOTE,
  "nch-bm-proteins": NEET_CH_BM_PROTEINS_NOTE,
  "nch-bm-vitamins": NEET_CH_BM_VITAMINS_NOTE,
};

export const NEET_CH_BM_SLUGS = Object.keys(NEET_CH_BM_NOTES);

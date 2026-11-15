import type { SubtopicNote } from "@/app/notes/_types";
import { NEET_ZO_BM_BLOCKS_NOTE } from "./blocks";
import { NEET_ZO_BM_POLYMERS_NOTE } from "./polymers";
import { NEET_ZO_BM_ENZYMES_NOTE } from "./enzymes";

export { NEET_ZO_BM_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/neet-zoology/biomolecules/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `nzo-bm-` here and `nzobm-` on concept slugs.
 *
 * 3 pages re-cut by scripts/neet/retax.ts from a generated-papers/_plan-*.json.
 * Order matches `subtopicOrder`.
 */
export const NEET_ZO_BM_NOTES: Record<string, SubtopicNote> = {
  "nzo-bm-blocks": NEET_ZO_BM_BLOCKS_NOTE,
  "nzo-bm-polymers": NEET_ZO_BM_POLYMERS_NOTE,
  "nzo-bm-enzymes": NEET_ZO_BM_ENZYMES_NOTE,
};

export const NEET_ZO_BM_SLUGS = Object.keys(NEET_ZO_BM_NOTES);

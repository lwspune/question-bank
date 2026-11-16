import type { SubtopicNote } from "@/app/notes/_types";
import { NEET_CH_CC_WERNER_NOTE } from "./werner";
import { NEET_CH_CC_ISOMERISM_NOTE } from "./isomerism";
import { NEET_CH_CC_VBT_NOTE } from "./vbt";
import { NEET_CH_CC_CFT_NOTE } from "./cft";

export { NEET_CH_CC_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/neet-chemistry/coordination-compounds/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `nch-cc-` here and `nchcc-` on concept slugs.
 *
 * 4 pages re-cut by scripts/neet/retax.ts from a generated-papers/_plan-*.json.
 * Order matches `subtopicOrder`.
 */
export const NEET_CH_CC_NOTES: Record<string, SubtopicNote> = {
  "nch-cc-werner": NEET_CH_CC_WERNER_NOTE,
  "nch-cc-isomerism": NEET_CH_CC_ISOMERISM_NOTE,
  "nch-cc-vbt": NEET_CH_CC_VBT_NOTE,
  "nch-cc-cft": NEET_CH_CC_CFT_NOTE,
};

export const NEET_CH_CC_SLUGS = Object.keys(NEET_CH_CC_NOTES);

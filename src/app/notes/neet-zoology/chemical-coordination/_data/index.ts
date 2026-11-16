import type { SubtopicNote } from "@/app/notes/_types";
import { NEET_ZO_CC_PITUITARY_NOTE } from "./pituitary";
import { NEET_ZO_CC_ADRENAL_NOTE } from "./adrenal";
import { NEET_ZO_CC_ACTION_NOTE } from "./action";

export { NEET_ZO_CC_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/neet-zoology/chemical-coordination/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `nzo-cc-` here and `nzocc-` on concept slugs.
 *
 * 3 pages re-cut by scripts/neet/retax.ts from a generated-papers/_plan-*.json.
 * Order matches `subtopicOrder`.
 */
export const NEET_ZO_CC_NOTES: Record<string, SubtopicNote> = {
  "nzo-cc-pituitary": NEET_ZO_CC_PITUITARY_NOTE,
  "nzo-cc-adrenal": NEET_ZO_CC_ADRENAL_NOTE,
  "nzo-cc-action": NEET_ZO_CC_ACTION_NOTE,
};

export const NEET_ZO_CC_SLUGS = Object.keys(NEET_ZO_CC_NOTES);

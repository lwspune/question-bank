import type { SubtopicNote } from "@/app/notes/_types";
import { NEET_CH_OC_NAMING_NOTE } from "./naming";
import { NEET_CH_OC_EFFECTS_NOTE } from "./effects";
import { NEET_CH_OC_PURIFICATION_NOTE } from "./purification";

export { NEET_CH_OC_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/neet-chemistry/organic-basic-principles/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `nch-oc-` here and `nchoc-` on concept slugs.
 *
 * 3 pages re-cut by scripts/neet/retax.ts from a generated-papers/_plan-*.json.
 * Order matches `subtopicOrder`.
 */
export const NEET_CH_OC_NOTES: Record<string, SubtopicNote> = {
  "nch-oc-naming": NEET_CH_OC_NAMING_NOTE,
  "nch-oc-effects": NEET_CH_OC_EFFECTS_NOTE,
  "nch-oc-purification": NEET_CH_OC_PURIFICATION_NOTE,
};

export const NEET_CH_OC_SLUGS = Object.keys(NEET_CH_OC_NOTES);

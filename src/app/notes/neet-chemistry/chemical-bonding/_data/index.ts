import type { SubtopicNote } from "@/app/notes/_types";
import { NEET_CH_CB_LEWIS_NOTE } from "./lewis";
import { NEET_CH_CB_SHAPES_NOTE } from "./shapes";
import { NEET_CH_CB_POLARITY_NOTE } from "./polarity";
import { NEET_CH_CB_MOT_NOTE } from "./mot";

export { NEET_CH_CB_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/neet-chemistry/chemical-bonding/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `nch-cb-` here and `nchcb-` on concept slugs.
 *
 * 4 pages re-cut by scripts/neet/retax.ts from a generated-papers/_plan-*.json.
 * Order matches `subtopicOrder`.
 */
export const NEET_CH_CB_NOTES: Record<string, SubtopicNote> = {
  "nch-cb-lewis": NEET_CH_CB_LEWIS_NOTE,
  "nch-cb-shapes": NEET_CH_CB_SHAPES_NOTE,
  "nch-cb-polarity": NEET_CH_CB_POLARITY_NOTE,
  "nch-cb-mot": NEET_CH_CB_MOT_NOTE,
};

export const NEET_CH_CB_SLUGS = Object.keys(NEET_CH_CB_NOTES);

import type { SubtopicNote } from "@/app/notes/_types";
import { NEET_CH_HA_PREP_NOTE } from "./prep";
import { NEET_CH_HA_SUBSTITUTION_NOTE } from "./substitution";
import { NEET_CH_HA_ELIMINATION_NOTE } from "./elimination";

export { NEET_CH_HA_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/neet-chemistry/haloalkanes-and-haloarenes/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `nch-ha-` here and `nchha-` on concept slugs.
 *
 * 3 pages re-cut by scripts/neet/retax.ts from a generated-papers/_plan-*.json.
 * Order matches `subtopicOrder`.
 */
export const NEET_CH_HA_NOTES: Record<string, SubtopicNote> = {
  "nch-ha-prep": NEET_CH_HA_PREP_NOTE,
  "nch-ha-substitution": NEET_CH_HA_SUBSTITUTION_NOTE,
  "nch-ha-elimination": NEET_CH_HA_ELIMINATION_NOTE,
};

export const NEET_CH_HA_SLUGS = Object.keys(NEET_CH_HA_NOTES);

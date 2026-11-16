import type { SubtopicNote } from "@/app/notes/_types";
import { NEET_CH_CK_RATE_NOTE } from "./rate";
import { NEET_CH_CK_INTEGRATED_NOTE } from "./integrated";
import { NEET_CH_CK_TEMPERATURE_NOTE } from "./temperature";

export { NEET_CH_CK_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/neet-chemistry/chemical-kinetics/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `nch-ck-` here and `nchck-` on concept slugs.
 *
 * 3 pages re-cut by scripts/neet/retax.ts from a generated-papers/_plan-*.json.
 * Order matches `subtopicOrder`.
 */
export const NEET_CH_CK_NOTES: Record<string, SubtopicNote> = {
  "nch-ck-rate": NEET_CH_CK_RATE_NOTE,
  "nch-ck-integrated": NEET_CH_CK_INTEGRATED_NOTE,
  "nch-ck-temperature": NEET_CH_CK_TEMPERATURE_NOTE,
};

export const NEET_CH_CK_SLUGS = Object.keys(NEET_CH_CK_NOTES);

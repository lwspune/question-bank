import type { SubtopicNote } from "@/app/notes/_types";
import { NEET_CH_EQ_CONSTANTS_NOTE } from "./constants";
import { NEET_CH_EQ_SHIFTS_NOTE } from "./shifts";
import { NEET_CH_EQ_ACIDS_NOTE } from "./acids";
import { NEET_CH_EQ_SALTS_NOTE } from "./salts";
import { NEET_CH_EQ_KSP_NOTE } from "./ksp";

export { NEET_CH_EQ_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/neet-chemistry/equilibrium/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `nch-eq-` here and `ncheq-` on concept slugs.
 *
 * 5 pages re-cut by scripts/neet/retax.ts from a generated-papers/_plan-*.json.
 * Order matches `subtopicOrder`.
 */
export const NEET_CH_EQ_NOTES: Record<string, SubtopicNote> = {
  "nch-eq-constants": NEET_CH_EQ_CONSTANTS_NOTE,
  "nch-eq-shifts": NEET_CH_EQ_SHIFTS_NOTE,
  "nch-eq-acids": NEET_CH_EQ_ACIDS_NOTE,
  "nch-eq-salts": NEET_CH_EQ_SALTS_NOTE,
  "nch-eq-ksp": NEET_CH_EQ_KSP_NOTE,
};

export const NEET_CH_EQ_SLUGS = Object.keys(NEET_CH_EQ_NOTES);

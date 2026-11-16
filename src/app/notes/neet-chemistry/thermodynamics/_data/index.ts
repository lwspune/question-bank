import type { SubtopicNote } from "@/app/notes/_types";
import { NEET_CH_TH_FIRST_LAW_NOTE } from "./first-law";
import { NEET_CH_TH_ENTHALPY_NOTE } from "./enthalpy";
import { NEET_CH_TH_SPONTANEITY_NOTE } from "./spontaneity";

export { NEET_CH_TH_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/neet-chemistry/thermodynamics/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `nch-th-` here and `ncht-` on concept slugs.
 *
 * 3 pages re-cut by scripts/neet/retax.ts from a generated-papers/_plan-*.json.
 * Order matches `subtopicOrder`.
 */
export const NEET_CH_TH_NOTES: Record<string, SubtopicNote> = {
  "nch-th-first-law": NEET_CH_TH_FIRST_LAW_NOTE,
  "nch-th-enthalpy": NEET_CH_TH_ENTHALPY_NOTE,
  "nch-th-spontaneity": NEET_CH_TH_SPONTANEITY_NOTE,
};

export const NEET_CH_TH_SLUGS = Object.keys(NEET_CH_TH_NOTES);

import type { SubtopicNote } from "@/app/notes/_types";
import { NEET_PH_UM_UNITS_NOTE } from "./units";
import { NEET_PH_UM_DIMS_NOTE } from "./dims";
import { NEET_PH_UM_ERRORS_NOTE } from "./errors";
import { NEET_PH_UM_INSTRUMENTS_NOTE } from "./instruments";

export { NEET_PH_UM_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/neet-physics/units-and-measurements/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `nph-um-` here and `nphum-` on concept slugs.
 *
 * 4 pages re-cut by scripts/neet/retax.ts from a generated-papers/_plan-*.json.
 * Order matches `subtopicOrder`.
 */
export const NEET_PH_UM_NOTES: Record<string, SubtopicNote> = {
  "nph-um-units": NEET_PH_UM_UNITS_NOTE,
  "nph-um-dims": NEET_PH_UM_DIMS_NOTE,
  "nph-um-errors": NEET_PH_UM_ERRORS_NOTE,
  "nph-um-instruments": NEET_PH_UM_INSTRUMENTS_NOTE,
};

export const NEET_PH_UM_SLUGS = Object.keys(NEET_PH_UM_NOTES);

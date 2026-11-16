import type { SubtopicNote } from "@/app/notes/_types";
import { NEET_PH_EP_POTENTIAL_NOTE } from "./potential";
import { NEET_PH_EP_ENERGY_NOTE } from "./energy";
import { NEET_PH_EP_CAPACITANCE_NOTE } from "./capacitance";
import { NEET_PH_EP_COMBINATIONS_NOTE } from "./combinations";

export { NEET_PH_EP_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/neet-physics/electrostatic-potential/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `nph-ep-` here and `nphep-` on concept slugs.
 *
 * 4 pages re-cut by scripts/neet/retax.ts from a generated-papers/_plan-*.json.
 * Order matches `subtopicOrder`.
 */
export const NEET_PH_EP_NOTES: Record<string, SubtopicNote> = {
  "nph-ep-potential": NEET_PH_EP_POTENTIAL_NOTE,
  "nph-ep-energy": NEET_PH_EP_ENERGY_NOTE,
  "nph-ep-capacitance": NEET_PH_EP_CAPACITANCE_NOTE,
  "nph-ep-combinations": NEET_PH_EP_COMBINATIONS_NOTE,
};

export const NEET_PH_EP_SLUGS = Object.keys(NEET_PH_EP_NOTES);

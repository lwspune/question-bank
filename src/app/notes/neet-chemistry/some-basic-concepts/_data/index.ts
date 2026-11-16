import type { SubtopicNote } from "@/app/notes/_types";
import { NEET_CH_SB_MEASUREMENT_NOTE } from "./measurement";
import { NEET_CH_SB_MOLE_NOTE } from "./mole";
import { NEET_CH_SB_STOICHIOMETRY_NOTE } from "./stoichiometry";

export { NEET_CH_SB_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/neet-chemistry/some-basic-concepts/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `nch-sb-` here and `nchsb-` on concept slugs.
 *
 * 3 pages re-cut by scripts/neet/retax.ts from a generated-papers/_plan-*.json.
 * Order matches `subtopicOrder`.
 */
export const NEET_CH_SB_NOTES: Record<string, SubtopicNote> = {
  "nch-sb-measurement": NEET_CH_SB_MEASUREMENT_NOTE,
  "nch-sb-mole": NEET_CH_SB_MOLE_NOTE,
  "nch-sb-stoichiometry": NEET_CH_SB_STOICHIOMETRY_NOTE,
};

export const NEET_CH_SB_SLUGS = Object.keys(NEET_CH_SB_NOTES);

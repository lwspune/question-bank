import type { SubtopicNote } from "@/app/notes/_types";
import { NEET_CH_AL_PREP_NOTE } from "./prep";
import { NEET_CH_AL_REACTIONS_NOTE } from "./reactions";
import { NEET_CH_AL_PHENOLS_ETHERS_NOTE } from "./phenols-ethers";

export { NEET_CH_AL_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/neet-chemistry/alcohols-phenols-and-ethers/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `nch-al-` here and `nchal-` on concept slugs.
 *
 * 3 pages re-cut by scripts/neet/retax.ts from a generated-papers/_plan-*.json.
 * Order matches `subtopicOrder`.
 */
export const NEET_CH_AL_NOTES: Record<string, SubtopicNote> = {
  "nch-al-prep": NEET_CH_AL_PREP_NOTE,
  "nch-al-reactions": NEET_CH_AL_REACTIONS_NOTE,
  "nch-al-phenols-ethers": NEET_CH_AL_PHENOLS_ETHERS_NOTE,
};

export const NEET_CH_AL_SLUGS = Object.keys(NEET_CH_AL_NOTES);

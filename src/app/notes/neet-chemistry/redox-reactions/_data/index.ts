import type { SubtopicNote } from "@/app/notes/_types";
import { NEET_CH_RR_OXIDATION_NOTE } from "./oxidation";
import { NEET_CH_RR_REACTIONS_NOTE } from "./reactions";

export { NEET_CH_RR_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/neet-chemistry/redox-reactions/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `nch-rr-` here and `nchrr-` on concept slugs.
 *
 * 2 pages re-cut by scripts/neet/retax.ts from a generated-papers/_plan-*.json.
 * Order matches `subtopicOrder`.
 */
export const NEET_CH_RR_NOTES: Record<string, SubtopicNote> = {
  "nch-rr-oxidation": NEET_CH_RR_OXIDATION_NOTE,
  "nch-rr-reactions": NEET_CH_RR_REACTIONS_NOTE,
};

export const NEET_CH_RR_SLUGS = Object.keys(NEET_CH_RR_NOTES);

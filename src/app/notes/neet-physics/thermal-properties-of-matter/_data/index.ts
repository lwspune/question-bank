import type { SubtopicNote } from "@/app/notes/_types";
import { NEET_PH_TP_EXPANSION_NOTE } from "./expansion";
import { NEET_PH_TP_TRANSFER_NOTE } from "./transfer";

export { NEET_PH_TP_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/neet-physics/thermal-properties-of-matter/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `nph-tp-` here and `nphtp-` on concept slugs.
 *
 * 2 pages re-cut by scripts/neet/retax.ts from a generated-papers/_plan-*.json.
 * Order matches `subtopicOrder`.
 */
export const NEET_PH_TP_NOTES: Record<string, SubtopicNote> = {
  "nph-tp-expansion": NEET_PH_TP_EXPANSION_NOTE,
  "nph-tp-transfer": NEET_PH_TP_TRANSFER_NOTE,
};

export const NEET_PH_TP_SLUGS = Object.keys(NEET_PH_TP_NOTES);

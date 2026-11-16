import type { SubtopicNote } from "@/app/notes/_types";
import { NEET_PH_TD_FIRST_LAW_NOTE } from "./first-law";
import { NEET_PH_TD_PROCESSES_NOTE } from "./processes";

export { NEET_PH_TD_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/neet-physics/thermodynamics/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `nph-td-` here and `nphtd-` on concept slugs.
 *
 * 2 pages re-cut by scripts/neet/retax.ts from a generated-papers/_plan-*.json.
 * Order matches `subtopicOrder`.
 */
export const NEET_PH_TD_NOTES: Record<string, SubtopicNote> = {
  "nph-td-first-law": NEET_PH_TD_FIRST_LAW_NOTE,
  "nph-td-processes": NEET_PH_TD_PROCESSES_NOTE,
};

export const NEET_PH_TD_SLUGS = Object.keys(NEET_PH_TD_NOTES);

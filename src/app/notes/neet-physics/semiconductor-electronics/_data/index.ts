import type { SubtopicNote } from "@/app/notes/_types";
import { NEET_PH_SE_JUNCTION_NOTE } from "./junction";
import { NEET_PH_SE_DEVICES_NOTE } from "./devices";
import { NEET_PH_SE_GATES_NOTE } from "./gates";

export { NEET_PH_SE_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/neet-physics/semiconductor-electronics/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `nph-se-` here and `nphse-` on concept slugs.
 *
 * 3 pages re-cut by scripts/neet/retax.ts from a generated-papers/_plan-*.json.
 * Order matches `subtopicOrder`.
 */
export const NEET_PH_SE_NOTES: Record<string, SubtopicNote> = {
  "nph-se-junction": NEET_PH_SE_JUNCTION_NOTE,
  "nph-se-devices": NEET_PH_SE_DEVICES_NOTE,
  "nph-se-gates": NEET_PH_SE_GATES_NOTE,
};

export const NEET_PH_SE_SLUGS = Object.keys(NEET_PH_SE_NOTES);

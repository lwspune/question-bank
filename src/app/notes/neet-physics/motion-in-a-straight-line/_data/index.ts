import type { SubtopicNote } from "@/app/notes/_types";
import { NEET_PH_MS_VELOCITY_NOTE } from "./velocity";
import { NEET_PH_MS_GRAPHS_NOTE } from "./graphs";
import { NEET_PH_MS_EQUATIONS_NOTE } from "./equations";

export { NEET_PH_MS_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/neet-physics/motion-in-a-straight-line/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `nph-ms-` here and `nphms-` on concept slugs.
 *
 * 3 pages re-cut by scripts/neet/retax.ts from a generated-papers/_plan-*.json.
 * Order matches `subtopicOrder`.
 */
export const NEET_PH_MS_NOTES: Record<string, SubtopicNote> = {
  "nph-ms-velocity": NEET_PH_MS_VELOCITY_NOTE,
  "nph-ms-graphs": NEET_PH_MS_GRAPHS_NOTE,
  "nph-ms-equations": NEET_PH_MS_EQUATIONS_NOTE,
};

export const NEET_PH_MS_SLUGS = Object.keys(NEET_PH_MS_NOTES);

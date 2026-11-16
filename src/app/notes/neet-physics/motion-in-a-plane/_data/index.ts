import type { SubtopicNote } from "@/app/notes/_types";
import { NEET_PH_MP_PROJECTILE_NOTE } from "./projectile";
import { NEET_PH_MP_CIRCULAR_NOTE } from "./circular";

export { NEET_PH_MP_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/neet-physics/motion-in-a-plane/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `nph-mp-` here and `nphmp-` on concept slugs.
 *
 * 2 pages re-cut by scripts/neet/retax.ts from a generated-papers/_plan-*.json.
 * Order matches `subtopicOrder`.
 */
export const NEET_PH_MP_NOTES: Record<string, SubtopicNote> = {
  "nph-mp-projectile": NEET_PH_MP_PROJECTILE_NOTE,
  "nph-mp-circular": NEET_PH_MP_CIRCULAR_NOTE,
};

export const NEET_PH_MP_SLUGS = Object.keys(NEET_PH_MP_NOTES);

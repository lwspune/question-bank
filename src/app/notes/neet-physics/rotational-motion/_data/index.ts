import type { SubtopicNote } from "@/app/notes/_types";
import { NEET_PH_RM_COM_NOTE } from "./com";
import { NEET_PH_RM_TORQUE_NOTE } from "./torque";
import { NEET_PH_RM_INERTIA_NOTE } from "./inertia";
import { NEET_PH_RM_ROTATION_NOTE } from "./rotation";

export { NEET_PH_RM_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/neet-physics/rotational-motion/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `nph-rm-` here and `nphrm-` on concept slugs.
 *
 * 4 pages re-cut by scripts/neet/retax.ts from a generated-papers/_plan-*.json.
 * Order matches `subtopicOrder`.
 */
export const NEET_PH_RM_NOTES: Record<string, SubtopicNote> = {
  "nph-rm-com": NEET_PH_RM_COM_NOTE,
  "nph-rm-torque": NEET_PH_RM_TORQUE_NOTE,
  "nph-rm-inertia": NEET_PH_RM_INERTIA_NOTE,
  "nph-rm-rotation": NEET_PH_RM_ROTATION_NOTE,
};

export const NEET_PH_RM_SLUGS = Object.keys(NEET_PH_RM_NOTES);

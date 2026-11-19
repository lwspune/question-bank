import type { SubtopicNote } from "@/app/notes/_types";
import { HB9_MO_SPEED_NOTE } from "./speed";
import { HB9_MO_GRAPHS_NOTE } from "./graphs";

export { HB9_MOTION_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/homi-bhabha-9-physics/motion/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `hb9-mo-` here and `hb9mo-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/homi-bhabha/notes/plans/motion.ts). Order matches `subtopicOrder`.
 */
export const HB9_MOTION_NOTES: Record<string, SubtopicNote> = {
  "hb9-mo-speed": HB9_MO_SPEED_NOTE,
  "hb9-mo-graphs": HB9_MO_GRAPHS_NOTE,
};

export const HB9_MOTION_SLUGS = Object.keys(HB9_MOTION_NOTES);

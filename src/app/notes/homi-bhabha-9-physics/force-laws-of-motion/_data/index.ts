import type { SubtopicNote } from "@/app/notes/_types";
import { HB9_FL_FORCES_NOTE } from "./forces";
import { HB9_FL_LAWS_NOTE } from "./laws";
import { HB9_FL_MOMENTUM_NOTE } from "./momentum";

export { HB9_FORCE_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/homi-bhabha-9-physics/force-laws-of-motion/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `hb9-fl-` here and `hb9fl-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/homi-bhabha/notes/plans/force-laws-of-motion.ts). Order matches `subtopicOrder`.
 */
export const HB9_FORCE_NOTES: Record<string, SubtopicNote> = {
  "hb9-fl-forces": HB9_FL_FORCES_NOTE,
  "hb9-fl-laws": HB9_FL_LAWS_NOTE,
  "hb9-fl-momentum": HB9_FL_MOMENTUM_NOTE,
};

export const HB9_FORCE_SLUGS = Object.keys(HB9_FORCE_NOTES);

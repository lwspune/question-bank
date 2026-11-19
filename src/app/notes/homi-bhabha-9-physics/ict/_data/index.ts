import type { SubtopicNote } from "@/app/notes/_types";
import { HB9_IC_HARDWARE_NOTE } from "./hardware";
import { HB9_IC_NETWORKS_NOTE } from "./networks";

export { HB9_ICT_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/homi-bhabha-9-physics/ict/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `hb9-ic-` here and `hb9ic-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/homi-bhabha/notes/plans/ict.ts). Order matches `subtopicOrder`.
 */
export const HB9_ICT_NOTES: Record<string, SubtopicNote> = {
  "hb9-ic-hardware": HB9_IC_HARDWARE_NOTE,
  "hb9-ic-networks": HB9_IC_NETWORKS_NOTE,
};

export const HB9_ICT_SLUGS = Object.keys(HB9_ICT_NOTES);

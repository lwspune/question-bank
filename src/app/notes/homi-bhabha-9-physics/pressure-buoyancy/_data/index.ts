import type { SubtopicNote } from "@/app/notes/_types";
import { HB9_PB_PRESSURE_NOTE } from "./pressure";
import { HB9_PB_BUOYANCY_NOTE } from "./buoyancy";

export { HB9_PRESSURE_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/homi-bhabha-9-physics/pressure-buoyancy/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `hb9-pb-` here and `hb9pb-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/homi-bhabha/notes/plans/pressure-buoyancy.ts). Order matches `subtopicOrder`.
 */
export const HB9_PRESSURE_NOTES: Record<string, SubtopicNote> = {
  "hb9-pb-pressure": HB9_PB_PRESSURE_NOTE,
  "hb9-pb-buoyancy": HB9_PB_BUOYANCY_NOTE,
};

export const HB9_PRESSURE_SLUGS = Object.keys(HB9_PRESSURE_NOTES);

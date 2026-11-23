import type { SubtopicNote } from "@/app/notes/_types";
import { HB9_WE_WORK_NOTE } from "./work";
import { HB9_WE_KINETIC_NOTE } from "./kinetic";
import { HB9_WE_CONSERVATION_NOTE } from "./conservation";
import { HB9_WE_POWER_NOTE } from "./power";

export { HB9_WORK_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/homi-bhabha-9-physics/work-energy-power/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `hb9-we-` here and `hb9we-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/homi-bhabha/notes/plans/work-energy-power.ts). Order matches `subtopicOrder`.
 */
export const HB9_WORK_NOTES: Record<string, SubtopicNote> = {
  "hb9-we-work": HB9_WE_WORK_NOTE,
  "hb9-we-kinetic": HB9_WE_KINETIC_NOTE,
  "hb9-we-conservation": HB9_WE_CONSERVATION_NOTE,
  "hb9-we-power": HB9_WE_POWER_NOTE,
};

export const HB9_WORK_SLUGS = Object.keys(HB9_WORK_NOTES);

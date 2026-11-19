import type { SubtopicNote } from "@/app/notes/_types";
import { HB9_AW_AIR_NOTE } from "./air";
import { HB9_AW_GASES_NOTE } from "./gases";

export { HB9_AIR_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/homi-bhabha-9-chemistry/air-water-gases/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `hb9-aw-` here and `hb9aw-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/homi-bhabha/notes/plans/air-water-gases.ts). Order matches `subtopicOrder`.
 */
export const HB9_AIR_NOTES: Record<string, SubtopicNote> = {
  "hb9-aw-air": HB9_AW_AIR_NOTE,
  "hb9-aw-gases": HB9_AW_GASES_NOTE,
};

export const HB9_AIR_SLUGS = Object.keys(HB9_AIR_NOTES);

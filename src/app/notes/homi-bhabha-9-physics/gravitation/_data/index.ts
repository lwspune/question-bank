import type { SubtopicNote } from "@/app/notes/_types";
import { HB9_GR_LAW_NOTE } from "./law";
import { HB9_GR_FREEFALL_NOTE } from "./freefall";

export { HB9_GRAVITATION_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/homi-bhabha-9-physics/gravitation/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `hb9-gr-` here and `hb9gr-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/homi-bhabha/notes/plans/gravitation.ts). Order matches `subtopicOrder`.
 */
export const HB9_GRAVITATION_NOTES: Record<string, SubtopicNote> = {
  "hb9-gr-law": HB9_GR_LAW_NOTE,
  "hb9-gr-freefall": HB9_GR_FREEFALL_NOTE,
};

export const HB9_GRAVITATION_SLUGS = Object.keys(HB9_GRAVITATION_NOTES);

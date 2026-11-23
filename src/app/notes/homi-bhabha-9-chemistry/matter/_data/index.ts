import type { SubtopicNote } from "@/app/notes/_types";
import { HB9_MN_STATES_NOTE } from "./states";
import { HB9_MN_COMPOSITION_NOTE } from "./composition";
import { HB9_MN_SEPARATION_NOTE } from "./separation";

export { HB9_MATTER_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/homi-bhabha-9-chemistry/matter/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `hb9-mn-` here and `hb9mn-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/homi-bhabha/notes/plans/matter.ts). Order matches `subtopicOrder`.
 */
export const HB9_MATTER_NOTES: Record<string, SubtopicNote> = {
  "hb9-mn-states": HB9_MN_STATES_NOTE,
  "hb9-mn-composition": HB9_MN_COMPOSITION_NOTE,
  "hb9-mn-separation": HB9_MN_SEPARATION_NOTE,
};

export const HB9_MATTER_SLUGS = Object.keys(HB9_MATTER_NOTES);

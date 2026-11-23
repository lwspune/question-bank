import type { SubtopicNote } from "@/app/notes/_types";
import { HB9_CE_STATIC_NOTE } from "./static";
import { HB9_CE_CURRENT_NOTE } from "./current";
import { HB9_CE_RESISTANCE_NOTE } from "./resistance";
import { HB9_CE_COMBINATIONS_NOTE } from "./combinations";
import { HB9_CE_POWER_NOTE } from "./power";

export { HB9_ELECTRICITY_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/homi-bhabha-9-physics/current-electricity/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `hb9-ce-` here and `hb9ce-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/homi-bhabha/notes/plans/current-electricity.ts). Order matches `subtopicOrder`.
 */
export const HB9_ELECTRICITY_NOTES: Record<string, SubtopicNote> = {
  "hb9-ce-static": HB9_CE_STATIC_NOTE,
  "hb9-ce-current": HB9_CE_CURRENT_NOTE,
  "hb9-ce-resistance": HB9_CE_RESISTANCE_NOTE,
  "hb9-ce-combinations": HB9_CE_COMBINATIONS_NOTE,
  "hb9-ce-power": HB9_CE_POWER_NOTE,
};

export const HB9_ELECTRICITY_SLUGS = Object.keys(HB9_ELECTRICITY_NOTES);

import type { SubtopicNote } from "@/app/notes/_types";
import { HB9_HE_TEMPERATURE_NOTE } from "./temperature";
import { HB9_HE_TRANSFER_NOTE } from "./transfer";
import { HB9_HE_EXPANSION_NOTE } from "./expansion";

export { HB9_HEAT_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/homi-bhabha-9-physics/heat/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `hb9-he-` here and `hb9he-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/homi-bhabha/notes/plans/heat.ts). Order matches `subtopicOrder`.
 */
export const HB9_HEAT_NOTES: Record<string, SubtopicNote> = {
  "hb9-he-temperature": HB9_HE_TEMPERATURE_NOTE,
  "hb9-he-transfer": HB9_HE_TRANSFER_NOTE,
  "hb9-he-expansion": HB9_HE_EXPANSION_NOTE,
};

export const HB9_HEAT_SLUGS = Object.keys(HB9_HEAT_NOTES);

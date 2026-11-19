import type { SubtopicNote } from "@/app/notes/_types";
import { HB9_CT_ORGANELLES_NOTE } from "./organelles";
import { HB9_CT_OSMOSIS_NOTE } from "./osmosis";
import { HB9_CT_PLANT_NOTE } from "./plant";
import { HB9_CT_ANIMAL_NOTE } from "./animal";

export { HB9_CELL_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/homi-bhabha-9-biology/cell-tissues/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `hb9-ct-` here and `hb9ct-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/homi-bhabha/notes/plans/cell-tissues.ts). Order matches `subtopicOrder`.
 */
export const HB9_CELL_NOTES: Record<string, SubtopicNote> = {
  "hb9-ct-organelles": HB9_CT_ORGANELLES_NOTE,
  "hb9-ct-osmosis": HB9_CT_OSMOSIS_NOTE,
  "hb9-ct-plant": HB9_CT_PLANT_NOTE,
  "hb9-ct-animal": HB9_CT_ANIMAL_NOTE,
};

export const HB9_CELL_SLUGS = Object.keys(HB9_CELL_NOTES);

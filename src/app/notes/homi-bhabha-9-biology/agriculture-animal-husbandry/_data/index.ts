import type { SubtopicNote } from "@/app/notes/_types";
import { HB9_AG_CROPS_NOTE } from "./crops";
import { HB9_AG_PROTECT_NOTE } from "./protect";
import { HB9_AG_BREEDS_NOTE } from "./breeds";
import { HB9_AG_FISH_NOTE } from "./fish";

export { HB9_AGRICULTURE_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/homi-bhabha-9-biology/agriculture-animal-husbandry/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `hb9-ag-` here and `hb9ag-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/homi-bhabha/notes/plans/agriculture-animal-husbandry.ts). Order matches `subtopicOrder`.
 */
export const HB9_AGRICULTURE_NOTES: Record<string, SubtopicNote> = {
  "hb9-ag-crops": HB9_AG_CROPS_NOTE,
  "hb9-ag-protect": HB9_AG_PROTECT_NOTE,
  "hb9-ag-breeds": HB9_AG_BREEDS_NOTE,
  "hb9-ag-fish": HB9_AG_FISH_NOTE,
};

export const HB9_AGRICULTURE_SLUGS = Object.keys(HB9_AGRICULTURE_NOTES);

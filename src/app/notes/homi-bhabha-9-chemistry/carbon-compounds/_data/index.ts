import type { SubtopicNote } from "@/app/notes/_types";
import { HB9_CC_BONDS_NOTE } from "./bonds";
import { HB9_CC_ALLOTROPES_NOTE } from "./allotropes";
import { HB9_CC_FUELS_NOTE } from "./fuels";

export { HB9_CARBON_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/homi-bhabha-9-chemistry/carbon-compounds/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `hb9-cc-` here and `hb9cc-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/homi-bhabha/notes/plans/carbon-compounds.ts). Order matches `subtopicOrder`.
 */
export const HB9_CARBON_NOTES: Record<string, SubtopicNote> = {
  "hb9-cc-bonds": HB9_CC_BONDS_NOTE,
  "hb9-cc-allotropes": HB9_CC_ALLOTROPES_NOTE,
  "hb9-cc-fuels": HB9_CC_FUELS_NOTE,
};

export const HB9_CARBON_SLUGS = Object.keys(HB9_CARBON_NOTES);

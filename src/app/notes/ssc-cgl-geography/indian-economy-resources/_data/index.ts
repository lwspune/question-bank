import type { SubtopicNote } from "@/app/notes/_types";
import { SSC_GIE_POPULATION_NOTE } from "./population";
import { SSC_GIE_AGRICULTURE_NOTE } from "./agriculture";
import { SSC_GIE_MINERALS_NOTE } from "./minerals";
import { SSC_GIE_INDUSTRIES_NOTE } from "./industries";
import { SSC_GIE_TRANSPORT_NOTE } from "./transport";

export { SSC_INDIAN_ECONOMY_RESOURCES_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-geography/indian-economy-resources/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc-gie-` here and `sscgie-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape/indian-economy-resources.ts). Order matches `subtopicOrder`.
 */
export const SSC_INDIAN_ECONOMY_RESOURCES_NOTES: Record<string, SubtopicNote> = {
  "ssc-gie-population": SSC_GIE_POPULATION_NOTE,
  "ssc-gie-agriculture": SSC_GIE_AGRICULTURE_NOTE,
  "ssc-gie-minerals": SSC_GIE_MINERALS_NOTE,
  "ssc-gie-industries": SSC_GIE_INDUSTRIES_NOTE,
  "ssc-gie-transport": SSC_GIE_TRANSPORT_NOTE,
};

export const SSC_INDIAN_ECONOMY_RESOURCES_SLUGS = Object.keys(SSC_INDIAN_ECONOMY_RESOURCES_NOTES);

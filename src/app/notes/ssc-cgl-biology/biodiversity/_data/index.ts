import type { SubtopicNote } from "@/app/notes/_types";
import { SSC_BBC_PLANTS_NOTE } from "./plants";
import { SSC_BBC_ANIMALS_NOTE } from "./animals";

export { SSC_BIODIVERSITY_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-biology/biodiversity/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc-bbc-` here and `sscbbc-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape/biodiversity.ts). Order matches `subtopicOrder`.
 */
export const SSC_BIODIVERSITY_NOTES: Record<string, SubtopicNote> = {
  "ssc-bbc-plants": SSC_BBC_PLANTS_NOTE,
  "ssc-bbc-animals": SSC_BBC_ANIMALS_NOTE,
};

export const SSC_BIODIVERSITY_SLUGS = Object.keys(SSC_BIODIVERSITY_NOTES);

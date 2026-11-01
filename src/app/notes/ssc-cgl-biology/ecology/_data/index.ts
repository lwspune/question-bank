import type { SubtopicNote } from "@/app/notes/_types";
import { SSC_BEE_ECOSYSTEMS_NOTE } from "./ecosystems";

export { SSC_ECOLOGY_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-biology/ecology/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc-bee-` here and `sscbee-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape/ecology.ts). Order matches `subtopicOrder`.
 */
export const SSC_ECOLOGY_NOTES: Record<string, SubtopicNote> = {
  "ssc-bee-ecosystems": SSC_BEE_ECOSYSTEMS_NOTE,
};

export const SSC_ECOLOGY_SLUGS = Object.keys(SSC_ECOLOGY_NOTES);

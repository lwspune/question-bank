import type { SubtopicNote } from "@/app/notes/_types";
import { SSC_FAS_SPACE_NOTE } from "./space";

export { SSC_ASTRONOMY_SPACE_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-physics/astronomy-space/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc-fas-` here and `sscfas-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape/astronomy-space.ts). Order matches `subtopicOrder`.
 */
export const SSC_ASTRONOMY_SPACE_NOTES: Record<string, SubtopicNote> = {
  "ssc-fas-space": SSC_FAS_SPACE_NOTE,
};

export const SSC_ASTRONOMY_SPACE_SLUGS = Object.keys(SSC_ASTRONOMY_SPACE_NOTES);

import type { SubtopicNote } from "@/app/notes/_types";
import { SSC_SSE_PARKS_NOTE } from "./parks";
import { SSC_SSE_SPACE_NOTE } from "./space";

export { SSC_SCIENCE_SPACE_ENVIRONMENT_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-static-gk/science-space-environment/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc-sse-` here and `sscsse-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape/science-space-environment.ts). Order matches `subtopicOrder`.
 */
export const SSC_SCIENCE_SPACE_ENVIRONMENT_NOTES: Record<string, SubtopicNote> = {
  "ssc-sse-parks": SSC_SSE_PARKS_NOTE,
  "ssc-sse-space": SSC_SSE_SPACE_NOTE,
};

export const SSC_SCIENCE_SPACE_ENVIRONMENT_SLUGS = Object.keys(SSC_SCIENCE_SPACE_ENVIRONMENT_NOTES);

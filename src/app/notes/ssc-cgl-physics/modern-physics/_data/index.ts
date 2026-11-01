import type { SubtopicNote } from "@/app/notes/_types";
import { SSC_FMP_MODERN_NOTE } from "./modern";

export { SSC_MODERN_PHYSICS_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-physics/modern-physics/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc-fmp-` here and `sscfmp-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape/modern-physics.ts). Order matches `subtopicOrder`.
 */
export const SSC_MODERN_PHYSICS_NOTES: Record<string, SubtopicNote> = {
  "ssc-fmp-modern": SSC_FMP_MODERN_NOTE,
};

export const SSC_MODERN_PHYSICS_SLUGS = Object.keys(SSC_MODERN_PHYSICS_NOTES);

import type { SubtopicNote } from "@/app/notes/_types";
import { SSC_CAB_ACIDS_NOTE } from "./acids";

export { SSC_ACIDS_BASES_SALTS_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-chemistry/acids-bases-salts/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc-cab-` here and `ssccab-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape/acids-bases-salts.ts). Order matches `subtopicOrder`.
 */
export const SSC_ACIDS_BASES_SALTS_NOTES: Record<string, SubtopicNote> = {
  "ssc-cab-acids": SSC_CAB_ACIDS_NOTE,
};

export const SSC_ACIDS_BASES_SALTS_SLUGS = Object.keys(SSC_ACIDS_BASES_SALTS_NOTES);

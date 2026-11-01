import type { SubtopicNote } from "@/app/notes/_types";
import { SSC_CEL_EVERYDAY_NOTE } from "./everyday";

export { SSC_EVERYDAY_CHEMISTRY_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-chemistry/everyday-chemistry/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc-cel-` here and `ssccel-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape/everyday-chemistry.ts). Order matches `subtopicOrder`.
 */
export const SSC_EVERYDAY_CHEMISTRY_NOTES: Record<string, SubtopicNote> = {
  "ssc-cel-everyday": SSC_CEL_EVERYDAY_NOTE,
};

export const SSC_EVERYDAY_CHEMISTRY_SLUGS = Object.keys(SSC_EVERYDAY_CHEMISTRY_NOTES);

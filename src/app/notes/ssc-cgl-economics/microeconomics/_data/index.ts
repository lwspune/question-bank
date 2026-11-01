import type { SubtopicNote } from "@/app/notes/_types";
import { SSC_XMI_BASICS_NOTE } from "./basics";

export { SSC_MICROECONOMICS_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-economics/microeconomics/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc-xmi-` here and `sscxmi-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape/microeconomics.ts). Order matches `subtopicOrder`.
 */
export const SSC_MICROECONOMICS_NOTES: Record<string, SubtopicNote> = {
  "ssc-xmi-basics": SSC_XMI_BASICS_NOTE,
};

export const SSC_MICROECONOMICS_SLUGS = Object.keys(SSC_MICROECONOMICS_NOTES);

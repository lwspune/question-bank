import type { SubtopicNote } from "@/app/notes/_types";
import { SSC_REF_EMBEDDED_NOTE } from "./embedded";
import { SSC_REF_PATTERN_NOTE } from "./pattern";

export { SSC_EMBEDDED_FIGURES_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-reasoning/embedded-figures/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc-ref-` here and `sscref-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape/embedded-figures.ts). Order matches `subtopicOrder`.
 */
export const SSC_EMBEDDED_FIGURES_NOTES: Record<string, SubtopicNote> = {
  "ssc-ref-embedded": SSC_REF_EMBEDDED_NOTE,
  "ssc-ref-pattern": SSC_REF_PATTERN_NOTE,
};

export const SSC_EMBEDDED_FIGURES_SLUGS = Object.keys(SSC_EMBEDDED_FIGURES_NOTES);

import type { SubtopicNote } from "@/app/notes/_types";
import { SSC2_REF_FIGURES_NOTE } from "./figures";

export { SSC2_EMBEDDED_FIGURES_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-tier-2-reasoning/embedded-figures/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc2-ref-` here and `ssc2ref-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape-t2/embedded-figures.ts). Order matches `subtopicOrder`.
 */
export const SSC2_EMBEDDED_FIGURES_NOTES: Record<string, SubtopicNote> = {
  "ssc2-ref-figures": SSC2_REF_FIGURES_NOTE,
};

export const SSC2_EMBEDDED_FIGURES_SLUGS = Object.keys(SSC2_EMBEDDED_FIGURES_NOTES);

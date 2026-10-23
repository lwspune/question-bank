import type { SubtopicNote } from "@/app/notes/_types";
import { SSC_RPF_QUARTER_NOTE } from "./quarter";
import { SSC_RPF_OTHER_NOTE } from "./other";

export { SSC_PAPER_FOLDING_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-reasoning/paper-folding/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc-rpf-` here and `sscrpf-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape/paper-folding.ts). Order matches `subtopicOrder`.
 */
export const SSC_PAPER_FOLDING_NOTES: Record<string, SubtopicNote> = {
  "ssc-rpf-quarter": SSC_RPF_QUARTER_NOTE,
  "ssc-rpf-other": SSC_RPF_OTHER_NOTE,
};

export const SSC_PAPER_FOLDING_SLUGS = Object.keys(SSC_PAPER_FOLDING_NOTES);

import type { SubtopicNote } from "@/app/notes/_types";
import { SSC_RST_CONCLUSIONS_NOTE } from "./conclusions";
import { SSC_RST_ASSUMPTIONS_NOTE } from "./assumptions";
import { SSC_RST_ACTIONS_NOTE } from "./actions";

export { SSC_STATEMENTS_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-reasoning/statements/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc-rst-` here and `sscrst-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape/statements.ts). Order matches `subtopicOrder`.
 */
export const SSC_STATEMENTS_NOTES: Record<string, SubtopicNote> = {
  "ssc-rst-conclusions": SSC_RST_CONCLUSIONS_NOTE,
  "ssc-rst-assumptions": SSC_RST_ASSUMPTIONS_NOTE,
  "ssc-rst-actions": SSC_RST_ACTIONS_NOTE,
};

export const SSC_STATEMENTS_SLUGS = Object.keys(SSC_STATEMENTS_NOTES);

import type { SubtopicNote } from "@/app/notes/_types";
import { SSC2_RST_LOGIC_NOTE } from "./logic";

export { SSC2_STATEMENTS_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-tier-2-reasoning/statements/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc2-rst-` here and `ssc2rst-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape-t2/statements.ts). Order matches `subtopicOrder`.
 */
export const SSC2_STATEMENTS_NOTES: Record<string, SubtopicNote> = {
  "ssc2-rst-logic": SSC2_RST_LOGIC_NOTE,
};

export const SSC2_STATEMENTS_SLUGS = Object.keys(SSC2_STATEMENTS_NOTES);

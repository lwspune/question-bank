import type { SubtopicNote } from "@/app/notes/_types";
import { TRUTH_TABLES_MR_NOTE } from "./truth-tables";
import { CONNECTIVES_MR_NOTE } from "./connectives";
import { NEGATION_MR_NOTE } from "./negation";
import { IMPLICATIONS_MR_NOTE } from "./implications";

export { JEE_MATHEMATICAL_REASONING_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/jee-mains-maths/mathematical-reasoning/[subtopicSlug].
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is
 * GLOBALLY unique across NOTES_CHAPTERS — hence `jee-mr-` here and `jmr-` on
 * concept slugs.
 */
export const JEE_MATHEMATICAL_REASONING_NOTES: Record<string, SubtopicNote> = {
  "jee-mr-truth-tables": TRUTH_TABLES_MR_NOTE,
  "jee-mr-connectives": CONNECTIVES_MR_NOTE,
  "jee-mr-negation": NEGATION_MR_NOTE,
  "jee-mr-implications": IMPLICATIONS_MR_NOTE,
};

export const JEE_MATHEMATICAL_REASONING_SLUGS = Object.keys(JEE_MATHEMATICAL_REASONING_NOTES);

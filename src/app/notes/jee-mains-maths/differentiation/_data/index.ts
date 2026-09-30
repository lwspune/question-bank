import type { SubtopicNote } from "@/app/notes/_types";
import { CHAIN_DIFF_NOTE } from "./chain";
import { IMPLICIT_DIFF_NOTE } from "./implicit";
import { FUNCTIONAL_DIFF_NOTE } from "./functional";
import { PIECEWISE_DIFF_NOTE } from "./piecewise";
import { COUNTING_DIFF_NOTE } from "./counting";

export { JEE_DIFFERENTIATION_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/jee-mains-maths/differentiation/[subtopicSlug].
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is
 * GLOBALLY unique across NOTES_CHAPTERS — hence `jee-diff-` here and `jdiff-` on
 * concept slugs.
 */
export const JEE_DIFFERENTIATION_NOTES: Record<string, SubtopicNote> = {
  "jee-diff-chain": CHAIN_DIFF_NOTE,
  "jee-diff-implicit": IMPLICIT_DIFF_NOTE,
  "jee-diff-functional": FUNCTIONAL_DIFF_NOTE,
  "jee-diff-piecewise": PIECEWISE_DIFF_NOTE,
  "jee-diff-counting": COUNTING_DIFF_NOTE,
};

export const JEE_DIFFERENTIATION_SLUGS = Object.keys(JEE_DIFFERENTIATION_NOTES);

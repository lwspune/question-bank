import type { SubtopicNote } from "@/app/notes/_types";
import { STATEMENTS_CONNECTIVES_NOTE } from "./statements-connectives-truth-tables";
import { FINDING_TRUTH_VALUES_NOTE } from "./finding-truth-values";
import { NEGATION_QUANTIFIERS_NOTE } from "./negation-and-quantifiers";
import { CONVERSE_INVERSE_CONTRAPOSITIVE_NOTE } from "./converse-inverse-contrapositive";
import { LOGICAL_EQUIVALENCE_ALGEBRA_NOTE } from "./logical-equivalence-algebra";
import { SWITCHING_CIRCUITS_NOTE } from "./switching-circuits";

export { MATHEMATICAL_LOGIC_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for
 * /notes/mht-cet-maths/mathematical-logic/[subtopicSlug].
 * Keys must match the URL slug; chapter.subtopicOrder owns rendering order.
 */
export const MATHEMATICAL_LOGIC_NOTES: Record<string, SubtopicNote> = {
  "statements-connectives-truth-tables": STATEMENTS_CONNECTIVES_NOTE,
  "finding-truth-values": FINDING_TRUTH_VALUES_NOTE,
  "negation-and-quantifiers": NEGATION_QUANTIFIERS_NOTE,
  "converse-inverse-contrapositive": CONVERSE_INVERSE_CONTRAPOSITIVE_NOTE,
  "logical-equivalence-algebra": LOGICAL_EQUIVALENCE_ALGEBRA_NOTE,
  "switching-circuits": SWITCHING_CIRCUITS_NOTE,
};

export const MATHEMATICAL_LOGIC_SLUGS = Object.keys(MATHEMATICAL_LOGIC_NOTES);

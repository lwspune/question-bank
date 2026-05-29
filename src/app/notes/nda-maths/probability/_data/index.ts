import type { SubtopicNote } from "@/app/notes/_types";
import { CLASSICAL_PROBABILITY_COUNTING_NOTE } from "./classical-probability-counting";
import { EVENT_ALGEBRA_ADDITION_RULE_NOTE } from "./event-algebra-addition-rule";
import { INDEPENDENT_EVENTS_NOTE } from "./independent-events";
import { CONDITIONAL_PROBABILITY_BAYES_NOTE } from "./conditional-probability-bayes";

export { PROBABILITY_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/nda-maths/probability/[subtopicSlug].
 * Keys must match the URL slug; chapter.subtopicOrder owns rendering order.
 * Adding a new note = author the file + add the entry here.
 */
export const PROBABILITY_NOTES: Record<string, SubtopicNote> = {
  "classical-probability-counting": CLASSICAL_PROBABILITY_COUNTING_NOTE,
  "event-algebra-addition-rule": EVENT_ALGEBRA_ADDITION_RULE_NOTE,
  "independent-events": INDEPENDENT_EVENTS_NOTE,
  "conditional-probability-bayes": CONDITIONAL_PROBABILITY_BAYES_NOTE,
};

export const PROBABILITY_SLUGS = Object.keys(PROBABILITY_NOTES);

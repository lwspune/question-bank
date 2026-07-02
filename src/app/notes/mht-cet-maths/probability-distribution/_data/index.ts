import type { SubtopicNote } from "@/app/notes/_types";
import { CLASSICAL_PROBABILITY_NOTE } from "./classical-probability-odds";
import { CONDITIONAL_BAYES_NOTE } from "./conditional-independence-bayes";
import { DISCRETE_RV_NOTE } from "./discrete-random-variables";
import { EXPECTATION_VARIANCE_SD_NOTE } from "./expectation-variance-sd";

export { PROBABILITY_DISTRIBUTION_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for
 * /notes/mht-cet-maths/probability-distribution/[subtopicSlug].
 * Keys must match the URL slug; chapter.subtopicOrder owns rendering order.
 */
export const PROBABILITY_DISTRIBUTION_NOTES: Record<string, SubtopicNote> = {
  "classical-probability-odds": CLASSICAL_PROBABILITY_NOTE,
  "conditional-independence-bayes": CONDITIONAL_BAYES_NOTE,
  "discrete-random-variables": DISCRETE_RV_NOTE,
  "expectation-variance-sd": EXPECTATION_VARIANCE_SD_NOTE,
};

export const PROBABILITY_DISTRIBUTION_SLUGS = Object.keys(
  PROBABILITY_DISTRIBUTION_NOTES
);

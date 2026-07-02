import type { SubtopicNote } from "@/app/notes/_types";
import { BINOMIAL_SETTING_NOTE } from "./binomial-setting-pmf";
import { COMPUTING_BINOMIAL_NOTE } from "./computing-binomial-probabilities";
import { BINOMIAL_MEAN_VARIANCE_NOTE } from "./binomial-mean-variance";
import { BINOMIAL_PARAMETER_NOTE } from "./binomial-parameter-estimation";

export { BINOMIAL_DISTRIBUTION_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for
 * /notes/mht-cet-maths/binomial-distribution/[subtopicSlug].
 * Keys must match the URL slug; chapter.subtopicOrder owns rendering order.
 */
export const BINOMIAL_DISTRIBUTION_NOTES: Record<string, SubtopicNote> = {
  "binomial-setting-pmf": BINOMIAL_SETTING_NOTE,
  "computing-binomial-probabilities": COMPUTING_BINOMIAL_NOTE,
  "binomial-mean-variance": BINOMIAL_MEAN_VARIANCE_NOTE,
  "binomial-parameter-estimation": BINOMIAL_PARAMETER_NOTE,
};

export const BINOMIAL_DISTRIBUTION_SLUGS = Object.keys(
  BINOMIAL_DISTRIBUTION_NOTES
);

import type { SubtopicNote } from "@/app/notes/_types";
import { COMPUTING_PROBABILITIES_NOTE } from "./computing-probabilities";
import { MEAN_VARIANCE_NOTE } from "./mean-variance";

export { BINOMIAL_DISTRIBUTION_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for
 * /notes/nda-maths/binomial-distribution/[subtopicSlug].
 * Keys must match the URL slug; chapter.subtopicOrder owns rendering order.
 * Slugs carry the `bd-` prefix so they stay globally unique as
 * question_concept_tags keys.
 */
export const BINOMIAL_DISTRIBUTION_NOTES: Record<string, SubtopicNote> = {
  "bd-computing-probabilities": COMPUTING_PROBABILITIES_NOTE,
  "bd-mean-variance": MEAN_VARIANCE_NOTE,
};

export const BINOMIAL_DISTRIBUTION_SLUGS = Object.keys(
  BINOMIAL_DISTRIBUTION_NOTES
);

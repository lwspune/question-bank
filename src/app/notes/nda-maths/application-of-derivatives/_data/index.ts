import type { SubtopicNote } from "@/app/notes/_types";
import { TANGENTS_NOTE } from "./tangents";
import { MONOTONICITY_EXTREMA_NOTE } from "./monotonicity-extrema";
import { OPTIMISATION_NOTE } from "./optimisation";

export { APPLICATION_OF_DERIVATIVES_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/nda-maths/application-of-derivatives/[subtopicSlug].
 * Keys are globally-unique subtopic slugs (`aod-` prefixed) — also the
 * subtopic_slug in question_concept_tags. Order = chapter teaching order.
 */
export const APPLICATION_OF_DERIVATIVES_NOTES: Record<string, SubtopicNote> = {
  "aod-tangents": TANGENTS_NOTE,
  "aod-monotonicity-extrema": MONOTONICITY_EXTREMA_NOTE,
  "aod-optimisation": OPTIMISATION_NOTE,
};

export const APPLICATION_OF_DERIVATIVES_SLUGS = Object.keys(
  APPLICATION_OF_DERIVATIVES_NOTES
);

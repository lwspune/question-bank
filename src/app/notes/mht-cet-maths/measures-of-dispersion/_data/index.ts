import type { SubtopicNote } from "@/app/notes/_types";
import { MEAN_AND_VARIANCE_FROM_SUMS_NOTE } from "./mean-and-variance-from-sums";
import { SHIFT_AND_SCALE_NOTE } from "./shift-and-scale";
import { STANDARD_SERIES_AND_MISSING_OBSERVATIONS_NOTE } from "./standard-series-and-missing-observations";

export { MHTCET_DISPERSION_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/mht-cet-maths/measures-of-dispersion/[subtopicSlug].
 * `cetdisp-` prefix: concept-tag keys are global and NDA Statistics owns the
 * unprefixed variance/mean slugs.
 */
export const MHTCET_DISPERSION_NOTES: Record<string, SubtopicNote> = {
  "cetdisp-mean-and-variance-from-sums": MEAN_AND_VARIANCE_FROM_SUMS_NOTE,
  "cetdisp-shift-and-scale": SHIFT_AND_SCALE_NOTE,
  "cetdisp-standard-series-and-missing-observations": STANDARD_SERIES_AND_MISSING_OBSERVATIONS_NOTE,
};

export const MHTCET_DISPERSION_SLUGS = Object.keys(MHTCET_DISPERSION_NOTES);

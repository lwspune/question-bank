import type { SubtopicNote } from "@/app/notes/_types";
import { CENTRAL_TENDENCY_NOTE } from "./central-tendency";
import { DISPERSION_NOTE } from "./dispersion";
import { REGRESSION_CORRELATION_NOTE } from "./regression-correlation";
import { FREQUENCY_DISTRIBUTIONS_NOTE } from "./frequency-distributions";

export { STATISTICS_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/nda-maths/statistics/[subtopicSlug].
 * Keys must match the URL slug; chapter.subtopicOrder owns rendering order.
 * Adding a new note = author the file + add the entry here.
 */
export const STATISTICS_NOTES: Record<string, SubtopicNote> = {
  "central-tendency": CENTRAL_TENDENCY_NOTE,
  "dispersion": DISPERSION_NOTE,
  "regression-correlation": REGRESSION_CORRELATION_NOTE,
  "frequency-distributions": FREQUENCY_DISTRIBUTIONS_NOTE,
};

export const STATISTICS_SLUGS = Object.keys(STATISTICS_NOTES);

import type { SubtopicNote } from "@/app/notes/_types";
import { UNITS_AND_DIMENSIONS_NOTE } from "./units-and-dimensions";

export { UNITS_MEASUREMENT_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for
 * /notes/nda-physics/units-measurement-dimensions/[subtopicSlug].
 * Keys must match the URL slug; chapter.subtopicOrder owns rendering order.
 */
export const UNITS_MEASUREMENT_NOTES: Record<string, SubtopicNote> = {
  "umd-units-and-dimensions": UNITS_AND_DIMENSIONS_NOTE,
};

export const UNITS_MEASUREMENT_SLUGS = Object.keys(UNITS_MEASUREMENT_NOTES);

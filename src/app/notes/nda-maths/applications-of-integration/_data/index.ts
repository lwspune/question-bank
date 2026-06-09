import type { SubtopicNote } from "@/app/notes/_types";
import { AREA_BOUNDED_BY_CURVE_NOTE } from "./area-bounded-by-curve";
import { AREA_BETWEEN_CURVES_NOTE } from "./area-between-curves";

export { APPLICATIONS_OF_INTEGRATION_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for
 * /notes/nda-maths/applications-of-integration/[subtopicSlug].
 * Keys are the URL slugs; chapter.subtopicOrder owns rendering order. The
 * `aoi-` prefix keeps the subtopic slugs (and therefore the concept-tag keys)
 * globally unique.
 */
export const APPLICATIONS_OF_INTEGRATION_NOTES: Record<string, SubtopicNote> = {
  "aoi-area-bounded-by-curve": AREA_BOUNDED_BY_CURVE_NOTE,
  "aoi-area-between-curves": AREA_BETWEEN_CURVES_NOTE,
};

export const APPLICATIONS_OF_INTEGRATION_SLUGS = Object.keys(
  APPLICATIONS_OF_INTEGRATION_NOTES,
);

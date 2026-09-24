import type { SubtopicNote } from "@/app/notes/_types";
import { AREA_UNDER_A_CURVE_NOTE } from "./area-under-a-curve";
import { AREA_BETWEEN_CURVES_NOTE } from "./area-between-curves";
import { CONIC_REGIONS_NOTE } from "./conic-regions";

export { MHTCET_APPLICATIONS_OF_DEFINITE_INTEGRAL_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for
 * /notes/mht-cet-maths/applications-of-definite-integral/[subtopicSlug].
 * `cetadi-` prefix: concept-tag keys are global and the NDA sibling owns `aoi-`.
 */
export const MHTCET_APPLICATIONS_OF_DEFINITE_INTEGRAL_NOTES: Record<string, SubtopicNote> = {
  "cetadi-area-under-a-curve": AREA_UNDER_A_CURVE_NOTE,
  "cetadi-area-between-curves": AREA_BETWEEN_CURVES_NOTE,
  "cetadi-conic-regions": CONIC_REGIONS_NOTE,
};

export const MHTCET_APPLICATIONS_OF_DEFINITE_INTEGRAL_SLUGS = Object.keys(
  MHTCET_APPLICATIONS_OF_DEFINITE_INTEGRAL_NOTES
);

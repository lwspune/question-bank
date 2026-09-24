import type { SubtopicNote } from "@/app/notes/_types";
import { FEASIBLE_REGION_NOTE } from "./feasible-region";
import { READING_CONSTRAINTS_NOTE } from "./reading-constraints";
import { CORNER_POINT_METHOD_NOTE } from "./corner-point-method";
import { FORMULATION_AND_SPECIAL_CASES_NOTE } from "./formulation-and-special-cases";

export { MHTCET_LPP_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/mht-cet-maths/linear-programming/[subtopicSlug].
 * `cetlpp-` prefix: concept-tag keys are global.
 */
export const MHTCET_LPP_NOTES: Record<string, SubtopicNote> = {
  "cetlpp-feasible-region": FEASIBLE_REGION_NOTE,
  "cetlpp-reading-constraints": READING_CONSTRAINTS_NOTE,
  "cetlpp-corner-point-method": CORNER_POINT_METHOD_NOTE,
  "cetlpp-formulation-and-special-cases": FORMULATION_AND_SPECIAL_CASES_NOTE,
};

export const MHTCET_LPP_SLUGS = Object.keys(MHTCET_LPP_NOTES);

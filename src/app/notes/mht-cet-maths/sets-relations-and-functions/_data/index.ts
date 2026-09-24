import type { SubtopicNote } from "@/app/notes/_types";
import { SETS_RELATIONS_AND_FUNCTION_TYPES_NOTE } from "./sets-relations-and-function-types";
import { DOMAIN_AND_RANGE_NOTE } from "./domain-and-range";
import { COMPOSITE_FUNCTIONS_NOTE } from "./composite-functions";
import { INVERSE_FUNCTIONS_NOTE } from "./inverse-functions";

export { MHTCET_SRF_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/mht-cet-maths/sets-relations-and-functions/[subtopicSlug].
 * `cetsrf-` prefix: concept-tag keys are global and the NDA siblings own
 * `sets-` and the unprefixed functions slugs.
 */
export const MHTCET_SRF_NOTES: Record<string, SubtopicNote> = {
  "cetsrf-sets-relations-and-function-types": SETS_RELATIONS_AND_FUNCTION_TYPES_NOTE,
  "cetsrf-domain-and-range": DOMAIN_AND_RANGE_NOTE,
  "cetsrf-composite-functions": COMPOSITE_FUNCTIONS_NOTE,
  "cetsrf-inverse-functions": INVERSE_FUNCTIONS_NOTE,
};

export const MHTCET_SRF_SLUGS = Object.keys(MHTCET_SRF_NOTES);

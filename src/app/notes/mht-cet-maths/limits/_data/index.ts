import type { SubtopicNote } from "@/app/notes/_types";
import { EXISTENCE_AND_INFINITY_NOTE } from "./existence-and-infinity";
import { ALGEBRAIC_LIMITS_NOTE } from "./algebraic";
import { TRIGONOMETRIC_LIMITS_NOTE } from "./trigonometric";
import { EXPONENTIAL_LOG_LIMITS_NOTE } from "./exponential-log";
import { CONTINUITY_AT_A_POINT_NOTE } from "./continuity-at-a-point";
import { PIECEWISE_CONTINUITY_NOTE } from "./piecewise-continuity";
import { SPECIAL_FUNCTIONS_NOTE } from "./special-functions";

export { MHTCET_LIMITS_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/mht-cet-maths/limits/[subtopicSlug].
 * Keys must match the URL slug; chapter.subtopicOrder owns rendering order.
 * Slugs carry the `cetlim-` prefix because they double as the concept-tag
 * key, which is global across every notes chapter (the NDA sibling owns
 * `lim-`).
 */
export const MHTCET_LIMITS_NOTES: Record<string, SubtopicNote> = {
  "cetlim-existence-and-infinity": EXISTENCE_AND_INFINITY_NOTE,
  "cetlim-algebraic": ALGEBRAIC_LIMITS_NOTE,
  "cetlim-trigonometric": TRIGONOMETRIC_LIMITS_NOTE,
  "cetlim-exponential-log": EXPONENTIAL_LOG_LIMITS_NOTE,
  "cetlim-continuity-at-a-point": CONTINUITY_AT_A_POINT_NOTE,
  "cetlim-piecewise-continuity": PIECEWISE_CONTINUITY_NOTE,
  "cetlim-special-functions": SPECIAL_FUNCTIONS_NOTE,
};

export const MHTCET_LIMITS_SLUGS = Object.keys(MHTCET_LIMITS_NOTES);

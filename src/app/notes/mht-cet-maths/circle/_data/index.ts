import type { SubtopicNote } from "@/app/notes/_types";
import { EQUATION_OF_A_CIRCLE_NOTE } from "./equation-of-a-circle";
import { CONCENTRIC_AND_TOUCHING_NOTE } from "./concentric-and-touching";
import { TANGENTS_NOTE } from "./tangents";
import { DISTANCE_TO_A_CIRCLE_NOTE } from "./distance-to-a-circle";
import { TWO_CIRCLES_NOTE } from "./two-circles";

export { MHTCET_CIRCLE_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/mht-cet-maths/circle/[subtopicSlug].
 * `cetcir-` prefix: concept-tag keys are global and NDA Circles owns `circ-`.
 */
export const MHTCET_CIRCLE_NOTES: Record<string, SubtopicNote> = {
  "cetcir-equation-of-a-circle": EQUATION_OF_A_CIRCLE_NOTE,
  "cetcir-concentric-and-touching": CONCENTRIC_AND_TOUCHING_NOTE,
  "cetcir-tangents": TANGENTS_NOTE,
  "cetcir-distance-to-a-circle": DISTANCE_TO_A_CIRCLE_NOTE,
  "cetcir-two-circles": TWO_CIRCLES_NOTE,
};

export const MHTCET_CIRCLE_SLUGS = Object.keys(MHTCET_CIRCLE_NOTES);

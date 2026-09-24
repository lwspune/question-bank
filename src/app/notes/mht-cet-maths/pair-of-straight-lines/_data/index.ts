import type { SubtopicNote } from "@/app/notes/_types";
import { JOINT_EQUATION_NOTE } from "./joint-equation";
import { SLOPES_OF_A_PAIR_NOTE } from "./slopes-of-a-pair";
import { ANGLE_BETWEEN_THE_PAIR_NOTE } from "./angle-between-the-pair";
import { GENERAL_SECOND_DEGREE_EQUATION_NOTE } from "./general-second-degree-equation";

export { MHTCET_PAIR_OF_LINES_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/mht-cet-maths/pair-of-straight-lines/[subtopicSlug].
 * `cetpsl-` prefix: concept-tag keys are global.
 */
export const MHTCET_PAIR_OF_LINES_NOTES: Record<string, SubtopicNote> = {
  "cetpsl-joint-equation": JOINT_EQUATION_NOTE,
  "cetpsl-slopes-of-a-pair": SLOPES_OF_A_PAIR_NOTE,
  "cetpsl-angle-between-the-pair": ANGLE_BETWEEN_THE_PAIR_NOTE,
  "cetpsl-general-second-degree-equation": GENERAL_SECOND_DEGREE_EQUATION_NOTE,
};

export const MHTCET_PAIR_OF_LINES_SLUGS = Object.keys(MHTCET_PAIR_OF_LINES_NOTES);

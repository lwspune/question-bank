import type { SubtopicNote } from "@/app/notes/_types";
import { SLOPE_ANGLE_AND_ROTATION_NOTE } from "./slope-angle-and-rotation";
import { FORMS_INTERSECTIONS_AND_CONCURRENCY_NOTE } from "./forms-intersections-and-concurrency";
import { SECTION_FORMULA_AND_RECTANGLES_NOTE } from "./section-formula-and-rectangles";
import { DISTANCE_AND_FOOT_OF_PERPENDICULAR_NOTE } from "./distance-and-foot-of-perpendicular";

export { MHTCET_STRAIGHT_LINE_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/mht-cet-maths/straight-line/[subtopicSlug].
 * `cetsl-` prefix: concept-tag keys are global and NDA Lines owns `lines-`.
 */
export const MHTCET_STRAIGHT_LINE_NOTES: Record<string, SubtopicNote> = {
  "cetsl-slope-angle-and-rotation": SLOPE_ANGLE_AND_ROTATION_NOTE,
  "cetsl-forms-intersections-and-concurrency": FORMS_INTERSECTIONS_AND_CONCURRENCY_NOTE,
  "cetsl-section-formula-and-rectangles": SECTION_FORMULA_AND_RECTANGLES_NOTE,
  "cetsl-distance-and-foot-of-perpendicular": DISTANCE_AND_FOOT_OF_PERPENDICULAR_NOTE,
};

export const MHTCET_STRAIGHT_LINE_SLUGS = Object.keys(MHTCET_STRAIGHT_LINE_NOTES);

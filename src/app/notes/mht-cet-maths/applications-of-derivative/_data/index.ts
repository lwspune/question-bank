import type { SubtopicNote } from "@/app/notes/_types";
import { TANGENTS_NORMALS_NOTE } from "./tangents-normals";
import { ANGLE_BETWEEN_CURVES_NOTE } from "./angle-between-curves";
import { APPROXIMATIONS_NOTE } from "./approximations";
import { RATE_OF_CHANGE_NOTE } from "./rate-of-change";
import { INCREASING_DECREASING_NOTE } from "./increasing-decreasing";
import { MAXIMA_MINIMA_NOTE } from "./maxima-minima";
import { ROLLE_MVT_NOTE } from "./rolle-mvt";

export { APPLICATIONS_OF_DERIVATIVE_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for
 * /notes/mht-cet-maths/applications-of-derivative/[subtopicSlug].
 * Keys must match the URL slug; chapter.subtopicOrder owns rendering order.
 */
export const APPLICATIONS_OF_DERIVATIVE_NOTES: Record<string, SubtopicNote> = {
  "tangents-normals": TANGENTS_NORMALS_NOTE,
  "angle-between-curves": ANGLE_BETWEEN_CURVES_NOTE,
  "approximations": APPROXIMATIONS_NOTE,
  "rate-of-change": RATE_OF_CHANGE_NOTE,
  "increasing-decreasing": INCREASING_DECREASING_NOTE,
  "maxima-minima": MAXIMA_MINIMA_NOTE,
  "rolle-mvt": ROLLE_MVT_NOTE,
};

export const APPLICATIONS_OF_DERIVATIVE_SLUGS = Object.keys(
  APPLICATIONS_OF_DERIVATIVE_NOTES
);

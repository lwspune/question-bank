import type { SubtopicNote } from "@/app/notes/_types";
import { EQUATION_SLOPE_NOTE } from "./equation-slope";
import { DISTANCE_SECTION_LOCUS_NOTE } from "./distance-section-locus";
import { ANGLE_PARALLEL_PERP_NOTE } from "./angle-parallel-perp";
import { TRIANGLES_POLYGONS_NOTE } from "./triangles-polygons";

export { LINES_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/nda-maths/lines/[subtopicSlug].
 * Keys are globally-unique subtopic slugs (`lines-` prefixed) — also the
 * subtopic_slug in question_concept_tags. Order = chapter teaching order.
 */
export const LINES_NOTES: Record<string, SubtopicNote> = {
  "lines-equation-slope": EQUATION_SLOPE_NOTE,
  "lines-distance-section-locus": DISTANCE_SECTION_LOCUS_NOTE,
  "lines-angle-parallel-perp": ANGLE_PARALLEL_PERP_NOTE,
  "lines-triangles-polygons": TRIANGLES_POLYGONS_NOTE,
};

export const LINES_SLUGS = Object.keys(LINES_NOTES);

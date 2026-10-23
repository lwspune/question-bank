import type { SubtopicNote } from "@/app/notes/_types";
import { SSC_CG_POINTS_NOTE } from "./points";
import { SSC_CG_LINE_NOTE } from "./line";
import { SSC_CG_PAIRS_NOTE } from "./pairs";

export { SSC_COORDINATE_GEOMETRY_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-maths/coordinate-geometry/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc-cg-` here and `ssccg-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape/coordinate-geometry.ts). Order matches `subtopicOrder`.
 */
export const SSC_COORDINATE_GEOMETRY_NOTES: Record<string, SubtopicNote> = {
  "ssc-cg-points": SSC_CG_POINTS_NOTE,
  "ssc-cg-line": SSC_CG_LINE_NOTE,
  "ssc-cg-pairs": SSC_CG_PAIRS_NOTE,
};

export const SSC_COORDINATE_GEOMETRY_SLUGS = Object.keys(SSC_COORDINATE_GEOMETRY_NOTES);

import type { SubtopicNote } from "@/app/notes/_types";
import { COORDINATES_DISTANCE_SECTION_NOTE } from "./coordinates-distance-section";
import { DIRECTION_COSINES_RATIOS_NOTE } from "./direction-cosines-ratios";
import { STRAIGHT_LINE_3D_NOTE } from "./straight-line-3d";
import { PLANE_3D_NOTE } from "./plane-3d";
import { SPHERE_3D_NOTE } from "./sphere-3d";

export { THREE_D_GEOMETRY_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/nda-maths/3d-geometry/[subtopicSlug].
 * Keys must match the URL slug AND the subtopic_slug used in
 * question_concept_tags (globally unique across all chapters).
 */
export const THREE_D_GEOMETRY_NOTES: Record<string, SubtopicNote> = {
  "coordinates-distance-section": COORDINATES_DISTANCE_SECTION_NOTE,
  "direction-cosines-ratios": DIRECTION_COSINES_RATIOS_NOTE,
  "straight-line-3d": STRAIGHT_LINE_3D_NOTE,
  "plane-3d": PLANE_3D_NOTE,
  "sphere-3d": SPHERE_3D_NOTE,
};

export const THREE_D_GEOMETRY_SLUGS = Object.keys(THREE_D_GEOMETRY_NOTES);

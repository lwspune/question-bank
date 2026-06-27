import type { SubtopicNote } from "@/app/notes/_types";
import { LINE_EQUATION_NOTE } from "./line-equation";
import { PLANE_EQUATION_NOTE } from "./plane-equation";
import { ANGLES_CONDITIONS_NOTE } from "./angles-conditions";
import { DISTANCES_3D_NOTE } from "./distances-3d";
import { FOOT_IMAGE_PROJECTION_NOTE } from "./foot-image-projection";
import { INTERSECTION_COPLANARITY_SKEW_NOTE } from "./intersection-coplanarity-skew";
import { TETRAHEDRON_GEOMETRY_NOTE } from "./tetrahedron-geometry";

export { LINE_AND_PLANE_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/mht-cet-maths/line-and-plane/[subtopicSlug].
 * Keys must match the URL slug; chapter.subtopicOrder owns rendering order.
 * Slugs (and the cetlp- concept slugs inside) are GLOBALLY unique concept-tag keys.
 */
export const LINE_AND_PLANE_NOTES: Record<string, SubtopicNote> = {
  "line-equation": LINE_EQUATION_NOTE,
  "plane-equation": PLANE_EQUATION_NOTE,
  "angles-conditions": ANGLES_CONDITIONS_NOTE,
  "distances-3d": DISTANCES_3D_NOTE,
  "foot-image-projection": FOOT_IMAGE_PROJECTION_NOTE,
  "intersection-coplanarity-skew": INTERSECTION_COPLANARITY_SKEW_NOTE,
  "tetrahedron-geometry": TETRAHEDRON_GEOMETRY_NOTE,
};

export const LINE_AND_PLANE_SLUGS = Object.keys(LINE_AND_PLANE_NOTES);

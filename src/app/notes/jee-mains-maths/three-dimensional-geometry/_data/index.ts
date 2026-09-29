import type { SubtopicNote } from "@/app/notes/_types";
import { LINES_3D_NOTE } from "./lines";
import { LINE_FOOT_3D_NOTE } from "./line-foot";
import { SKEW_3D_NOTE } from "./skew";
import { PLANE_3D_NOTE } from "./plane";
import { PLANE_DISTANCE_3D_NOTE } from "./plane-distance";
import { LINE_PLANE_3D_NOTE } from "./line-plane";

export { JEE_3D_GEOMETRY_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/jee-mains-maths/three-dimensional-geometry/[subtopicSlug].
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is
 * GLOBALLY unique across NOTES_CHAPTERS — hence `jee-3d-` here and `j3d-` on
 * concept slugs.
 */
export const JEE_3D_GEOMETRY_NOTES: Record<string, SubtopicNote> = {
  "jee-3d-lines": LINES_3D_NOTE,
  "jee-3d-line-foot": LINE_FOOT_3D_NOTE,
  "jee-3d-skew": SKEW_3D_NOTE,
  "jee-3d-plane": PLANE_3D_NOTE,
  "jee-3d-plane-distance": PLANE_DISTANCE_3D_NOTE,
  "jee-3d-line-plane": LINE_PLANE_3D_NOTE,
};

export const JEE_3D_GEOMETRY_SLUGS = Object.keys(JEE_3D_GEOMETRY_NOTES);

import type { SubtopicNote } from "@/app/notes/_types";
import { IMAT_MAT_GEO_ANGLES_TRIANGLES_NOTE } from "./angles-triangles";
import { IMAT_MAT_GEO_AREAS_CIRCLES_NOTE } from "./areas-circles";
import { IMAT_MAT_GEO_SOLIDS_NOTE } from "./solids";
import { IMAT_MAT_GEO_LINES_NOTE } from "./lines";
import { IMAT_MAT_GEO_CIRCLE_PARABOLA_NOTE } from "./circle-parabola";

export { IMAT_MAT_GEO_CHAPTER } from "./chapter";

/** Slug -> page for IMAT Mathematics, Geometry. Order matches `subtopicOrder`. */
export const IMAT_MAT_GEO_NOTES: Record<string, SubtopicNote> = {
  "imat-geo-angles-triangles": IMAT_MAT_GEO_ANGLES_TRIANGLES_NOTE,
  "imat-geo-areas-circles": IMAT_MAT_GEO_AREAS_CIRCLES_NOTE,
  "imat-geo-solids": IMAT_MAT_GEO_SOLIDS_NOTE,
  "imat-geo-lines": IMAT_MAT_GEO_LINES_NOTE,
  "imat-geo-circle-parabola": IMAT_MAT_GEO_CIRCLE_PARABOLA_NOTE,
};

export const IMAT_MAT_GEO_SLUGS = Object.keys(IMAT_MAT_GEO_NOTES);

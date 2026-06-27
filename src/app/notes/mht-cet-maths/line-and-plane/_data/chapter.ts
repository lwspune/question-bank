import type { ChapterNote } from "@/app/notes/_types";

export const LINE_AND_PLANE_CHAPTER: ChapterNote = {
  chapterName: "Line and Plane",
  title: "Line and Plane — MHT-CET Mathematics",
  intro:
    "Line and Plane is the largest 3-D Geometry chapter in MHT-CET Maths and " +
    "one of its hardest — nearly half the questions are HARD. Almost everything " +
    "reduces to two engines: writing a line or plane in the right form, and " +
    "taking a DOT or CROSS product of direction vectors and normals. This " +
    "chapter builds in teaching order: first how to write a LINE (direction " +
    "cosines, symmetric and vector form), then a PLANE (normal, Cartesian, " +
    "intercept and family forms), then the ANGLES and parallel/perpendicular " +
    "conditions between them. From there the applications follow — DISTANCES in " +
    "3-D, the FOOT of a perpendicular with its IMAGE and PROJECTION, the " +
    "INTERSECTION / coplanarity / shortest-distance machinery, and finally " +
    "TETRAHEDRON centroid and volume. New to 3-D? Start with the Line page; " +
    "every later page leans on the direction-vector and cross-product habits it " +
    "builds.",
  subtopicOrder: [
    "line-equation",
    "plane-equation",
    "angles-conditions",
    "distances-3d",
    "foot-image-projection",
    "intersection-coplanarity-skew",
    "tetrahedron-geometry",
  ],
};

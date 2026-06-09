import type { ChapterNote } from "@/app/notes/_types";

export const APPLICATIONS_OF_INTEGRATION_CHAPTER: ChapterNote = {
  chapterName: "Applications of Integration",
  title: "Applications of Integration — NDA Maths",
  intro:
    "Applications of Integration is a compact, visual chapter: 25 PYQs span 2017-2026, and almost all of them ask one " +
    "thing — the AREA of a region in the plane. The integration itself is rarely hard; the marks live in the SETUP. " +
    "You win them by sketching the region, reading the boundary curve and the limit lines off the question, and choosing " +
    "the right model: area under one curve, area between two curves, or a known shape you never integrate at all. " +
    "The notes teach in two movements, foundations first: " +
    "(1) Area Bounded by a Curve, Lines & Axes — the definite integral as signed area, then area under a curve, the " +
    "below-axis and factor-of-2 traps, polygonal regions from modulus boundaries, the parabola-latus-rectum area, step " +
    "functions, and circular segments; " +
    "(2) Area Between Two Curves & Intersection Points — finding where curves meet, the top-minus-bottom integral, " +
    "curve-versus-line regions, and composite regions built by subtracting known areas. " +
    "The recurring lesson across both: get the picture right, count the sign, and don't integrate what you can recognise. " +
    "Every PYQ is tagged.",
  subtopicOrder: [
    "aoi-area-bounded-by-curve",
    "aoi-area-between-curves",
  ],
};

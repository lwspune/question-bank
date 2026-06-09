import type { ChapterNote } from "@/app/notes/_types";

export const PROPERTIES_OF_TRIANGLE_CHAPTER: ChapterNote = {
  chapterName: "Properties of Triangle",
  title: "Properties of Triangle — NDA Maths",
  intro:
    "Properties of Triangle is the toughest yield in NDA Maths — 49 PYQs, 45% of them HARD. Everything connects the sides a, b, c to the angles A, B, C, and the marks come from choosing the right relation: the sine rule, the cosine rule, or a triangle identity that uses A + B + C = π. " +
    "The notes teach in three movements, foundations first: " +
    "(1) Sine & Cosine Rules — the side/angle notation, the sine rule (a/sin A = 2R), the cosine rule, the area formulas, how to read off the nature of a triangle, and the angle-ratio ↔ side-ratio links; " +
    "(2) Triangle Identities — the consequences of A + B + C = π (sin(B+C) = sin A, half-angle forms), the tan A + tan B + tan C = tan A·tan B·tan C identity, and the cos 2A / sin² identities that detect a right angle; " +
    "(3) In-circle & Regular Polygons — the inradius r = Δ/s, the circumradius R = abc/4Δ, the central-angle relation, and the inradius of a regular n-gon. " +
    "Sine/cosine rules and the half/double-angle identities are the highest-leverage tools. Every PYQ is tagged.",
  subtopicOrder: [
    "pt-sine-cosine-rules",
    "pt-triangle-identities",
    "pt-incircle-polygons",
  ],
};

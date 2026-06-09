import type { ChapterNote } from "@/app/notes/_types";

export const CIRCLES_CHAPTER: ChapterNote = {
  chapterName: "Circles",
  title: "Circles — NDA Maths",
  intro:
    "Circles is a compact but reliably tested chapter: 27 PYQs span 2017–2026, and the hard pockets are concentrated in " +
    "the construction problems — building a circle through given points and reading off inscribed-angle facts. Almost every " +
    "question is one of three moves: convert the general equation to centre-and-radius form, build a circle from given data " +
    "(three points, a diameter, a centre on a line, or a family through a chord), or use a circle property (perpendicular " +
    "from the centre bisects a chord, the angle in a semicircle is a right angle, a tangent is perpendicular to the radius). " +
    "The notes teach in three movements, foundations first: " +
    "(1) Circle Equation — what a circle equation is, both standard and general form, how to extract the centre and radius, " +
    "and the everyday properties (intercepts, chords, touching the axes, two-circle intersection) that most EASY/MODERATE " +
    "questions test; " +
    "(2) Circles Through Given Points & Concyclicity — the general-equation system for three points, the perpendicular-bisector " +
    "and centre-on-a-line methods, the family of circles through a chord, the concyclicity test, and the right-triangle " +
    "circumcentre shortcut — this is where the HARD marks live; " +
    "(3) Inscribed Geometry, Tangents & Segments — the angle in a semicircle and the inscribed-angle theorem, circles that " +
    "touch the axes, inscribed squares, the tangent–normal relationship, and segment areas. " +
    "Centre-and-radius extraction is the chapter's centre of gravity — get fluent at completing the square (including the " +
    "divide-by-the-leading-coefficient step) and most of the chapter opens up. Every PYQ is tagged.",
  subtopicOrder: [
    "circ-equation-centre-radius",
    "circ-through-points-concyclicity",
    "circ-inscribed-tangents-segments",
  ],
};

import type { ChapterNote } from "@/app/notes/_types";

export const MHTCET_CIRCLE_CHAPTER: ChapterNote = {
  chapterName: "Circle",
  title: "Circle — MHT-CET Maths",
  intro:
    "Circle is one question a paper and sits in the middle of MHT-CET Maths for difficulty: well over a third of its past-year questions are HARD, and they " +
    "cluster on the tangent page and the two-circles page. Everything in the chapter comes from two facts — a circle is the set of points at distance r " +
    "from its centre, and a tangent is perpendicular to the radius at the point of contact. The distance from the centre to a line therefore decides " +
    "whether the line misses, touches or cuts the circle, and the distance between two centres decides how two circles sit. The greatest and least " +
    "distance from a point to a circle is the distance to the centre plus or minus the radius — the same move the Complex Numbers chapter uses on a disc. " +
    "The pages below run from writing the equation, through concentric and touching circles, tangents, distances, to two circles. Every PYQ is tagged.",
  cardBlurb:
    "Equation forms, concentric and touching circles, tangents and their loci, distances to a circle, and two-circle configurations — the MHT-CET Circle chapter with every past-year question tagged.",
  subtopicOrder: [
    "cetcir-equation-of-a-circle",
    "cetcir-concentric-and-touching",
    "cetcir-tangents",
    "cetcir-distance-to-a-circle",
    "cetcir-two-circles",
  ],
};

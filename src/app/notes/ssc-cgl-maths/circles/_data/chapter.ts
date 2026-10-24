import type { ChapterNote } from "@/app/notes/_types";

export const SSC_CIRCLES_CHAPTER: ChapterNote = {
  chapterName: "Circles",
  title: "Circles: SSC CGL Quantitative Aptitude",
  intro:
    "Circles has 164 questions in the SSC CGL Tier I bank, and 61 of them come from the 2025 shifts. " +
    "Of these, 119 are EASY, 44 MODERATE and just one HARD, so speed matters more than depth: Tier I gives you about 36 seconds a question. " +
    "Almost every length question is one right triangle whose longest side is a radius, the line from an outside point to the centre, or the distance between two centres. " +
    "Almost every angle question is the angle at the centre being twice the angle on the circle, or a tangent meeting a radius at 90°. " +
    "Fifteen questions print a figure and many more describe one, so sketch the centre and mark every right angle before you calculate. " +
    "The examples on these pages state each figure in words, which is the habit to practise.",
  cardBlurb:
    "Chords and their distance from the centre, angles at the centre and in a semicircle, cyclic quadrilaterals, tangent lengths, the alternate segment theorem, power of a point, common tangents and chords, and touching circles.",
  subtopicOrder: [
    "ssc-ci-chords",
    "ssc-ci-angles",
    "ssc-ci-tangents",
    "ssc-ci-power",
    "ssc-ci-common",
    "ssc-ci-touching",
  ],
};

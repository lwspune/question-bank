import type { ChapterNote } from "@/app/notes/_types";

export const AF_AP_CHAPTER: ChapterNote = {
  chapterName: "Area and Perimeter",
  title: "Area and Perimeter: AFCAT Numerical Ability",
  intro:
    "Area and Perimeter has about a hundred practice questions in the bank and no AFCAT past-year question yet; about one in six is HARD. " +
    "Those HARD ones gather where two figures meet, a square drawn inside a circle or a region cut from both, and each of them comes apart into single-figure formulas once the length the figures share is found. " +
    "So the notes build the figures one at a time, each formula grown from the one before it: the triangle as half a rectangle, the hexagon as six triangles, the sector as a slice of a circle. " +
    "Only after that do they put figures together, and then stretch them.",
  cardBlurb:
    "Rectangles, triangles, rhombus and trapezium, regular polygons, circles and sectors, rings and grazing, inscribed figures, shaded regions and changes in dimensions.",
  subtopicOrder: [
    "af-ap-rectangles",
    "af-ap-triangles",
    "af-ap-polygons",
    "af-ap-circles",
    "af-ap-combined",
    "af-ap-change",
  ],
};

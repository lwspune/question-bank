import type { ChapterNote } from "@/app/notes/_types";

export const AF_SV_CHAPTER: ChapterNote = {
  chapterName: "Surface Area and Volume",
  title: "Surface Area and Volume: AFCAT Numerical Ability",
  intro:
    "Surface Area and Volume has 121 practice questions in this bank and no AFCAT past-year question yet, and only 15 of them are marked HARD. " +
    "Almost every question is one formula and a line of arithmetic, so the marks are lost on reading rather than on method: a radius taken for a diameter, a curved surface taken for a total one, a height used where the slant height belongs. " +
    "The pages start with the solids that have flat faces, move to the round ones and their slant heights, then set two solids side by side, and end with the story questions, where something is melted, poured, sunk or dug and the volume before equals the volume after.",
  cardBlurb:
    "Cube, cuboid, prism and pyramid, cylinder, cone and frustum, sphere and hemisphere, joined and inscribed solids, and melting, recasting and displacement.",
  subtopicOrder: [
    "af-sv-cuboid",
    "af-sv-cylinder",
    "af-sv-cone",
    "af-sv-sphere",
    "af-sv-combined",
    "af-sv-recasting",
  ],
};

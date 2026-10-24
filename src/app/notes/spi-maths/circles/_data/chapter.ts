import type { ChapterNote } from "@/app/notes/_types";

export const SPI_CIRCLES_CHAPTER: ChapterNote = {
  chapterName: "Circles",
  title: "Circles: SPI Mathematics",
  intro:
    "Circles has 36 questions in the SPI bank, and two of them are from the 2022 paper. " +
    "Twenty are EASY and only two are HARD, and tangents carry most of the chapter. " +
    "Nearly every question is one right triangle: the radius meets a tangent at 90 degrees, and the perpendicular from the centre meets a chord at 90 degrees, so Pythagoras does the work. " +
    "The harder questions are angles read off a figure, where the skill is picking the right theorem.",
  cardBlurb:
    "Tangent and radius, parallel tangents, equal tangents from a point, the angle between tangents, the incircle, chords, angles in a circle and cyclic quadrilaterals.",
  subtopicOrder: ["spi-ci-radius", "spi-ci-external", "spi-ci-chords"],
};

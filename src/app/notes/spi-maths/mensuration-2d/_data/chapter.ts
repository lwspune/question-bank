import type { ChapterNote } from "@/app/notes/_types";

export const SPI_MENSURATION_2D_CHAPTER: ChapterNote = {
  chapterName: "Mensuration 2D",
  title: "Mensuration 2D: SPI Mathematics",
  intro:
    "Mensuration 2D has 27 questions in the SPI bank, and two of them are from the 2022 paper. " +
    "Sixteen are EASY, eleven MODERATE and none HARD: each is one formula for a perimeter or an area, sometimes run backwards to find a side or a radius. " +
    "The questions that go wrong are the ones that mix up perimeter and area, radius and diameter, or metres and centimetres, so each page names those slips beside its formula.",
  cardBlurb:
    "Rectangles, squares, triangles and the hexagon, circles and wheels, wire bent into new shapes, sectors, the clock hand and segments.",
  subtopicOrder: ["spi-m2-rectangles", "spi-m2-circles", "spi-m2-sectors"],
};

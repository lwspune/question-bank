import type { ChapterNote } from "@/app/notes/_types";

export const MHTCET_SOLID_STATE_CHAPTER: ChapterNote = {
  chapterName: "Solid State",
  title: "Solid State — MHT-CET Chemistry",
  intro:
    "Solid State is the first chapter of the Class 12 Chemistry book and about three questions a paper in MHT-CET, with barely one in fifteen HARD. " +
    "Two thirds of it is arithmetic on four numbers: the particles per cubic unit cell (1, 2, 4), the edge–radius relations, the packing " +
    "efficiencies (52.4%, 68%, 74%) and the density formula that ties them to molar mass. The rest is recall: crystalline against amorphous, " +
    "the seven crystal systems and fourteen Bravais lattices, the void counts, the named point defects, dopants and magnetism. " +
    "The pages below run in the book's order, because each calculation page uses the constants the previous one fixed. Every PYQ is tagged.",
  cardBlurb:
    "Types of solids and crystal systems, unit cells and the edge–radius relations, packing efficiency and voids, density calculations, then defects, semiconductors and magnetism — MHT-CET Solid State with every past-year question tagged.",
  subtopicOrder: [
    "cetss-types-and-crystal-systems",
    "cetss-unit-cells",
    "cetss-packing-and-voids",
    "cetss-density",
    "cetss-defects-and-properties",
  ],
};

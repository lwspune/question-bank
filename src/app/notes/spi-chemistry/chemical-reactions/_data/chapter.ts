import type { ChapterNote } from "@/app/notes/_types";

export const SPI_CHEMICAL_REACTIONS_CHAPTER: ChapterNote = {
  chapterName: "Chemical Reactions",
  title: "Chemical Reactions: SPI Chemistry",
  intro:
    "Chemical Reactions has 8 questions in the SPI bank, and two of them are from the 2022 paper: one names a combination reaction, the other asks why oily food goes rancid. " +
    "Five are EASY, two MODERATE and one HARD. Most ask for a name: reactants, a precipitate, rust, a type of reaction. " +
    "The two that need more thought ask you to read a reaction: the state of water in a hot flame, and what is left when green crystals are heated.",
  cardBlurb:
    "Reactants and products, balancing and state symbols, combination, decomposition, displacement, precipitates, oxidation and reduction, rusting and rancidity.",
  subtopicOrder: ["spi-cr-equations", "spi-cr-oxidation"],
};

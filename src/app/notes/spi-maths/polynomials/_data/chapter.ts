import type { ChapterNote } from "@/app/notes/_types";

export const SPI_POLYNOMIALS_CHAPTER: ChapterNote = {
  chapterName: "Polynomials",
  title: "Polynomials: SPI Mathematics",
  intro:
    "Polynomials has 32 questions in the SPI bank, all from the SPI sample and practice papers and the LWS mock tests, and none from the 2022 paper. " +
    "Seventeen are EASY and four are HARD. Very few need long division: most fall to putting one number into the polynomial, or to reading the sum and the product of the zeroes from the coefficients. " +
    "Learn those two shortcuts well, and keep long division for the questions that ask for a quotient.",
  cardBlurb:
    "Degree and value, zeroes on a graph, factorising by splitting and grouping, the division algorithm, the remainder and factor theorems, and the zeroes of quadratics and cubics against their coefficients.",
  subtopicOrder: ["spi-po-basics", "spi-po-factorising", "spi-po-division", "spi-po-zeroes"],
};

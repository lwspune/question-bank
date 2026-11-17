import type { ChapterNote } from "@/app/notes/_types";

export const SPI_NUMBER_SYSTEM_CHAPTER: ChapterNote = {
  chapterName: "Number System",
  title: "Number System: SPI Mathematics",
  intro:
    "Number System has 52 questions in the SPI bank: six from the 2022 paper and five from the 2026 paper. " +
    "None is HARD: 39 are EASY and 13 are MODERATE, and most take one step once you know the fact behind them, " +
    "such as what a digit is worth in its place, how a number splits into primes, or why the root of a number that is not a perfect square is irrational. " +
    "Work the pages in order, because HCF and LCM are built from prime factors and fraction sums use the LCM.",
  cardBlurb:
    "Number families, place value, digit counts, divisibility rules, primes, prime factorisation, HCF and LCM, fractions, recurring decimals and irrational numbers.",
  subtopicOrder: [
    "spi-ns-types",
    "spi-ns-primes",
    "spi-ns-hcf-lcm",
    "spi-ns-rationals",
    "spi-ns-irrationals",
  ],
};

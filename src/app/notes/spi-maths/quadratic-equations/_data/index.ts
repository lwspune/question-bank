import type { SubtopicNote } from "@/app/notes/_types";
import { SPI_QE_RECOGNISE_NOTE } from "./recognise";
import { SPI_QE_SOLVING_NOTE } from "./solving";
import { SPI_QE_NATURE_NOTE } from "./nature";
import { SPI_QE_SUM_PRODUCT_NOTE } from "./sum-product";

export { SPI_QUADRATIC_EQUATIONS_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/spi-maths/quadratic-equations/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `spi-qe-` here and `spiqe-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/spi/reshape/quadratic-equations.ts). Order matches `subtopicOrder`.
 */
export const SPI_QUADRATIC_EQUATIONS_NOTES: Record<string, SubtopicNote> = {
  "spi-qe-recognise": SPI_QE_RECOGNISE_NOTE,
  "spi-qe-solving": SPI_QE_SOLVING_NOTE,
  "spi-qe-nature": SPI_QE_NATURE_NOTE,
  "spi-qe-sum-product": SPI_QE_SUM_PRODUCT_NOTE,
};

export const SPI_QUADRATIC_EQUATIONS_SLUGS = Object.keys(SPI_QUADRATIC_EQUATIONS_NOTES);

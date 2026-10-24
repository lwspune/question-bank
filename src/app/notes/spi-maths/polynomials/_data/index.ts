import type { SubtopicNote } from "@/app/notes/_types";
import { SPI_PO_BASICS_NOTE } from "./basics";
import { SPI_PO_FACTORISING_NOTE } from "./factorising";
import { SPI_PO_DIVISION_NOTE } from "./division";
import { SPI_PO_ZEROES_NOTE } from "./zeroes";

export { SPI_POLYNOMIALS_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/spi-maths/polynomials/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `spi-po-` here and `spipo-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/spi/reshape/polynomials.ts). Order matches `subtopicOrder`.
 */
export const SPI_POLYNOMIALS_NOTES: Record<string, SubtopicNote> = {
  "spi-po-basics": SPI_PO_BASICS_NOTE,
  "spi-po-factorising": SPI_PO_FACTORISING_NOTE,
  "spi-po-division": SPI_PO_DIVISION_NOTE,
  "spi-po-zeroes": SPI_PO_ZEROES_NOTE,
};

export const SPI_POLYNOMIALS_SLUGS = Object.keys(SPI_POLYNOMIALS_NOTES);

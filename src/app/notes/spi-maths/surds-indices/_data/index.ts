import type { SubtopicNote } from "@/app/notes/_types";
import { SPI_SI_LAWS_NOTE } from "./laws";
import { SPI_SI_FRACTIONAL_NOTE } from "./fractional";
import { SPI_SI_SURDS_NOTE } from "./surds";

export { SPI_SURDS_INDICES_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/spi-maths/surds-indices/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `spi-si-` here and `spisi-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/spi/reshape/surds-indices.ts). Order matches `subtopicOrder`.
 */
export const SPI_SURDS_INDICES_NOTES: Record<string, SubtopicNote> = {
  "spi-si-laws": SPI_SI_LAWS_NOTE,
  "spi-si-fractional": SPI_SI_FRACTIONAL_NOTE,
  "spi-si-surds": SPI_SI_SURDS_NOTE,
};

export const SPI_SURDS_INDICES_SLUGS = Object.keys(SPI_SURDS_INDICES_NOTES);

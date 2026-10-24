import type { SubtopicNote } from "@/app/notes/_types";
import { SPI_MN_PROPERTIES_NOTE } from "./properties";
import { SPI_MN_EXTRACTION_NOTE } from "./extraction";

export { SPI_METALS_NON_METALS_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/spi-chemistry/metals-non-metals/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `spi-mn-` here and `spimn-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/spi/reshape/metals-non-metals.ts). Order matches `subtopicOrder`.
 */
export const SPI_METALS_NON_METALS_NOTES: Record<string, SubtopicNote> = {
  "spi-mn-properties": SPI_MN_PROPERTIES_NOTE,
  "spi-mn-extraction": SPI_MN_EXTRACTION_NOTE,
};

export const SPI_METALS_NON_METALS_SLUGS = Object.keys(SPI_METALS_NON_METALS_NOTES);

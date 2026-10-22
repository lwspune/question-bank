import type { SubtopicNote } from "@/app/notes/_types";
import { SPI_UN_STANDARD_NOTE } from "./standard";
import { SPI_UN_SI_NOTE } from "./si";

export { SPI_UNITS_MEASUREMENT_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/spi-physics/units-measurement/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `spi-un-` here and `spiun-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/spi/reshape/units-measurement.ts). Order matches `subtopicOrder`.
 */
export const SPI_UNITS_MEASUREMENT_NOTES: Record<string, SubtopicNote> = {
  "spi-un-standard": SPI_UN_STANDARD_NOTE,
  "spi-un-si": SPI_UN_SI_NOTE,
};

export const SPI_UNITS_MEASUREMENT_SLUGS = Object.keys(SPI_UNITS_MEASUREMENT_NOTES);

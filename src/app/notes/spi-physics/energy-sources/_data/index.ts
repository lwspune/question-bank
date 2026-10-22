import type { SubtopicNote } from "@/app/notes/_types";
import { SPI_ES_POWER_NOTE } from "./power";
import { SPI_ES_BIO_NOTE } from "./bio";

export { SPI_ENERGY_SOURCES_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/spi-physics/energy-sources/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `spi-es-` here and `spies-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/spi/reshape/energy-sources.ts). Order matches `subtopicOrder`.
 */
export const SPI_ENERGY_SOURCES_NOTES: Record<string, SubtopicNote> = {
  "spi-es-power": SPI_ES_POWER_NOTE,
  "spi-es-bio": SPI_ES_BIO_NOTE,
};

export const SPI_ENERGY_SOURCES_SLUGS = Object.keys(SPI_ENERGY_SOURCES_NOTES);

import type { SubtopicNote } from "@/app/notes/_types";
import { SPI_PF_NORTH_NOTE } from "./north";
import { SPI_PF_PENINSULA_NOTE } from "./peninsula";

export { SPI_INDIAN_PHYSICAL_GEOGRAPHY_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/spi-geography/indian-physical-geography/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `spi-pf-` here and `spipf-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/spi/reshape/indian-physical-geography.ts). Order matches `subtopicOrder`.
 */
export const SPI_INDIAN_PHYSICAL_GEOGRAPHY_NOTES: Record<string, SubtopicNote> = {
  "spi-pf-north": SPI_PF_NORTH_NOTE,
  "spi-pf-peninsula": SPI_PF_PENINSULA_NOTE,
};

export const SPI_INDIAN_PHYSICAL_GEOGRAPHY_SLUGS = Object.keys(SPI_INDIAN_PHYSICAL_GEOGRAPHY_NOTES);

import type { SubtopicNote } from "@/app/notes/_types";
import { SPI_IG_RESOURCES_NOTE } from "./resources";
import { SPI_IG_CROPS_NOTE } from "./crops";
import { SPI_IG_MINERALS_NOTE } from "./minerals";
import { SPI_IG_INDUSTRIES_NOTE } from "./industries";

export { SPI_INDIAN_ECONOMIC_GEOGRAPHY_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/spi-geography/indian-economic-geography/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `spi-ig-` here and `spiig-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/spi/reshape/indian-economic-geography.ts). Order matches `subtopicOrder`.
 */
export const SPI_INDIAN_ECONOMIC_GEOGRAPHY_NOTES: Record<string, SubtopicNote> = {
  "spi-ig-resources": SPI_IG_RESOURCES_NOTE,
  "spi-ig-crops": SPI_IG_CROPS_NOTE,
  "spi-ig-minerals": SPI_IG_MINERALS_NOTE,
  "spi-ig-industries": SPI_IG_INDUSTRIES_NOTE,
};

export const SPI_INDIAN_ECONOMIC_GEOGRAPHY_SLUGS = Object.keys(SPI_INDIAN_ECONOMIC_GEOGRAPHY_NOTES);

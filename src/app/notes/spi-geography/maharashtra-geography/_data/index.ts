import type { SubtopicNote } from "@/app/notes/_types";
import { SPI_MG_RIVERS_NOTE } from "./rivers";

export { SPI_MAHARASHTRA_GEOGRAPHY_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/spi-geography/maharashtra-geography/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `spi-mg-` here and `spimg-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/spi/reshape/maharashtra-geography.ts). Order matches `subtopicOrder`.
 */
export const SPI_MAHARASHTRA_GEOGRAPHY_NOTES: Record<string, SubtopicNote> = {
  "spi-mg-rivers": SPI_MG_RIVERS_NOTE,
};

export const SPI_MAHARASHTRA_GEOGRAPHY_SLUGS = Object.keys(SPI_MAHARASHTRA_GEOGRAPHY_NOTES);

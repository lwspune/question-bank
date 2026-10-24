import type { SubtopicNote } from "@/app/notes/_types";
import { SPI_RSS_NUMBERS_NOTE } from "./numbers";

export { SPI_SERIES_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/spi-reasoning/series/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `spi-rss-` here and `spirss-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/spi/reshape/series.ts). Order matches `subtopicOrder`.
 */
export const SPI_SERIES_NOTES: Record<string, SubtopicNote> = {
  "spi-rss-numbers": SPI_RSS_NUMBERS_NOTE,
};

export const SPI_SERIES_SLUGS = Object.keys(SPI_SERIES_NOTES);

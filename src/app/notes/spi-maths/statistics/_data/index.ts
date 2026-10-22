import type { SubtopicNote } from "@/app/notes/_types";
import { SPI_ST_MEAN_NOTE } from "./mean";
import { SPI_ST_MEDIAN_MODE_NOTE } from "./median-mode";
import { SPI_ST_GROUPED_MEAN_NOTE } from "./grouped-mean";
import { SPI_ST_GROUPED_MEDIAN_NOTE } from "./grouped-median";
import { SPI_ST_RELATION_NOTE } from "./relation";

export { SPI_STATISTICS_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/spi-maths/statistics/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `spi-st-` here and `spist-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/spi/reshape/statistics.ts). Order matches `subtopicOrder`.
 */
export const SPI_STATISTICS_NOTES: Record<string, SubtopicNote> = {
  "spi-st-mean": SPI_ST_MEAN_NOTE,
  "spi-st-median-mode": SPI_ST_MEDIAN_MODE_NOTE,
  "spi-st-grouped-mean": SPI_ST_GROUPED_MEAN_NOTE,
  "spi-st-grouped-median": SPI_ST_GROUPED_MEDIAN_NOTE,
  "spi-st-relation": SPI_ST_RELATION_NOTE,
};

export const SPI_STATISTICS_SLUGS = Object.keys(SPI_STATISTICS_NOTES);

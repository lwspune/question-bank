import type { SubtopicNote } from "@/app/notes/_types";
import { SPI_DI_CHARTS_NOTE } from "./charts";

export { SPI_DATA_INTERPRETATION_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/spi-maths/data-interpretation/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `spi-di-` here and `spidi-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/spi/reshape/data-interpretation.ts). Order matches `subtopicOrder`.
 */
export const SPI_DATA_INTERPRETATION_NOTES: Record<string, SubtopicNote> = {
  "spi-di-charts": SPI_DI_CHARTS_NOTE,
};

export const SPI_DATA_INTERPRETATION_SLUGS = Object.keys(SPI_DATA_INTERPRETATION_NOTES);

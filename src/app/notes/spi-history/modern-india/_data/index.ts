import type { SubtopicNote } from "@/app/notes/_types";
import { SPI_MI_REVOLT_NOTE } from "./revolt";
import { SPI_MI_REFORM_NOTE } from "./reform";
import { SPI_MI_NONCOOP_NOTE } from "./noncoop";
import { SPI_MI_CIVIL_NOTE } from "./civil";

export { SPI_MODERN_INDIA_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/spi-history/modern-india/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `spi-mi-` here and `spimi-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/spi/reshape/modern-india.ts). Order matches `subtopicOrder`.
 */
export const SPI_MODERN_INDIA_NOTES: Record<string, SubtopicNote> = {
  "spi-mi-revolt": SPI_MI_REVOLT_NOTE,
  "spi-mi-reform": SPI_MI_REFORM_NOTE,
  "spi-mi-noncoop": SPI_MI_NONCOOP_NOTE,
  "spi-mi-civil": SPI_MI_CIVIL_NOTE,
};

export const SPI_MODERN_INDIA_SLUGS = Object.keys(SPI_MODERN_INDIA_NOTES);

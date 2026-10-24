import type { SubtopicNote } from "@/app/notes/_types";
import { SPI_WH_HISTORIOGRAPHY_NOTE } from "./historiography";

export { SPI_WORLD_HISTORY_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/spi-history/world-history/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `spi-wh-` here and `spiwh-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/spi/reshape/world-history.ts). Order matches `subtopicOrder`.
 */
export const SPI_WORLD_HISTORY_NOTES: Record<string, SubtopicNote> = {
  "spi-wh-historiography": SPI_WH_HISTORIOGRAPHY_NOTE,
};

export const SPI_WORLD_HISTORY_SLUGS = Object.keys(SPI_WORLD_HISTORY_NOTES);

import type { SubtopicNote } from "@/app/notes/_types";
import { SPI_WG_BASICS_NOTE } from "./basics";

export { SPI_WORLD_HUMAN_GEOGRAPHY_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/spi-geography/world-human-geography/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `spi-wg-` here and `spiwg-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/spi/reshape/world-human-geography.ts). Order matches `subtopicOrder`.
 */
export const SPI_WORLD_HUMAN_GEOGRAPHY_NOTES: Record<string, SubtopicNote> = {
  "spi-wg-basics": SPI_WG_BASICS_NOTE,
};

export const SPI_WORLD_HUMAN_GEOGRAPHY_SLUGS = Object.keys(SPI_WORLD_HUMAN_GEOGRAPHY_NOTES);

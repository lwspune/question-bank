import type { SubtopicNote } from "@/app/notes/_types";
import { SPI_WP_PARTIES_NOTE } from "./parties";

export { SPI_WORLD_POLITY_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/spi-polity/world-polity/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `spi-wp-` here and `spiwp-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/spi/reshape/world-polity.ts). Order matches `subtopicOrder`.
 */
export const SPI_WORLD_POLITY_NOTES: Record<string, SubtopicNote> = {
  "spi-wp-parties": SPI_WP_PARTIES_NOTE,
};

export const SPI_WORLD_POLITY_SLUGS = Object.keys(SPI_WORLD_POLITY_NOTES);

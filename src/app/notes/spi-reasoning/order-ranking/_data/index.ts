import type { SubtopicNote } from "@/app/notes/_types";
import { SPI_OR_RANKS_NOTE } from "./ranks";

export { SPI_ORDER_RANKING_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/spi-reasoning/order-ranking/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `spi-or-` here and `spior-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/spi/reshape/order-ranking.ts). Order matches `subtopicOrder`.
 */
export const SPI_ORDER_RANKING_NOTES: Record<string, SubtopicNote> = {
  "spi-or-ranks": SPI_OR_RANKS_NOTE,
};

export const SPI_ORDER_RANKING_SLUGS = Object.keys(SPI_ORDER_RANKING_NOTES);

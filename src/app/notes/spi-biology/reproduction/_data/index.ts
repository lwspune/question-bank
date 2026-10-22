import type { SubtopicNote } from "@/app/notes/_types";
import { SPI_RP_PLANTS_NOTE } from "./plants";
import { SPI_RP_HUMAN_NOTE } from "./human";

export { SPI_REPRODUCTION_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/spi-biology/reproduction/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `spi-rp-` here and `spirp-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/spi/reshape/reproduction.ts). Order matches `subtopicOrder`.
 */
export const SPI_REPRODUCTION_NOTES: Record<string, SubtopicNote> = {
  "spi-rp-plants": SPI_RP_PLANTS_NOTE,
  "spi-rp-human": SPI_RP_HUMAN_NOTE,
};

export const SPI_REPRODUCTION_SLUGS = Object.keys(SPI_REPRODUCTION_NOTES);

import type { SubtopicNote } from "@/app/notes/_types";
import { SPI_AB_ACIDS_NOTE } from "./acids";
import { SPI_AB_SALTS_NOTE } from "./salts";

export { SPI_ACIDS_BASES_SALTS_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/spi-chemistry/acids-bases-salts/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `spi-ab-` here and `spiab-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/spi/reshape/acids-bases-salts.ts). Order matches `subtopicOrder`.
 */
export const SPI_ACIDS_BASES_SALTS_NOTES: Record<string, SubtopicNote> = {
  "spi-ab-acids": SPI_AB_ACIDS_NOTE,
  "spi-ab-salts": SPI_AB_SALTS_NOTE,
};

export const SPI_ACIDS_BASES_SALTS_SLUGS = Object.keys(SPI_ACIDS_BASES_SALTS_NOTES);

import type { SubtopicNote } from "@/app/notes/_types";
import { SPI_DF_RANKS_NOTE } from "./ranks";
import { SPI_DF_COMMAND_NOTE } from "./command";
import { SPI_DF_EQUIPMENT_NOTE } from "./equipment";

export { SPI_DEFENCE_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/spi-gk/defence/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `spi-df-` here and `spidf-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/spi/reshape/defence.ts). Order matches `subtopicOrder`.
 */
export const SPI_DEFENCE_NOTES: Record<string, SubtopicNote> = {
  "spi-df-ranks": SPI_DF_RANKS_NOTE,
  "spi-df-command": SPI_DF_COMMAND_NOTE,
  "spi-df-equipment": SPI_DF_EQUIPMENT_NOTE,
};

export const SPI_DEFENCE_SLUGS = Object.keys(SPI_DEFENCE_NOTES);

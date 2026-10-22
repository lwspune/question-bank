import type { SubtopicNote } from "@/app/notes/_types";
import { SPI_CB_STRUCTURE_NOTE } from "./structure";
import { SPI_CB_OSMOSIS_NOTE } from "./osmosis";

export { SPI_CELL_BIOLOGY_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/spi-biology/cell-biology/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `spi-cb-` here and `spicb-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/spi/reshape/cell-biology.ts). Order matches `subtopicOrder`.
 */
export const SPI_CELL_BIOLOGY_NOTES: Record<string, SubtopicNote> = {
  "spi-cb-structure": SPI_CB_STRUCTURE_NOTE,
  "spi-cb-osmosis": SPI_CB_OSMOSIS_NOTE,
};

export const SPI_CELL_BIOLOGY_SLUGS = Object.keys(SPI_CELL_BIOLOGY_NOTES);

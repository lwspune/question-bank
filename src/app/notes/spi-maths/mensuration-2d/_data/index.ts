import type { SubtopicNote } from "@/app/notes/_types";
import { SPI_M2_RECTANGLES_NOTE } from "./rectangles";
import { SPI_M2_CIRCLES_NOTE } from "./circles";
import { SPI_M2_SECTORS_NOTE } from "./sectors";

export { SPI_MENSURATION_2D_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/spi-maths/mensuration-2d/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `spi-m2-` here and `spim2-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/spi/reshape/mensuration-2d.ts). Order matches `subtopicOrder`.
 */
export const SPI_MENSURATION_2D_NOTES: Record<string, SubtopicNote> = {
  "spi-m2-rectangles": SPI_M2_RECTANGLES_NOTE,
  "spi-m2-circles": SPI_M2_CIRCLES_NOTE,
  "spi-m2-sectors": SPI_M2_SECTORS_NOTE,
};

export const SPI_MENSURATION_2D_SLUGS = Object.keys(SPI_MENSURATION_2D_NOTES);

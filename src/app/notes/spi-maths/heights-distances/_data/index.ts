import type { SubtopicNote } from "@/app/notes/_types";
import { SPI_HD_ANGLES_NOTE } from "./angles";
import { SPI_HD_SLANT_NOTE } from "./slant";
import { SPI_HD_TWO_ANGLES_NOTE } from "./two-angles";

export { SPI_HEIGHTS_DISTANCES_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/spi-maths/heights-distances/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `spi-hd-` here and `spihd-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/spi/reshape/heights-distances.ts). Order matches `subtopicOrder`.
 */
export const SPI_HEIGHTS_DISTANCES_NOTES: Record<string, SubtopicNote> = {
  "spi-hd-angles": SPI_HD_ANGLES_NOTE,
  "spi-hd-slant": SPI_HD_SLANT_NOTE,
  "spi-hd-two-angles": SPI_HD_TWO_ANGLES_NOTE,
};

export const SPI_HEIGHTS_DISTANCES_SLUGS = Object.keys(SPI_HEIGHTS_DISTANCES_NOTES);

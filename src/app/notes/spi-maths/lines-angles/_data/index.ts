import type { SubtopicNote } from "@/app/notes/_types";
import { SPI_LA_BASICS_NOTE } from "./basics";
import { SPI_LA_PARALLEL_NOTE } from "./parallel";
import { SPI_LA_CONSTRUCTIONS_NOTE } from "./constructions";

export { SPI_LINES_ANGLES_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/spi-maths/lines-angles/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `spi-la-` here and `spila-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/spi/reshape/lines-angles.ts). Order matches `subtopicOrder`.
 */
export const SPI_LINES_ANGLES_NOTES: Record<string, SubtopicNote> = {
  "spi-la-basics": SPI_LA_BASICS_NOTE,
  "spi-la-parallel": SPI_LA_PARALLEL_NOTE,
  "spi-la-constructions": SPI_LA_CONSTRUCTIONS_NOTE,
};

export const SPI_LINES_ANGLES_SLUGS = Object.keys(SPI_LINES_ANGLES_NOTES);

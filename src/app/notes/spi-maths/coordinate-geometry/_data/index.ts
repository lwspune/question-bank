import type { SubtopicNote } from "@/app/notes/_types";
import { SPI_CG_DISTANCE_NOTE } from "./distance";
import { SPI_CG_SECTION_NOTE } from "./section";
import { SPI_CG_LINES_NOTE } from "./lines";

export { SPI_COORDINATE_GEOMETRY_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/spi-maths/coordinate-geometry/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `spi-cg-` here and `spicg-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/spi/reshape/coordinate-geometry.ts). Order matches `subtopicOrder`.
 */
export const SPI_COORDINATE_GEOMETRY_NOTES: Record<string, SubtopicNote> = {
  "spi-cg-distance": SPI_CG_DISTANCE_NOTE,
  "spi-cg-section": SPI_CG_SECTION_NOTE,
  "spi-cg-lines": SPI_CG_LINES_NOTE,
};

export const SPI_COORDINATE_GEOMETRY_SLUGS = Object.keys(SPI_COORDINATE_GEOMETRY_NOTES);

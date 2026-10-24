import type { SubtopicNote } from "@/app/notes/_types";
import { SPI_QU_SHAPES_NOTE } from "./shapes";

export { SPI_QUADRILATERALS_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/spi-maths/quadrilaterals/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `spi-qu-` here and `spiqu-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/spi/reshape/quadrilaterals.ts). Order matches `subtopicOrder`.
 */
export const SPI_QUADRILATERALS_NOTES: Record<string, SubtopicNote> = {
  "spi-qu-shapes": SPI_QU_SHAPES_NOTE,
};

export const SPI_QUADRILATERALS_SLUGS = Object.keys(SPI_QUADRILATERALS_NOTES);

import type { SubtopicNote } from "@/app/notes/_types";
import { SPI_CF_ODD_NOTE } from "./odd";

export { SPI_CLASSIFICATION_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/spi-reasoning/classification/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `spi-cf-` here and `spicf-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/spi/reshape/classification.ts). Order matches `subtopicOrder`.
 */
export const SPI_CLASSIFICATION_NOTES: Record<string, SubtopicNote> = {
  "spi-cf-odd": SPI_CF_ODD_NOTE,
};

export const SPI_CLASSIFICATION_SLUGS = Object.keys(SPI_CLASSIFICATION_NOTES);

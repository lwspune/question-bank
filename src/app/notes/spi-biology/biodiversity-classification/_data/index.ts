import type { SubtopicNote } from "@/app/notes/_types";
import { SPI_BD_KINGDOMS_NOTE } from "./kingdoms";
import { SPI_BD_GROUPS_NOTE } from "./groups";

export { SPI_BIODIVERSITY_CLASSIFICATION_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/spi-biology/biodiversity-classification/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `spi-bd-` here and `spibd-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/spi/reshape/biodiversity-classification.ts). Order matches `subtopicOrder`.
 */
export const SPI_BIODIVERSITY_CLASSIFICATION_NOTES: Record<string, SubtopicNote> = {
  "spi-bd-kingdoms": SPI_BD_KINGDOMS_NOTE,
  "spi-bd-groups": SPI_BD_GROUPS_NOTE,
};

export const SPI_BIODIVERSITY_CLASSIFICATION_SLUGS = Object.keys(SPI_BIODIVERSITY_CLASSIFICATION_NOTES);

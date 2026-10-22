import type { SubtopicNote } from "@/app/notes/_types";
import { SPI_PB_NUTRITION_NOTE } from "./nutrition";
import { SPI_PB_HORMONES_NOTE } from "./hormones";

export { SPI_PLANT_BIOLOGY_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/spi-biology/plant-biology/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `spi-pb-` here and `spipb-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/spi/reshape/plant-biology.ts). Order matches `subtopicOrder`.
 */
export const SPI_PLANT_BIOLOGY_NOTES: Record<string, SubtopicNote> = {
  "spi-pb-nutrition": SPI_PB_NUTRITION_NOTE,
  "spi-pb-hormones": SPI_PB_HORMONES_NOTE,
};

export const SPI_PLANT_BIOLOGY_SLUGS = Object.keys(SPI_PLANT_BIOLOGY_NOTES);

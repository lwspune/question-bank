import type { SubtopicNote } from "@/app/notes/_types";
import { SPI_EC_FOOD_NOTE } from "./food";
import { SPI_EC_ENVIRONMENT_NOTE } from "./environment";

export { SPI_ECOLOGY_ENVIRONMENT_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/spi-biology/ecology-environment/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `spi-ec-` here and `spiec-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/spi/reshape/ecology-environment.ts). Order matches `subtopicOrder`.
 */
export const SPI_ECOLOGY_ENVIRONMENT_NOTES: Record<string, SubtopicNote> = {
  "spi-ec-food": SPI_EC_FOOD_NOTE,
  "spi-ec-environment": SPI_EC_ENVIRONMENT_NOTE,
};

export const SPI_ECOLOGY_ENVIRONMENT_SLUGS = Object.keys(SPI_ECOLOGY_ENVIRONMENT_NOTES);

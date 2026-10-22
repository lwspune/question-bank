import type { SubtopicNote } from "@/app/notes/_types";
import { SPI_LO_REFLECTION_NOTE } from "./reflection";
import { SPI_LO_REFRACTION_NOTE } from "./refraction";
import { SPI_LO_EYE_NOTE } from "./eye";

export { SPI_LIGHT_OPTICS_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/spi-physics/light-optics/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `spi-lo-` here and `spilo-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/spi/reshape/light-optics.ts). Order matches `subtopicOrder`.
 */
export const SPI_LIGHT_OPTICS_NOTES: Record<string, SubtopicNote> = {
  "spi-lo-reflection": SPI_LO_REFLECTION_NOTE,
  "spi-lo-refraction": SPI_LO_REFRACTION_NOTE,
  "spi-lo-eye": SPI_LO_EYE_NOTE,
};

export const SPI_LIGHT_OPTICS_SLUGS = Object.keys(SPI_LIGHT_OPTICS_NOTES);

import type { SubtopicNote } from "@/app/notes/_types";
import { SPI_MB_MICROBES_NOTE } from "./microbes";
import { SPI_MB_DISEASES_NOTE } from "./diseases";

export { SPI_MICROBIOLOGY_DISEASE_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/spi-biology/microbiology-disease/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `spi-mb-` here and `spimb-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/spi/reshape/microbiology-disease.ts). Order matches `subtopicOrder`.
 */
export const SPI_MICROBIOLOGY_DISEASE_NOTES: Record<string, SubtopicNote> = {
  "spi-mb-microbes": SPI_MB_MICROBES_NOTE,
  "spi-mb-diseases": SPI_MB_DISEASES_NOTE,
};

export const SPI_MICROBIOLOGY_DISEASE_SLUGS = Object.keys(SPI_MICROBIOLOGY_DISEASE_NOTES);

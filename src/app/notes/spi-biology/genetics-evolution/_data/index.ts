import type { SubtopicNote } from "@/app/notes/_types";
import { SPI_GE_HEREDITY_NOTE } from "./heredity";
import { SPI_GE_EVOLUTION_NOTE } from "./evolution";

export { SPI_GENETICS_EVOLUTION_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/spi-biology/genetics-evolution/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `spi-ge-` here and `spige-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/spi/reshape/genetics-evolution.ts). Order matches `subtopicOrder`.
 */
export const SPI_GENETICS_EVOLUTION_NOTES: Record<string, SubtopicNote> = {
  "spi-ge-heredity": SPI_GE_HEREDITY_NOTE,
  "spi-ge-evolution": SPI_GE_EVOLUTION_NOTE,
};

export const SPI_GENETICS_EVOLUTION_SLUGS = Object.keys(SPI_GENETICS_EVOLUTION_NOTES);

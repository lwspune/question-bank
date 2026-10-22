import type { SubtopicNote } from "@/app/notes/_types";
import { SPI_ID_MEANINGS_NOTE } from "./meanings";
import { SPI_ID_PHRASAL_NOTE } from "./phrasal";

export { SPI_IDIOMS_PHRASES_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/spi-english/idioms-phrases/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `spi-id-` here and `spiid-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/spi/reshape/idioms-phrases.ts). Order matches `subtopicOrder`.
 */
export const SPI_IDIOMS_PHRASES_NOTES: Record<string, SubtopicNote> = {
  "spi-id-meanings": SPI_ID_MEANINGS_NOTE,
  "spi-id-phrasal": SPI_ID_PHRASAL_NOTE,
};

export const SPI_IDIOMS_PHRASES_SLUGS = Object.keys(SPI_IDIOMS_PHRASES_NOTES);

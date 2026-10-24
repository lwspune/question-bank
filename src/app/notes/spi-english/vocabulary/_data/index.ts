import type { SubtopicNote } from "@/app/notes/_types";
import { SPI_VO_SYNONYMS_NOTE } from "./synonyms";
import { SPI_VO_ANTONYMS_NOTE } from "./antonyms";
import { SPI_VO_FORMS_NOTE } from "./forms";

export { SPI_VOCABULARY_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/spi-english/vocabulary/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `spi-vo-` here and `spivo-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/spi/reshape/vocabulary.ts). Order matches `subtopicOrder`.
 */
export const SPI_VOCABULARY_NOTES: Record<string, SubtopicNote> = {
  "spi-vo-synonyms": SPI_VO_SYNONYMS_NOTE,
  "spi-vo-antonyms": SPI_VO_ANTONYMS_NOTE,
  "spi-vo-forms": SPI_VO_FORMS_NOTE,
};

export const SPI_VOCABULARY_SLUGS = Object.keys(SPI_VOCABULARY_NOTES);

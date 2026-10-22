import type { SubtopicNote } from "@/app/notes/_types";
import { SPI_SE_VERBS_NOTE } from "./verbs";
import { SPI_SE_TENSES_NOTE } from "./tenses";
import { SPI_SE_PREPOSITIONS_NOTE } from "./prepositions";
import { SPI_SE_WORDS_NOTE } from "./words";
import { SPI_SE_NO_ERROR_NOTE } from "./no-error";

export { SPI_SPOTTING_ERRORS_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/spi-english/spotting-errors/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `spi-se-` here and `spise-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/spi/reshape/spotting-errors.ts). Order matches `subtopicOrder`.
 */
export const SPI_SPOTTING_ERRORS_NOTES: Record<string, SubtopicNote> = {
  "spi-se-verbs": SPI_SE_VERBS_NOTE,
  "spi-se-tenses": SPI_SE_TENSES_NOTE,
  "spi-se-prepositions": SPI_SE_PREPOSITIONS_NOTE,
  "spi-se-words": SPI_SE_WORDS_NOTE,
  "spi-se-no-error": SPI_SE_NO_ERROR_NOTE,
};

export const SPI_SPOTTING_ERRORS_SLUGS = Object.keys(SPI_SPOTTING_ERRORS_NOTES);

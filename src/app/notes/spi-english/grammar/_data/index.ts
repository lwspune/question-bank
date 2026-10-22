import type { SubtopicNote } from "@/app/notes/_types";
import { SPI_GR_TENSES_NOTE } from "./tenses";
import { SPI_GR_AGREEMENT_NOTE } from "./agreement";
import { SPI_GR_ARTICLES_NOTE } from "./articles";
import { SPI_GR_PREPOSITIONS_NOTE } from "./prepositions";
import { SPI_GR_PASSIVE_NOTE } from "./passive";
import { SPI_GR_PASSIVE_SPECIAL_NOTE } from "./passive-special";
import { SPI_GR_SPEECH_NOTE } from "./speech";
import { SPI_GR_SPEECH_QUESTIONS_NOTE } from "./speech-questions";

export { SPI_GRAMMAR_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/spi-english/grammar/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `spi-gr-` here and `spigr-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/spi/reshape/grammar.ts). Order matches `subtopicOrder`.
 */
export const SPI_GRAMMAR_NOTES: Record<string, SubtopicNote> = {
  "spi-gr-tenses": SPI_GR_TENSES_NOTE,
  "spi-gr-agreement": SPI_GR_AGREEMENT_NOTE,
  "spi-gr-articles": SPI_GR_ARTICLES_NOTE,
  "spi-gr-prepositions": SPI_GR_PREPOSITIONS_NOTE,
  "spi-gr-passive": SPI_GR_PASSIVE_NOTE,
  "spi-gr-passive-special": SPI_GR_PASSIVE_SPECIAL_NOTE,
  "spi-gr-speech": SPI_GR_SPEECH_NOTE,
  "spi-gr-speech-questions": SPI_GR_SPEECH_QUESTIONS_NOTE,
};

export const SPI_GRAMMAR_SLUGS = Object.keys(SPI_GRAMMAR_NOTES);

import type { SubtopicNote } from "@/app/notes/_types";
import { SPI_SR_OPENING_NOTE } from "./opening";
import { SPI_SR_LINKERS_NOTE } from "./linkers";

export { SPI_SENTENCE_REARRANGEMENT_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/spi-english/sentence-rearrangement/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `spi-sr-` here and `spisr-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/spi/reshape/sentence-rearrangement.ts). Order matches `subtopicOrder`.
 */
export const SPI_SENTENCE_REARRANGEMENT_NOTES: Record<string, SubtopicNote> = {
  "spi-sr-opening": SPI_SR_OPENING_NOTE,
  "spi-sr-linkers": SPI_SR_LINKERS_NOTE,
};

export const SPI_SENTENCE_REARRANGEMENT_SLUGS = Object.keys(SPI_SENTENCE_REARRANGEMENT_NOTES);

import type { SubtopicNote } from "@/app/notes/_types";
import { SPI_AI_FACTORISING_NOTE } from "./factorising";
import { SPI_AI_VALUES_NOTE } from "./values";

export { SPI_ALGEBRAIC_IDENTITIES_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/spi-maths/algebraic-identities/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `spi-ai-` here and `spiai-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/spi/reshape/algebraic-identities.ts). Order matches `subtopicOrder`.
 */
export const SPI_ALGEBRAIC_IDENTITIES_NOTES: Record<string, SubtopicNote> = {
  "spi-ai-factorising": SPI_AI_FACTORISING_NOTE,
  "spi-ai-values": SPI_AI_VALUES_NOTE,
};

export const SPI_ALGEBRAIC_IDENTITIES_SLUGS = Object.keys(SPI_ALGEBRAIC_IDENTITIES_NOTES);

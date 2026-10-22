import type { SubtopicNote } from "@/app/notes/_types";
import { SPI_SQ_NTH_TERM_NOTE } from "./nth-term";
import { SPI_SQ_THREE_TERMS_NOTE } from "./three-terms";
import { SPI_SQ_SUM_NOTE } from "./sum";
import { SPI_SQ_GP_NOTE } from "./gp";

export { SPI_SEQUENCES_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/spi-maths/sequences/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `spi-sq-` here and `spisq-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/spi/reshape/sequences.ts). Order matches `subtopicOrder`.
 */
export const SPI_SEQUENCES_NOTES: Record<string, SubtopicNote> = {
  "spi-sq-nth-term": SPI_SQ_NTH_TERM_NOTE,
  "spi-sq-three-terms": SPI_SQ_THREE_TERMS_NOTE,
  "spi-sq-sum": SPI_SQ_SUM_NOTE,
  "spi-sq-gp": SPI_SQ_GP_NOTE,
};

export const SPI_SEQUENCES_SLUGS = Object.keys(SPI_SEQUENCES_NOTES);

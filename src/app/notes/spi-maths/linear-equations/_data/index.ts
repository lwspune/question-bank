import type { SubtopicNote } from "@/app/notes/_types";
import { SPI_LE_SOLVING_NOTE } from "./solving";
import { SPI_LE_CONSISTENCY_NOTE } from "./consistency";
import { SPI_LE_WORD_NOTE } from "./word";

export { SPI_LINEAR_EQUATIONS_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/spi-maths/linear-equations/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `spi-le-` here and `spile-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/spi/reshape/linear-equations.ts). Order matches `subtopicOrder`.
 */
export const SPI_LINEAR_EQUATIONS_NOTES: Record<string, SubtopicNote> = {
  "spi-le-solving": SPI_LE_SOLVING_NOTE,
  "spi-le-consistency": SPI_LE_CONSISTENCY_NOTE,
  "spi-le-word": SPI_LE_WORD_NOTE,
};

export const SPI_LINEAR_EQUATIONS_SLUGS = Object.keys(SPI_LINEAR_EQUATIONS_NOTES);

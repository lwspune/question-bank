import type { SubtopicNote } from "@/app/notes/_types";
import { SPI_AT_ATOM_NOTE } from "./atom";
import { SPI_AT_TABLE_NOTE } from "./table";

export { SPI_ATOMIC_STRUCTURE_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/spi-chemistry/atomic-structure/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `spi-at-` here and `spiat-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/spi/reshape/atomic-structure.ts). Order matches `subtopicOrder`.
 */
export const SPI_ATOMIC_STRUCTURE_NOTES: Record<string, SubtopicNote> = {
  "spi-at-atom": SPI_AT_ATOM_NOTE,
  "spi-at-table": SPI_AT_TABLE_NOTE,
};

export const SPI_ATOMIC_STRUCTURE_SLUGS = Object.keys(SPI_ATOMIC_STRUCTURE_NOTES);

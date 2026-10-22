import type { SubtopicNote } from "@/app/notes/_types";
import { SPI_GS_PARLIAMENT_NOTE } from "./parliament";

export { SPI_GOVERNMENT_STRUCTURE_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/spi-polity/government-structure/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `spi-gs-` here and `spigs-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/spi/reshape/government-structure.ts). Order matches `subtopicOrder`.
 */
export const SPI_GOVERNMENT_STRUCTURE_NOTES: Record<string, SubtopicNote> = {
  "spi-gs-parliament": SPI_GS_PARLIAMENT_NOTE,
};

export const SPI_GOVERNMENT_STRUCTURE_SLUGS = Object.keys(SPI_GOVERNMENT_STRUCTURE_NOTES);

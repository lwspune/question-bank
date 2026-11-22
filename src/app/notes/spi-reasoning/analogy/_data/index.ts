import type { SubtopicNote } from "@/app/notes/_types";
import { SPI_AN_ANALOGIES_NOTE } from "./analogies";

export { SPI_ANALOGY_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/spi-reasoning/analogy/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `spi-an-` here and `spian-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/spi/reshape/analogy.ts). Order matches `subtopicOrder`.
 */
export const SPI_ANALOGY_NOTES: Record<string, SubtopicNote> = {
  "spi-an-analogies": SPI_AN_ANALOGIES_NOTE,
};

export const SPI_ANALOGY_SLUGS = Object.keys(SPI_ANALOGY_NOTES);

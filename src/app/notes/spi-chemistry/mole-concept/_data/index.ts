import type { SubtopicNote } from "@/app/notes/_types";
import { SPI_MO_FORMULAE_NOTE } from "./formulae";
import { SPI_MO_MOLE_NOTE } from "./mole";

export { SPI_MOLE_CONCEPT_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/spi-chemistry/mole-concept/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `spi-mo-` here and `spimo-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/spi/reshape/mole-concept.ts). Order matches `subtopicOrder`.
 */
export const SPI_MOLE_CONCEPT_NOTES: Record<string, SubtopicNote> = {
  "spi-mo-formulae": SPI_MO_FORMULAE_NOTE,
  "spi-mo-mole": SPI_MO_MOLE_NOTE,
};

export const SPI_MOLE_CONCEPT_SLUGS = Object.keys(SPI_MOLE_CONCEPT_NOTES);

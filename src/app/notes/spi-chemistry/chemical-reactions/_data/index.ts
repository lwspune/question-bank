import type { SubtopicNote } from "@/app/notes/_types";
import { SPI_CR_EQUATIONS_NOTE } from "./equations";
import { SPI_CR_OXIDATION_NOTE } from "./oxidation";

export { SPI_CHEMICAL_REACTIONS_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/spi-chemistry/chemical-reactions/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `spi-cr-` here and `spicr-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/spi/reshape/chemical-reactions.ts). Order matches `subtopicOrder`.
 */
export const SPI_CHEMICAL_REACTIONS_NOTES: Record<string, SubtopicNote> = {
  "spi-cr-equations": SPI_CR_EQUATIONS_NOTE,
  "spi-cr-oxidation": SPI_CR_OXIDATION_NOTE,
};

export const SPI_CHEMICAL_REACTIONS_SLUGS = Object.keys(SPI_CHEMICAL_REACTIONS_NOTES);

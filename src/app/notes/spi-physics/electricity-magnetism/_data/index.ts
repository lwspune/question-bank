import type { SubtopicNote } from "@/app/notes/_types";
import { SPI_EM_OHM_NOTE } from "./ohm";
import { SPI_EM_CIRCUITS_NOTE } from "./circuits";
import { SPI_EM_POWER_NOTE } from "./power";
import { SPI_EM_MAGNETIC_NOTE } from "./magnetic";

export { SPI_ELECTRICITY_MAGNETISM_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/spi-physics/electricity-magnetism/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `spi-em-` here and `spiem-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/spi/reshape/electricity-magnetism.ts). Order matches `subtopicOrder`.
 */
export const SPI_ELECTRICITY_MAGNETISM_NOTES: Record<string, SubtopicNote> = {
  "spi-em-ohm": SPI_EM_OHM_NOTE,
  "spi-em-circuits": SPI_EM_CIRCUITS_NOTE,
  "spi-em-power": SPI_EM_POWER_NOTE,
  "spi-em-magnetic": SPI_EM_MAGNETIC_NOTE,
};

export const SPI_ELECTRICITY_MAGNETISM_SLUGS = Object.keys(SPI_ELECTRICITY_MAGNETISM_NOTES);

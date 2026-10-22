import type { SubtopicNote } from "@/app/notes/_types";
import { SPI_FL_PRESSURE_NOTE } from "./pressure";
import { SPI_FL_BUOYANCY_NOTE } from "./buoyancy";

export { SPI_FLUIDS_MATTER_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/spi-physics/fluids-matter/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `spi-fl-` here and `spifl-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/spi/reshape/fluids-matter.ts). Order matches `subtopicOrder`.
 */
export const SPI_FLUIDS_MATTER_NOTES: Record<string, SubtopicNote> = {
  "spi-fl-pressure": SPI_FL_PRESSURE_NOTE,
  "spi-fl-buoyancy": SPI_FL_BUOYANCY_NOTE,
};

export const SPI_FLUIDS_MATTER_SLUGS = Object.keys(SPI_FLUIDS_MATTER_NOTES);

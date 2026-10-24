import type { SubtopicNote } from "@/app/notes/_types";
import { SPI_GV_GRAVITY_NOTE } from "./gravity";

export { SPI_GRAVITATION_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/spi-physics/gravitation/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `spi-gv-` here and `spigv-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/spi/reshape/gravitation.ts). Order matches `subtopicOrder`.
 */
export const SPI_GRAVITATION_NOTES: Record<string, SubtopicNote> = {
  "spi-gv-gravity": SPI_GV_GRAVITY_NOTE,
};

export const SPI_GRAVITATION_SLUGS = Object.keys(SPI_GRAVITATION_NOTES);

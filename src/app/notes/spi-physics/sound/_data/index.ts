import type { SubtopicNote } from "@/app/notes/_types";
import { SPI_SO_WAVES_NOTE } from "./waves";
import { SPI_SO_HEARING_NOTE } from "./hearing";

export { SPI_SOUND_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/spi-physics/sound/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `spi-so-` here and `spiso-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/spi/reshape/sound.ts). Order matches `subtopicOrder`.
 */
export const SPI_SOUND_NOTES: Record<string, SubtopicNote> = {
  "spi-so-waves": SPI_SO_WAVES_NOTE,
  "spi-so-hearing": SPI_SO_HEARING_NOTE,
};

export const SPI_SOUND_SLUGS = Object.keys(SPI_SOUND_NOTES);

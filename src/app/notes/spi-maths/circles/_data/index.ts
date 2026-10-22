import type { SubtopicNote } from "@/app/notes/_types";
import { SPI_CI_RADIUS_NOTE } from "./radius";
import { SPI_CI_EXTERNAL_NOTE } from "./external";
import { SPI_CI_CHORDS_NOTE } from "./chords";

export { SPI_CIRCLES_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/spi-maths/circles/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `spi-ci-` here and `spici-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/spi/reshape/circles.ts). Order matches `subtopicOrder`.
 */
export const SPI_CIRCLES_NOTES: Record<string, SubtopicNote> = {
  "spi-ci-radius": SPI_CI_RADIUS_NOTE,
  "spi-ci-external": SPI_CI_EXTERNAL_NOTE,
  "spi-ci-chords": SPI_CI_CHORDS_NOTE,
};

export const SPI_CIRCLES_SLUGS = Object.keys(SPI_CIRCLES_NOTES);

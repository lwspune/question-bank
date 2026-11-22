import type { SubtopicNote } from "@/app/notes/_types";
import { SPI_TS_SPEED_NOTE } from "./speed";

export { SPI_TIME_SPEED_DISTANCE_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/spi-maths/time-speed-distance/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `spi-ts-` here and `spits-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/spi/reshape/time-speed-distance.ts). Order matches `subtopicOrder`.
 */
export const SPI_TIME_SPEED_DISTANCE_NOTES: Record<string, SubtopicNote> = {
  "spi-ts-speed": SPI_TS_SPEED_NOTE,
};

export const SPI_TIME_SPEED_DISTANCE_SLUGS = Object.keys(SPI_TIME_SPEED_DISTANCE_NOTES);

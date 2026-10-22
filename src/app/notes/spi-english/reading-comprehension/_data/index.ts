import type { SubtopicNote } from "@/app/notes/_types";
import { SPI_RC_FACTS_NOTE } from "./facts";
import { SPI_RC_INFERENCE_NOTE } from "./inference";

export { SPI_READING_COMPREHENSION_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/spi-english/reading-comprehension/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `spi-rc-` here and `spirc-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/spi/reshape/reading-comprehension.ts). Order matches `subtopicOrder`.
 */
export const SPI_READING_COMPREHENSION_NOTES: Record<string, SubtopicNote> = {
  "spi-rc-facts": SPI_RC_FACTS_NOTE,
  "spi-rc-inference": SPI_RC_INFERENCE_NOTE,
};

export const SPI_READING_COMPREHENSION_SLUGS = Object.keys(SPI_READING_COMPREHENSION_NOTES);

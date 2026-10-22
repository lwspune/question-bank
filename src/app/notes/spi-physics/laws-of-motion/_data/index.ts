import type { SubtopicNote } from "@/app/notes/_types";
import { SPI_LM_MOMENTUM_NOTE } from "./momentum";
import { SPI_LM_FORCES_NOTE } from "./forces";

export { SPI_LAWS_OF_MOTION_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/spi-physics/laws-of-motion/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `spi-lm-` here and `spilm-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/spi/reshape/laws-of-motion.ts). Order matches `subtopicOrder`.
 */
export const SPI_LAWS_OF_MOTION_NOTES: Record<string, SubtopicNote> = {
  "spi-lm-momentum": SPI_LM_MOMENTUM_NOTE,
  "spi-lm-forces": SPI_LM_FORCES_NOTE,
};

export const SPI_LAWS_OF_MOTION_SLUGS = Object.keys(SPI_LAWS_OF_MOTION_NOTES);

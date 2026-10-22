import type { SubtopicNote } from "@/app/notes/_types";
import { SPI_HP_LIFE_NOTE } from "./life";
import { SPI_HP_CONTROL_NOTE } from "./control";

export { SPI_HUMAN_PHYSIOLOGY_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/spi-biology/human-physiology/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `spi-hp-` here and `spihp-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/spi/reshape/human-physiology.ts). Order matches `subtopicOrder`.
 */
export const SPI_HUMAN_PHYSIOLOGY_NOTES: Record<string, SubtopicNote> = {
  "spi-hp-life": SPI_HP_LIFE_NOTE,
  "spi-hp-control": SPI_HP_CONTROL_NOTE,
};

export const SPI_HUMAN_PHYSIOLOGY_SLUGS = Object.keys(SPI_HUMAN_PHYSIOLOGY_NOTES);

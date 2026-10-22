import type { SubtopicNote } from "@/app/notes/_types";
import { SPI_KM_DESCRIBE_NOTE } from "./describe";
import { SPI_KM_GRAPHS_NOTE } from "./graphs";

export { SPI_KINEMATICS_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/spi-physics/kinematics/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `spi-km-` here and `spikm-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/spi/reshape/kinematics.ts). Order matches `subtopicOrder`.
 */
export const SPI_KINEMATICS_NOTES: Record<string, SubtopicNote> = {
  "spi-km-describe": SPI_KM_DESCRIBE_NOTE,
  "spi-km-graphs": SPI_KM_GRAPHS_NOTE,
};

export const SPI_KINEMATICS_SLUGS = Object.keys(SPI_KINEMATICS_NOTES);

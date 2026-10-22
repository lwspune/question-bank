import type { SubtopicNote } from "@/app/notes/_types";
import { SPI_TR_ANGLES_NOTE } from "./angles";
import { SPI_TR_CONGRUENCE_NOTE } from "./congruence";
import { SPI_TR_SIMILAR_NOTE } from "./similar";
import { SPI_TR_AREAS_NOTE } from "./areas";

export { SPI_TRIANGLES_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/spi-maths/triangles/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `spi-tr-` here and `spitr-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/spi/reshape/triangles.ts). Order matches `subtopicOrder`.
 */
export const SPI_TRIANGLES_NOTES: Record<string, SubtopicNote> = {
  "spi-tr-angles": SPI_TR_ANGLES_NOTE,
  "spi-tr-congruence": SPI_TR_CONGRUENCE_NOTE,
  "spi-tr-similar": SPI_TR_SIMILAR_NOTE,
  "spi-tr-areas": SPI_TR_AREAS_NOTE,
};

export const SPI_TRIANGLES_SLUGS = Object.keys(SPI_TRIANGLES_NOTES);

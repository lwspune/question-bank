import type { SubtopicNote } from "@/app/notes/_types";
import { SPI_M3_CUBOIDS_NOTE } from "./cuboids";
import { SPI_M3_CYLINDERS_CONES_NOTE } from "./cylinders-cones";
import { SPI_M3_SPHERES_NOTE } from "./spheres";
import { SPI_M3_FRUSTUM_NOTE } from "./frustum";
import { SPI_M3_RECASTING_NOTE } from "./recasting";

export { SPI_MENSURATION_3D_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/spi-maths/mensuration-3d/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `spi-m3-` here and `spim3-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/spi/reshape/mensuration-3d.ts). Order matches `subtopicOrder`.
 */
export const SPI_MENSURATION_3D_NOTES: Record<string, SubtopicNote> = {
  "spi-m3-cuboids": SPI_M3_CUBOIDS_NOTE,
  "spi-m3-cylinders-cones": SPI_M3_CYLINDERS_CONES_NOTE,
  "spi-m3-spheres": SPI_M3_SPHERES_NOTE,
  "spi-m3-frustum": SPI_M3_FRUSTUM_NOTE,
  "spi-m3-recasting": SPI_M3_RECASTING_NOTE,
};

export const SPI_MENSURATION_3D_SLUGS = Object.keys(SPI_MENSURATION_3D_NOTES);

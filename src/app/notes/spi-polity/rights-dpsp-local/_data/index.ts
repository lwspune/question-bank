import type { SubtopicNote } from "@/app/notes/_types";
import { SPI_FR_RIGHTS_NOTE } from "./rights";
import { SPI_FR_LOCAL_NOTE } from "./local";

export { SPI_RIGHTS_DPSP_LOCAL_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/spi-polity/rights-dpsp-local/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `spi-fr-` here and `spifr-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/spi/reshape/rights-dpsp-local.ts). Order matches `subtopicOrder`.
 */
export const SPI_RIGHTS_DPSP_LOCAL_NOTES: Record<string, SubtopicNote> = {
  "spi-fr-rights": SPI_FR_RIGHTS_NOTE,
  "spi-fr-local": SPI_FR_LOCAL_NOTE,
};

export const SPI_RIGHTS_DPSP_LOCAL_SLUGS = Object.keys(SPI_RIGHTS_DPSP_LOCAL_NOTES);

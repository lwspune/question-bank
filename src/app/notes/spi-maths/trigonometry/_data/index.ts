import type { SubtopicNote } from "@/app/notes/_types";
import { SPI_TG_RATIOS_NOTE } from "./ratios";
import { SPI_TG_VALUES_NOTE } from "./values";
import { SPI_TG_IDENTITIES_NOTE } from "./identities";
import { SPI_TG_COMPLEMENTARY_NOTE } from "./complementary";

export { SPI_TRIGONOMETRY_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/spi-maths/trigonometry/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `spi-tg-` here and `spitg-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/spi/reshape/trigonometry.ts). Order matches `subtopicOrder`.
 */
export const SPI_TRIGONOMETRY_NOTES: Record<string, SubtopicNote> = {
  "spi-tg-ratios": SPI_TG_RATIOS_NOTE,
  "spi-tg-values": SPI_TG_VALUES_NOTE,
  "spi-tg-identities": SPI_TG_IDENTITIES_NOTE,
  "spi-tg-complementary": SPI_TG_COMPLEMENTARY_NOTE,
};

export const SPI_TRIGONOMETRY_SLUGS = Object.keys(SPI_TRIGONOMETRY_NOTES);

import type { SubtopicNote } from "@/app/notes/_types";
import { SPI_CC_HYDROCARBONS_NOTE } from "./hydrocarbons";
import { SPI_CC_REACTIONS_NOTE } from "./reactions";

export { SPI_CARBON_COMPOUNDS_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/spi-chemistry/carbon-compounds/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `spi-cc-` here and `spicc-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/spi/reshape/carbon-compounds.ts). Order matches `subtopicOrder`.
 */
export const SPI_CARBON_COMPOUNDS_NOTES: Record<string, SubtopicNote> = {
  "spi-cc-hydrocarbons": SPI_CC_HYDROCARBONS_NOTE,
  "spi-cc-reactions": SPI_CC_REACTIONS_NOTE,
};

export const SPI_CARBON_COMPOUNDS_SLUGS = Object.keys(SPI_CARBON_COMPOUNDS_NOTES);

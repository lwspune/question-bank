import type { SubtopicNote } from "@/app/notes/_types";
import { SPI_FB_WORDS_NOTE } from "./words";
import { SPI_FB_PREPOSITIONS_NOTE } from "./prepositions";
import { SPI_FB_ARTICLES_NOTE } from "./articles";
import { SPI_FB_TENSES_NOTE } from "./tenses";

export { SPI_FILL_IN_THE_BLANKS_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/spi-english/fill-in-the-blanks/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `spi-fb-` here and `spifb-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/spi/reshape/fill-in-the-blanks.ts). Order matches `subtopicOrder`.
 */
export const SPI_FILL_IN_THE_BLANKS_NOTES: Record<string, SubtopicNote> = {
  "spi-fb-words": SPI_FB_WORDS_NOTE,
  "spi-fb-prepositions": SPI_FB_PREPOSITIONS_NOTE,
  "spi-fb-articles": SPI_FB_ARTICLES_NOTE,
  "spi-fb-tenses": SPI_FB_TENSES_NOTE,
};

export const SPI_FILL_IN_THE_BLANKS_SLUGS = Object.keys(SPI_FILL_IN_THE_BLANKS_NOTES);

import type { SubtopicNote } from "@/app/notes/_types";
import { SPI_PR_COINS_DIE_NOTE } from "./coins-die";
import { SPI_PR_RULES_NOTE } from "./rules";
import { SPI_PR_TWO_DICE_NOTE } from "./two-dice";
import { SPI_PR_CARDS_BAGS_NOTE } from "./cards-bags";
import { SPI_PR_EXPECTED_NOTE } from "./expected";

export { SPI_PROBABILITY_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/spi-maths/probability/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `spi-pr-` here and `spipr-` on concept slugs.
 *
 * Five pages cut by reading all 59 questions (scripts/spi/reshape/probability.ts): one die and coins, the rules,
 * two dice and calendar pairs, cards and bags (with odds), and experimental probability. Order matches `subtopicOrder`.
 */
export const SPI_PROBABILITY_NOTES: Record<string, SubtopicNote> = {
  "spi-pr-coins-die": SPI_PR_COINS_DIE_NOTE,
  "spi-pr-rules": SPI_PR_RULES_NOTE,
  "spi-pr-two-dice": SPI_PR_TWO_DICE_NOTE,
  "spi-pr-cards-bags": SPI_PR_CARDS_BAGS_NOTE,
  "spi-pr-expected": SPI_PR_EXPECTED_NOTE,
};

export const SPI_PROBABILITY_SLUGS = Object.keys(SPI_PROBABILITY_NOTES);

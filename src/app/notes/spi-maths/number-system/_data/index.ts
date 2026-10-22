import type { SubtopicNote } from "@/app/notes/_types";
import { SPI_NS_TYPES_NOTE } from "./types";
import { SPI_NS_PRIMES_NOTE } from "./primes";
import { SPI_NS_HCF_LCM_NOTE } from "./hcf-lcm";
import { SPI_NS_RATIONALS_NOTE } from "./rationals";
import { SPI_NS_IRRATIONALS_NOTE } from "./irrationals";

export { SPI_NUMBER_SYSTEM_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/spi-maths/number-system/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `spi-ns-` here and `spins-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/spi/reshape/number-system.ts). Order matches `subtopicOrder`.
 */
export const SPI_NUMBER_SYSTEM_NOTES: Record<string, SubtopicNote> = {
  "spi-ns-types": SPI_NS_TYPES_NOTE,
  "spi-ns-primes": SPI_NS_PRIMES_NOTE,
  "spi-ns-hcf-lcm": SPI_NS_HCF_LCM_NOTE,
  "spi-ns-rationals": SPI_NS_RATIONALS_NOTE,
  "spi-ns-irrationals": SPI_NS_IRRATIONALS_NOTE,
};

export const SPI_NUMBER_SYSTEM_SLUGS = Object.keys(SPI_NUMBER_SYSTEM_NOTES);

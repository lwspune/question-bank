import type { SubtopicNote } from "@/app/notes/_types";
import { TERM_BIN_NOTE } from "./term";
import { CONSECUTIVE_BIN_NOTE } from "./consecutive";
import { PRODUCTS_BIN_NOTE } from "./products";
import { RATIONAL_BIN_NOTE } from "./rational";
import { SUMS_BIN_NOTE } from "./sums";
import { SUMS_PRODUCTS_BIN_NOTE } from "./sums-products";
import { SERIES_BIN_NOTE } from "./series";
import { REMAINDER_BIN_NOTE } from "./remainder";

export { JEE_BINOMIAL_THEOREM_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/jee-mains-maths/binomial-theorem/[subtopicSlug].
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is
 * GLOBALLY unique across NOTES_CHAPTERS — hence `jee-bin-` here and `jbin-` on
 * concept slugs.
 */
export const JEE_BINOMIAL_THEOREM_NOTES: Record<string, SubtopicNote> = {
  "jee-bin-term": TERM_BIN_NOTE,
  "jee-bin-consecutive": CONSECUTIVE_BIN_NOTE,
  "jee-bin-products": PRODUCTS_BIN_NOTE,
  "jee-bin-rational": RATIONAL_BIN_NOTE,
  "jee-bin-sums": SUMS_BIN_NOTE,
  "jee-bin-sums-products": SUMS_PRODUCTS_BIN_NOTE,
  "jee-bin-series": SERIES_BIN_NOTE,
  "jee-bin-remainder": REMAINDER_BIN_NOTE,
};

export const JEE_BINOMIAL_THEOREM_SLUGS = Object.keys(JEE_BINOMIAL_THEOREM_NOTES);

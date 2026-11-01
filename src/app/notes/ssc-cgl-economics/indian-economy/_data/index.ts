import type { SubtopicNote } from "@/app/notes/_types";
import { SSC_XIE_PLANS_NOTE } from "./plans";
import { SSC_XIE_TRADE_NOTE } from "./trade";
import { SSC_XIE_AGRICULTURE_NOTE } from "./agriculture";

export { SSC_INDIAN_ECONOMY_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-economics/indian-economy/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc-xie-` here and `sscxie-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape/indian-economy.ts). Order matches `subtopicOrder`.
 */
export const SSC_INDIAN_ECONOMY_NOTES: Record<string, SubtopicNote> = {
  "ssc-xie-plans": SSC_XIE_PLANS_NOTE,
  "ssc-xie-trade": SSC_XIE_TRADE_NOTE,
  "ssc-xie-agriculture": SSC_XIE_AGRICULTURE_NOTE,
};

export const SSC_INDIAN_ECONOMY_SLUGS = Object.keys(SSC_INDIAN_ECONOMY_NOTES);

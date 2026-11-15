import type { SubtopicNote } from "@/app/notes/_types";
import { SSC2_ROR_ORDER_NOTE } from "./order";

export { SSC2_ORDER_RANKING_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-tier-2-reasoning/order-ranking/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc2-ror-` here and `ssc2ror-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape-t2/order-ranking.ts). Order matches `subtopicOrder`.
 */
export const SSC2_ORDER_RANKING_NOTES: Record<string, SubtopicNote> = {
  "ssc2-ror-order": SSC2_ROR_ORDER_NOTE,
};

export const SSC2_ORDER_RANKING_SLUGS = Object.keys(SSC2_ORDER_RANKING_NOTES);

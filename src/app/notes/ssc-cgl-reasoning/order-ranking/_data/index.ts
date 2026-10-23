import type { SubtopicNote } from "@/app/notes/_types";
import { SSC_ROR_RANKS_NOTE } from "./ranks";
import { SSC_ROR_PUZZLES_NOTE } from "./puzzles";

export { SSC_ORDER_RANKING_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-reasoning/order-ranking/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc-ror-` here and `sscror-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape/order-ranking.ts). Order matches `subtopicOrder`.
 */
export const SSC_ORDER_RANKING_NOTES: Record<string, SubtopicNote> = {
  "ssc-ror-ranks": SSC_ROR_RANKS_NOTE,
  "ssc-ror-puzzles": SSC_ROR_PUZZLES_NOTE,
};

export const SSC_ORDER_RANKING_SLUGS = Object.keys(SSC_ORDER_RANKING_NOTES);

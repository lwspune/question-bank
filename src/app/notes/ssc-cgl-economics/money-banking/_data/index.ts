import type { SubtopicNote } from "@/app/notes/_types";
import { SSC_XMB_MONEY_NOTE } from "./money";
import { SSC_XMB_BANKING_NOTE } from "./banking";
import { SSC_XMB_BUDGET_NOTE } from "./budget";

export { SSC_MONEY_BANKING_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-economics/money-banking/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc-xmb-` here and `sscxmb-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape/money-banking.ts). Order matches `subtopicOrder`.
 */
export const SSC_MONEY_BANKING_NOTES: Record<string, SubtopicNote> = {
  "ssc-xmb-money": SSC_XMB_MONEY_NOTE,
  "ssc-xmb-banking": SSC_XMB_BANKING_NOTE,
  "ssc-xmb-budget": SSC_XMB_BUDGET_NOTE,
};

export const SSC_MONEY_BANKING_SLUGS = Object.keys(SSC_MONEY_BANKING_NOTES);

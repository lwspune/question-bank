import type { SubtopicNote } from "@/app/notes/_types";
import { CDS_EC_MB_MONEY_NOTE } from "./money";
import { CDS_EC_MB_INFLATION_NOTE } from "./inflation";
import { CDS_EC_MB_BANKS_NOTE } from "./banks";
import { CDS_EC_MB_BUDGET_NOTE } from "./budget";
import { CDS_EC_MB_TAXES_NOTE } from "./taxes";

export { CDS_EC_MONEY_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/cds-economics/money-banking-finance/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `cdsec-mb-` here and `cdsecmb-` on concept slugs.
 *
 * 5 pages cut by reading every solution (scripts/cds-gs/reshape/money-banking-finance.ts).
 * Order matches `subtopicOrder`.
 */
export const CDS_EC_MONEY_NOTES: Record<string, SubtopicNote> = {
  "cdsec-mb-money": CDS_EC_MB_MONEY_NOTE,
  "cdsec-mb-inflation": CDS_EC_MB_INFLATION_NOTE,
  "cdsec-mb-banks": CDS_EC_MB_BANKS_NOTE,
  "cdsec-mb-budget": CDS_EC_MB_BUDGET_NOTE,
  "cdsec-mb-taxes": CDS_EC_MB_TAXES_NOTE,
};

export const CDS_EC_MONEY_SLUGS = Object.keys(CDS_EC_MONEY_NOTES);

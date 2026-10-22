import type { SubtopicNote } from "@/app/notes/_types";
import { CDS_EC_IN_PLANNING_NOTE } from "./planning";
import { CDS_EC_IN_BOP_NOTE } from "./bop";
import { CDS_EC_IN_TRADE_NOTE } from "./trade";

export { CDS_EC_INDIAN_ECONOMY_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/cds-economics/indian-economy/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `cdsec-in-` here and `cdsecin-` on concept slugs.
 *
 * 3 pages cut by reading every solution (scripts/cds-gs/reshape/indian-economy.ts).
 * Order matches `subtopicOrder`.
 */
export const CDS_EC_INDIAN_ECONOMY_NOTES: Record<string, SubtopicNote> = {
  "cdsec-in-planning": CDS_EC_IN_PLANNING_NOTE,
  "cdsec-in-bop": CDS_EC_IN_BOP_NOTE,
  "cdsec-in-trade": CDS_EC_IN_TRADE_NOTE,
};

export const CDS_EC_INDIAN_ECONOMY_SLUGS = Object.keys(CDS_EC_INDIAN_ECONOMY_NOTES);

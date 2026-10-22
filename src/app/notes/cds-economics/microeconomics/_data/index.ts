import type { SubtopicNote } from "@/app/notes/_types";
import { CDS_EC_MI_DEMAND_NOTE } from "./demand";
import { CDS_EC_MI_SUPPLY_NOTE } from "./supply";
import { CDS_EC_MI_MARKETS_NOTE } from "./markets";

export { CDS_EC_MICRO_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/cds-economics/microeconomics/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `cdsec-mi-` here and `cdsecmi-` on concept slugs.
 *
 * 3 pages cut by reading every solution (scripts/cds-gs/reshape/microeconomics.ts).
 * Order matches `subtopicOrder`.
 */
export const CDS_EC_MICRO_NOTES: Record<string, SubtopicNote> = {
  "cdsec-mi-demand": CDS_EC_MI_DEMAND_NOTE,
  "cdsec-mi-supply": CDS_EC_MI_SUPPLY_NOTE,
  "cdsec-mi-markets": CDS_EC_MI_MARKETS_NOTE,
};

export const CDS_EC_MICRO_SLUGS = Object.keys(CDS_EC_MICRO_NOTES);

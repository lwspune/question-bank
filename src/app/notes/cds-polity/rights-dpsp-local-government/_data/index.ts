import type { SubtopicNote } from "@/app/notes/_types";
import { CDS_PO_FR_RIGHTS_NOTE } from "./rights";
import { CDS_PO_FR_WRITS_NOTE } from "./writs";
import { CDS_PO_FR_DPSP_NOTE } from "./dpsp";
import { CDS_PO_FR_ELECTIONS_NOTE } from "./elections";
import { CDS_PO_FR_PANCHAYATS_NOTE } from "./panchayats";

export { CDS_PO_RIGHTS_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/cds-polity/rights-dpsp-local-government/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `cdspol-fr-` here and `cdspolfr-` on concept slugs.
 *
 * 5 pages cut by reading every solution (scripts/cds-gs/reshape/rights-dpsp-local-government.ts).
 * Order matches `subtopicOrder`.
 */
export const CDS_PO_RIGHTS_NOTES: Record<string, SubtopicNote> = {
  "cdspol-fr-rights": CDS_PO_FR_RIGHTS_NOTE,
  "cdspol-fr-writs": CDS_PO_FR_WRITS_NOTE,
  "cdspol-fr-dpsp": CDS_PO_FR_DPSP_NOTE,
  "cdspol-fr-elections": CDS_PO_FR_ELECTIONS_NOTE,
  "cdspol-fr-panchayats": CDS_PO_FR_PANCHAYATS_NOTE,
};

export const CDS_PO_RIGHTS_SLUGS = Object.keys(CDS_PO_RIGHTS_NOTES);

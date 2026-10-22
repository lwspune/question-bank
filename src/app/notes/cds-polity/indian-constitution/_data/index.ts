import type { SubtopicNote } from "@/app/notes/_types";
import { CDS_PO_CO_MAKING_NOTE } from "./making";
import { CDS_PO_CO_PREAMBLE_NOTE } from "./preamble";
import { CDS_PO_CO_SCHEDULES_NOTE } from "./schedules";
import { CDS_PO_CO_STATES_NOTE } from "./states";
import { CDS_PO_CO_RELATIONS_NOTE } from "./relations";
import { CDS_PO_CO_AMENDMENTS_NOTE } from "./amendments";
import { CDS_PO_CO_EMERGENCY_NOTE } from "./emergency";

export { CDS_PO_CONSTITUTION_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/cds-polity/indian-constitution/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `cdspol-co-` here and `cdspolco-` on concept slugs.
 *
 * 7 pages cut by reading every solution (scripts/cds-gs/reshape/indian-constitution.ts).
 * Order matches `subtopicOrder`.
 */
export const CDS_PO_CONSTITUTION_NOTES: Record<string, SubtopicNote> = {
  "cdspol-co-making": CDS_PO_CO_MAKING_NOTE,
  "cdspol-co-preamble": CDS_PO_CO_PREAMBLE_NOTE,
  "cdspol-co-schedules": CDS_PO_CO_SCHEDULES_NOTE,
  "cdspol-co-states": CDS_PO_CO_STATES_NOTE,
  "cdspol-co-relations": CDS_PO_CO_RELATIONS_NOTE,
  "cdspol-co-amendments": CDS_PO_CO_AMENDMENTS_NOTE,
  "cdspol-co-emergency": CDS_PO_CO_EMERGENCY_NOTE,
};

export const CDS_PO_CONSTITUTION_SLUGS = Object.keys(CDS_PO_CONSTITUTION_NOTES);

import type { SubtopicNote } from "@/app/notes/_types";
import { CDS_PO_GV_PRESIDENT_NOTE } from "./president";
import { CDS_PO_GV_MINISTERS_NOTE } from "./ministers";
import { CDS_PO_GV_PARLIAMENT_NOTE } from "./parliament";
import { CDS_PO_GV_LAWMAKING_NOTE } from "./lawmaking";
import { CDS_PO_GV_COURTS_NOTE } from "./courts";
import { CDS_PO_GV_WRITS_NOTE } from "./writs";
import { CDS_PO_GV_STATES_NOTE } from "./states";
import { CDS_PO_GV_CONSTITUTIONAL_NOTE } from "./constitutional";
import { CDS_PO_GV_STATUTORY_NOTE } from "./statutory";
import { CDS_PO_GV_DEPARTMENTS_NOTE } from "./departments";

export { CDS_PO_GOVERNMENT_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/cds-polity/government-structure/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `cdspol-gv-` here and `cdspolgv-` on concept slugs.
 *
 * 10 pages cut by reading every solution (scripts/cds-gs/reshape/government-structure.ts).
 * Order matches `subtopicOrder`.
 */
export const CDS_PO_GOVERNMENT_NOTES: Record<string, SubtopicNote> = {
  "cdspol-gv-president": CDS_PO_GV_PRESIDENT_NOTE,
  "cdspol-gv-ministers": CDS_PO_GV_MINISTERS_NOTE,
  "cdspol-gv-parliament": CDS_PO_GV_PARLIAMENT_NOTE,
  "cdspol-gv-lawmaking": CDS_PO_GV_LAWMAKING_NOTE,
  "cdspol-gv-courts": CDS_PO_GV_COURTS_NOTE,
  "cdspol-gv-writs": CDS_PO_GV_WRITS_NOTE,
  "cdspol-gv-states": CDS_PO_GV_STATES_NOTE,
  "cdspol-gv-constitutional": CDS_PO_GV_CONSTITUTIONAL_NOTE,
  "cdspol-gv-statutory": CDS_PO_GV_STATUTORY_NOTE,
  "cdspol-gv-departments": CDS_PO_GV_DEPARTMENTS_NOTE,
};

export const CDS_PO_GOVERNMENT_SLUGS = Object.keys(CDS_PO_GOVERNMENT_NOTES);

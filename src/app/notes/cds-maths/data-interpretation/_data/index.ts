import type { SubtopicNote } from "@/app/notes/_types";
import { CDS_DI_TABLES_NOTE } from "./tables";
import { CDS_DI_PIE_NOTE } from "./pie";
import { CDS_DI_GRAPHS_NOTE } from "./graphs";
import { CDS_DI_CASELET_NOTE } from "./caselet";

export { CDS_DATA_INTERPRETATION_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/cds-maths/data-interpretation/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `cds-di-` here and `cdsdi-` on concept slugs.
 *
 * Four pages, one per kind of display, as the bank already files them; every premise set sits on one display.
 * Order matches `subtopicOrder`.
 */
export const CDS_DATA_INTERPRETATION_NOTES: Record<string, SubtopicNote> = {
  "cds-di-tables": CDS_DI_TABLES_NOTE,
  "cds-di-pie": CDS_DI_PIE_NOTE,
  "cds-di-graphs": CDS_DI_GRAPHS_NOTE,
  "cds-di-caselet": CDS_DI_CASELET_NOTE,
};

export const CDS_DATA_INTERPRETATION_SLUGS = Object.keys(CDS_DATA_INTERPRETATION_NOTES);

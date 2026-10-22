import type { SubtopicNote } from "@/app/notes/_types";
import { CDS_PH_UN_UNITS_NOTE } from "./units";

export { CDS_PH_UNITS_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/cds-physics/units-measurement/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `cdsph-un-` here and `cdsphun-` on concept slugs.
 *
 * 1 pages cut by reading every solution (scripts/cds-gs/reshape/units-measurement.ts).
 * Order matches `subtopicOrder`.
 */
export const CDS_PH_UNITS_NOTES: Record<string, SubtopicNote> = {
  "cdsph-un-units": CDS_PH_UN_UNITS_NOTE,
};

export const CDS_PH_UNITS_SLUGS = Object.keys(CDS_PH_UNITS_NOTES);

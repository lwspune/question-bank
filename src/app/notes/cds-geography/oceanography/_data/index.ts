import type { SubtopicNote } from "@/app/notes/_types";
import { CDS_GE_OC_FLOOR_NOTE } from "./floor";
import { CDS_GE_OC_CURRENTS_NOTE } from "./currents";

export { CDS_GE_OCEAN_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/cds-geography/oceanography/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `cdsge-oc-` here and `cdsgeoc-` on concept slugs.
 *
 * 2 pages cut by reading every solution (scripts/cds-gs/reshape/oceanography.ts).
 * Order matches `subtopicOrder`.
 */
export const CDS_GE_OCEAN_NOTES: Record<string, SubtopicNote> = {
  "cdsge-oc-floor": CDS_GE_OC_FLOOR_NOTE,
  "cdsge-oc-currents": CDS_GE_OC_CURRENTS_NOTE,
};

export const CDS_GE_OCEAN_SLUGS = Object.keys(CDS_GE_OCEAN_NOTES);

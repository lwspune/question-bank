import type { SubtopicNote } from "@/app/notes/_types";
import { CDS_GE_CL_ATMOSPHERE_NOTE } from "./atmosphere";
import { CDS_GE_CL_TEMPERATURE_NOTE } from "./temperature";
import { CDS_GE_CL_WINDS_NOTE } from "./winds";
import { CDS_GE_CL_CLOUDS_NOTE } from "./clouds";
import { CDS_GE_CL_TYPES_NOTE } from "./types";

export { CDS_GE_CLIMATE_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/cds-geography/climatology/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `cdsge-cl-` here and `cdsgecl-` on concept slugs.
 *
 * 5 pages cut by reading every solution (scripts/cds-gs/reshape/climatology.ts).
 * Order matches `subtopicOrder`.
 */
export const CDS_GE_CLIMATE_NOTES: Record<string, SubtopicNote> = {
  "cdsge-cl-atmosphere": CDS_GE_CL_ATMOSPHERE_NOTE,
  "cdsge-cl-temperature": CDS_GE_CL_TEMPERATURE_NOTE,
  "cdsge-cl-winds": CDS_GE_CL_WINDS_NOTE,
  "cdsge-cl-clouds": CDS_GE_CL_CLOUDS_NOTE,
  "cdsge-cl-types": CDS_GE_CL_TYPES_NOTE,
};

export const CDS_GE_CLIMATE_SLUGS = Object.keys(CDS_GE_CLIMATE_NOTES);

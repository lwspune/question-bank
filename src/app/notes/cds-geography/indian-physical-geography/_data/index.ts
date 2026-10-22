import type { SubtopicNote } from "@/app/notes/_types";
import { CDS_GE_PH_LOCATION_NOTE } from "./location";
import { CDS_GE_PH_ISLANDS_NOTE } from "./islands";
import { CDS_GE_PH_RELIEF_NOTE } from "./relief";
import { CDS_GE_PH_RIVERS_NOTE } from "./rivers";
import { CDS_GE_PH_LAKES_NOTE } from "./lakes";
import { CDS_GE_PH_CLIMATE_NOTE } from "./climate";
import { CDS_GE_PH_SOILS_NOTE } from "./soils";
import { CDS_GE_PH_FORESTS_NOTE } from "./forests";

export { CDS_GE_PHYSICAL_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/cds-geography/indian-physical-geography/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `cdsge-ph-` here and `cdsgeph-` on concept slugs.
 *
 * 8 pages cut by reading every solution (scripts/cds-gs/reshape/indian-physical-geography.ts).
 * Order matches `subtopicOrder`.
 */
export const CDS_GE_PHYSICAL_NOTES: Record<string, SubtopicNote> = {
  "cdsge-ph-location": CDS_GE_PH_LOCATION_NOTE,
  "cdsge-ph-islands": CDS_GE_PH_ISLANDS_NOTE,
  "cdsge-ph-relief": CDS_GE_PH_RELIEF_NOTE,
  "cdsge-ph-rivers": CDS_GE_PH_RIVERS_NOTE,
  "cdsge-ph-lakes": CDS_GE_PH_LAKES_NOTE,
  "cdsge-ph-climate": CDS_GE_PH_CLIMATE_NOTE,
  "cdsge-ph-soils": CDS_GE_PH_SOILS_NOTE,
  "cdsge-ph-forests": CDS_GE_PH_FORESTS_NOTE,
};

export const CDS_GE_PHYSICAL_SLUGS = Object.keys(CDS_GE_PHYSICAL_NOTES);

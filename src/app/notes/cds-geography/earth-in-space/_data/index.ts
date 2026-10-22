import type { SubtopicNote } from "@/app/notes/_types";
import { CDS_GE_SP_SOLAR_NOTE } from "./solar";
import { CDS_GE_SP_GLOBE_NOTE } from "./globe";

export { CDS_GE_SPACE_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/cds-geography/earth-in-space/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `cdsge-sp-` here and `cdsgesp-` on concept slugs.
 *
 * 2 pages cut by reading every solution (scripts/cds-gs/reshape/earth-in-space.ts).
 * Order matches `subtopicOrder`.
 */
export const CDS_GE_SPACE_NOTES: Record<string, SubtopicNote> = {
  "cdsge-sp-solar": CDS_GE_SP_SOLAR_NOTE,
  "cdsge-sp-globe": CDS_GE_SP_GLOBE_NOTE,
};

export const CDS_GE_SPACE_SLUGS = Object.keys(CDS_GE_SPACE_NOTES);

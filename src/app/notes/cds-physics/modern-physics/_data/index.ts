import type { SubtopicNote } from "@/app/notes/_types";
import { CDS_PH_MO_PHOTONS_NOTE } from "./photons";
import { CDS_PH_MO_NUCLEI_NOTE } from "./nuclei";

export { CDS_PH_MODERN_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/cds-physics/modern-physics/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `cdsph-mo-` here and `cdsphmo-` on concept slugs.
 *
 * 2 pages cut by reading every solution (scripts/cds-gs/reshape/modern-physics.ts).
 * Order matches `subtopicOrder`.
 */
export const CDS_PH_MODERN_NOTES: Record<string, SubtopicNote> = {
  "cdsph-mo-photons": CDS_PH_MO_PHOTONS_NOTE,
  "cdsph-mo-nuclei": CDS_PH_MO_NUCLEI_NOTE,
};

export const CDS_PH_MODERN_SLUGS = Object.keys(CDS_PH_MODERN_NOTES);

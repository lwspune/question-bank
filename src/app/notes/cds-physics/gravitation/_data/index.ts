import type { SubtopicNote } from "@/app/notes/_types";
import { CDS_PH_GR_LAW_NOTE } from "./law";
import { CDS_PH_GR_SPACE_NOTE } from "./space";

export { CDS_PH_GRAVITATION_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/cds-physics/gravitation/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `cdsph-gr-` here and `cdsphgr-` on concept slugs.
 *
 * 2 pages cut by reading every solution (scripts/cds-gs/reshape/gravitation.ts).
 * Order matches `subtopicOrder`.
 */
export const CDS_PH_GRAVITATION_NOTES: Record<string, SubtopicNote> = {
  "cdsph-gr-law": CDS_PH_GR_LAW_NOTE,
  "cdsph-gr-space": CDS_PH_GR_SPACE_NOTE,
};

export const CDS_PH_GRAVITATION_SLUGS = Object.keys(CDS_PH_GRAVITATION_NOTES);

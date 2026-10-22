import type { SubtopicNote } from "@/app/notes/_types";
import { CDS_PH_HE_TRANSFER_NOTE } from "./transfer";
import { CDS_PH_HE_STATE_NOTE } from "./state";

export { CDS_PH_HEAT_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/cds-physics/heat-thermodynamics/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `cdsph-he-` here and `cdsphhe-` on concept slugs.
 *
 * 2 pages cut by reading every solution (scripts/cds-gs/reshape/heat-thermodynamics.ts).
 * Order matches `subtopicOrder`.
 */
export const CDS_PH_HEAT_NOTES: Record<string, SubtopicNote> = {
  "cdsph-he-transfer": CDS_PH_HE_TRANSFER_NOTE,
  "cdsph-he-state": CDS_PH_HE_STATE_NOTE,
};

export const CDS_PH_HEAT_SLUGS = Object.keys(CDS_PH_HEAT_NOTES);

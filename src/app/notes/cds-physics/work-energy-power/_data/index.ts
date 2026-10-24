import type { SubtopicNote } from "@/app/notes/_types";
import { CDS_PH_WO_ENERGY_NOTE } from "./energy";

export { CDS_PH_WORK_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/cds-physics/work-energy-power/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `cdsph-wo-` here and `cdsphwo-` on concept slugs.
 *
 * 1 pages cut by reading every solution (scripts/cds-gs/reshape/work-energy-power.ts).
 * Order matches `subtopicOrder`.
 */
export const CDS_PH_WORK_NOTES: Record<string, SubtopicNote> = {
  "cdsph-wo-energy": CDS_PH_WO_ENERGY_NOTE,
};

export const CDS_PH_WORK_SLUGS = Object.keys(CDS_PH_WORK_NOTES);

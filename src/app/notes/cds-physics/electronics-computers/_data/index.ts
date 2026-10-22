import type { SubtopicNote } from "@/app/notes/_types";
import { CDS_PH_EL_HARDWARE_NOTE } from "./hardware";
import { CDS_PH_EL_SOFTWARE_NOTE } from "./software";

export { CDS_PH_ELECTRONICS_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/cds-physics/electronics-computers/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `cdsph-el-` here and `cdsphel-` on concept slugs.
 *
 * 2 pages cut by reading every solution (scripts/cds-gs/reshape/electronics-computers.ts).
 * Order matches `subtopicOrder`.
 */
export const CDS_PH_ELECTRONICS_NOTES: Record<string, SubtopicNote> = {
  "cdsph-el-hardware": CDS_PH_EL_HARDWARE_NOTE,
  "cdsph-el-software": CDS_PH_EL_SOFTWARE_NOTE,
};

export const CDS_PH_ELECTRONICS_SLUGS = Object.keys(CDS_PH_ELECTRONICS_NOTES);

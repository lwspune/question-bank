import type { SubtopicNote } from "@/app/notes/_types";
import { CDS_PH_KI_LINE_NOTE } from "./line";
import { CDS_PH_KI_PLANE_NOTE } from "./plane";

export { CDS_PH_KINEMATICS_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/cds-physics/kinematics/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `cdsph-ki-` here and `cdsphki-` on concept slugs.
 *
 * 2 pages cut by reading every solution (scripts/cds-gs/reshape/kinematics.ts).
 * Order matches `subtopicOrder`.
 */
export const CDS_PH_KINEMATICS_NOTES: Record<string, SubtopicNote> = {
  "cdsph-ki-line": CDS_PH_KI_LINE_NOTE,
  "cdsph-ki-plane": CDS_PH_KI_PLANE_NOTE,
};

export const CDS_PH_KINEMATICS_SLUGS = Object.keys(CDS_PH_KINEMATICS_NOTES);

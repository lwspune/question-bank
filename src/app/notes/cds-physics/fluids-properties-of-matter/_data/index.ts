import type { SubtopicNote } from "@/app/notes/_types";
import { CDS_PH_FL_MATTER_NOTE } from "./matter";

export { CDS_PH_FLUIDS_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/cds-physics/fluids-properties-of-matter/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `cdsph-fl-` here and `cdsphfl-` on concept slugs.
 *
 * 1 pages cut by reading every solution (scripts/cds-gs/reshape/fluids-properties-of-matter.ts).
 * Order matches `subtopicOrder`.
 */
export const CDS_PH_FLUIDS_NOTES: Record<string, SubtopicNote> = {
  "cdsph-fl-matter": CDS_PH_FL_MATTER_NOTE,
};

export const CDS_PH_FLUIDS_SLUGS = Object.keys(CDS_PH_FLUIDS_NOTES);

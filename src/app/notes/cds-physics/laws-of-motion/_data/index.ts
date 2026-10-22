import type { SubtopicNote } from "@/app/notes/_types";
import { CDS_PH_LA_NEWTON_NOTE } from "./newton";

export { CDS_PH_LAWS_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/cds-physics/laws-of-motion/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `cdsph-la-` here and `cdsphla-` on concept slugs.
 *
 * 1 pages cut by reading every solution (scripts/cds-gs/reshape/laws-of-motion.ts).
 * Order matches `subtopicOrder`.
 */
export const CDS_PH_LAWS_NOTES: Record<string, SubtopicNote> = {
  "cdsph-la-newton": CDS_PH_LA_NEWTON_NOTE,
};

export const CDS_PH_LAWS_SLUGS = Object.keys(CDS_PH_LAWS_NOTES);

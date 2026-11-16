import type { SubtopicNote } from "@/app/notes/_types";
import { NEET_PH_MM_DIPOLE_NOTE } from "./dipole";
import { NEET_PH_MM_MATERIALS_NOTE } from "./materials";

export { NEET_PH_MM_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/neet-physics/magnetism-and-matter/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `nph-mm-` here and `nphmm-` on concept slugs.
 *
 * 2 pages re-cut by scripts/neet/retax.ts from a generated-papers/_plan-*.json.
 * Order matches `subtopicOrder`.
 */
export const NEET_PH_MM_NOTES: Record<string, SubtopicNote> = {
  "nph-mm-dipole": NEET_PH_MM_DIPOLE_NOTE,
  "nph-mm-materials": NEET_PH_MM_MATERIALS_NOTE,
};

export const NEET_PH_MM_SLUGS = Object.keys(NEET_PH_MM_NOTES);

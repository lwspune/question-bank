import type { SubtopicNote } from "@/app/notes/_types";
import { NEET_PH_EF_FIELD_NOTE } from "./field";
import { NEET_PH_EF_DIPOLE_NOTE } from "./dipole";
import { NEET_PH_EF_GAUSS_NOTE } from "./gauss";

export { NEET_PH_EF_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/neet-physics/electric-charges-and-fields/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `nph-ef-` here and `nphef-` on concept slugs.
 *
 * 3 pages re-cut by scripts/neet/retax.ts from a generated-papers/_plan-*.json.
 * Order matches `subtopicOrder`.
 */
export const NEET_PH_EF_NOTES: Record<string, SubtopicNote> = {
  "nph-ef-field": NEET_PH_EF_FIELD_NOTE,
  "nph-ef-dipole": NEET_PH_EF_DIPOLE_NOTE,
  "nph-ef-gauss": NEET_PH_EF_GAUSS_NOTE,
};

export const NEET_PH_EF_SLUGS = Object.keys(NEET_PH_EF_NOTES);

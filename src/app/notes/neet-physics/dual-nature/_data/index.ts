import type { SubtopicNote } from "@/app/notes/_types";
import { NEET_PH_DN_PHOTONS_NOTE } from "./photons";
import { NEET_PH_DN_PHOTOELECTRIC_NOTE } from "./photoelectric";
import { NEET_PH_DN_DEBROGLIE_NOTE } from "./debroglie";

export { NEET_PH_DN_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/neet-physics/dual-nature/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `nph-dn-` here and `nphdn-` on concept slugs.
 *
 * 3 pages re-cut by scripts/neet/retax.ts from a generated-papers/_plan-*.json.
 * Order matches `subtopicOrder`.
 */
export const NEET_PH_DN_NOTES: Record<string, SubtopicNote> = {
  "nph-dn-photons": NEET_PH_DN_PHOTONS_NOTE,
  "nph-dn-photoelectric": NEET_PH_DN_PHOTOELECTRIC_NOTE,
  "nph-dn-debroglie": NEET_PH_DN_DEBROGLIE_NOTE,
};

export const NEET_PH_DN_SLUGS = Object.keys(NEET_PH_DN_NOTES);

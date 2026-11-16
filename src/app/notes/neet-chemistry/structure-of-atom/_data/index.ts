import type { SubtopicNote } from "@/app/notes/_types";
import { NEET_CH_SA_PARTICLES_NOTE } from "./particles";
import { NEET_CH_SA_BOHR_NOTE } from "./bohr";
import { NEET_CH_SA_ORBITALS_NOTE } from "./orbitals";

export { NEET_CH_SA_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/neet-chemistry/structure-of-atom/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `nch-sa-` here and `nchsa-` on concept slugs.
 *
 * 3 pages re-cut by scripts/neet/retax.ts from a generated-papers/_plan-*.json.
 * Order matches `subtopicOrder`.
 */
export const NEET_CH_SA_NOTES: Record<string, SubtopicNote> = {
  "nch-sa-particles": NEET_CH_SA_PARTICLES_NOTE,
  "nch-sa-bohr": NEET_CH_SA_BOHR_NOTE,
  "nch-sa-orbitals": NEET_CH_SA_ORBITALS_NOTE,
};

export const NEET_CH_SA_SLUGS = Object.keys(NEET_CH_SA_NOTES);

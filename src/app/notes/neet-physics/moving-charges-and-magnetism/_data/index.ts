import type { SubtopicNote } from "@/app/notes/_types";
import { NEET_PH_MC_FORCE_NOTE } from "./force";
import { NEET_PH_MC_LOOPS_NOTE } from "./loops";
import { NEET_PH_MC_AMPERE_NOTE } from "./ampere";
import { NEET_PH_MC_DIPOLE_NOTE } from "./dipole";

export { NEET_PH_MC_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/neet-physics/moving-charges-and-magnetism/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `nph-mc-` here and `nphmc-` on concept slugs.
 *
 * 4 pages re-cut by scripts/neet/retax.ts from a generated-papers/_plan-*.json.
 * Order matches `subtopicOrder`.
 */
export const NEET_PH_MC_NOTES: Record<string, SubtopicNote> = {
  "nph-mc-force": NEET_PH_MC_FORCE_NOTE,
  "nph-mc-loops": NEET_PH_MC_LOOPS_NOTE,
  "nph-mc-ampere": NEET_PH_MC_AMPERE_NOTE,
  "nph-mc-dipole": NEET_PH_MC_DIPOLE_NOTE,
};

export const NEET_PH_MC_SLUGS = Object.keys(NEET_PH_MC_NOTES);

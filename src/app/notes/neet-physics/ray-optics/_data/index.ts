import type { SubtopicNote } from "@/app/notes/_types";
import { NEET_PH_RO_REFLECTION_NOTE } from "./reflection";
import { NEET_PH_RO_LENSES_NOTE } from "./lenses";
import { NEET_PH_RO_PRISMS_NOTE } from "./prisms";
import { NEET_PH_RO_INSTRUMENTS_NOTE } from "./instruments";

export { NEET_PH_RO_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/neet-physics/ray-optics/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `nph-ro-` here and `nphro-` on concept slugs.
 *
 * 4 pages re-cut by scripts/neet/retax.ts from a generated-papers/_plan-*.json.
 * Order matches `subtopicOrder`.
 */
export const NEET_PH_RO_NOTES: Record<string, SubtopicNote> = {
  "nph-ro-reflection": NEET_PH_RO_REFLECTION_NOTE,
  "nph-ro-lenses": NEET_PH_RO_LENSES_NOTE,
  "nph-ro-prisms": NEET_PH_RO_PRISMS_NOTE,
  "nph-ro-instruments": NEET_PH_RO_INSTRUMENTS_NOTE,
};

export const NEET_PH_RO_SLUGS = Object.keys(NEET_PH_RO_NOTES);

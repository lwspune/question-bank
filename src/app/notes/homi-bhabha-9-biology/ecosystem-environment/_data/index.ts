import type { SubtopicNote } from "@/app/notes/_types";
import { HB9_EE_CHAINS_NOTE } from "./chains";
import { HB9_EE_ENERGY_NOTE } from "./energy";
import { HB9_EE_CYCLES_NOTE } from "./cycles";
import { HB9_EE_ENVIRONMENT_NOTE } from "./environment";

export { HB9_ECOSYSTEM_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/homi-bhabha-9-biology/ecosystem-environment/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `hb9-ee-` here and `hb9ee-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/homi-bhabha/notes/plans/ecosystem-environment.ts). Order matches `subtopicOrder`.
 */
export const HB9_ECOSYSTEM_NOTES: Record<string, SubtopicNote> = {
  "hb9-ee-chains": HB9_EE_CHAINS_NOTE,
  "hb9-ee-energy": HB9_EE_ENERGY_NOTE,
  "hb9-ee-cycles": HB9_EE_CYCLES_NOTE,
  "hb9-ee-environment": HB9_EE_ENVIRONMENT_NOTE,
};

export const HB9_ECOSYSTEM_SLUGS = Object.keys(HB9_ECOSYSTEM_NOTES);

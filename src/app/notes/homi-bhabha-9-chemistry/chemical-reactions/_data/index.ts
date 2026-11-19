import type { SubtopicNote } from "@/app/notes/_types";
import { HB9_CR_TYPES_NOTE } from "./types";
import { HB9_CR_EQUATIONS_NOTE } from "./equations";
import { HB9_CR_REDOX_NOTE } from "./redox";

export { HB9_REACTIONS_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/homi-bhabha-9-chemistry/chemical-reactions/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `hb9-cr-` here and `hb9cr-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/homi-bhabha/notes/plans/chemical-reactions.ts). Order matches `subtopicOrder`.
 */
export const HB9_REACTIONS_NOTES: Record<string, SubtopicNote> = {
  "hb9-cr-types": HB9_CR_TYPES_NOTE,
  "hb9-cr-equations": HB9_CR_EQUATIONS_NOTE,
  "hb9-cr-redox": HB9_CR_REDOX_NOTE,
};

export const HB9_REACTIONS_SLUGS = Object.keys(HB9_REACTIONS_NOTES);

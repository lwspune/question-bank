import type { SubtopicNote } from "@/app/notes/_types";
import { HB9_MM_MASS_NOTE } from "./mass";
import { HB9_MM_LAWS_NOTE } from "./laws";
import { HB9_MM_MOLE_NOTE } from "./mole";

export { HB9_MOLE_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/homi-bhabha-9-chemistry/measurement-of-matter/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `hb9-mm-` here and `hb9mm-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/homi-bhabha/notes/plans/measurement-of-matter.ts). Order matches `subtopicOrder`.
 */
export const HB9_MOLE_NOTES: Record<string, SubtopicNote> = {
  "hb9-mm-mass": HB9_MM_MASS_NOTE,
  "hb9-mm-laws": HB9_MM_LAWS_NOTE,
  "hb9-mm-mole": HB9_MM_MOLE_NOTE,
};

export const HB9_MOLE_SLUGS = Object.keys(HB9_MOLE_NOTES);

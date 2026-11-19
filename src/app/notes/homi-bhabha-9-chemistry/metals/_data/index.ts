import type { SubtopicNote } from "@/app/notes/_types";
import { HB9_MT_PROPERTIES_NOTE } from "./properties";
import { HB9_MT_REACTIVITY_NOTE } from "./reactivity";
import { HB9_MT_CORROSION_NOTE } from "./corrosion";

export { HB9_METALS_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/homi-bhabha-9-chemistry/metals/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `hb9-mt-` here and `hb9mt-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/homi-bhabha/notes/plans/metals.ts). Order matches `subtopicOrder`.
 */
export const HB9_METALS_NOTES: Record<string, SubtopicNote> = {
  "hb9-mt-properties": HB9_MT_PROPERTIES_NOTE,
  "hb9-mt-reactivity": HB9_MT_REACTIVITY_NOTE,
  "hb9-mt-corrosion": HB9_MT_CORROSION_NOTE,
};

export const HB9_METALS_SLUGS = Object.keys(HB9_METALS_NOTES);

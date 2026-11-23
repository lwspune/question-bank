import type { SubtopicNote } from "@/app/notes/_types";
import { HB9_HV_DNA_NOTE } from "./dna";
import { HB9_HV_INHERITANCE_NOTE } from "./inheritance";
import { HB9_HV_DISORDERS_NOTE } from "./disorders";

export { HB9_HEREDITY_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/homi-bhabha-9-biology/heredity-evolution/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `hb9-hv-` here and `hb9hv-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/homi-bhabha/notes/plans/heredity-evolution.ts). Order matches `subtopicOrder`.
 */
export const HB9_HEREDITY_NOTES: Record<string, SubtopicNote> = {
  "hb9-hv-dna": HB9_HV_DNA_NOTE,
  "hb9-hv-inheritance": HB9_HV_INHERITANCE_NOTE,
  "hb9-hv-disorders": HB9_HV_DISORDERS_NOTE,
};

export const HB9_HEREDITY_SLUGS = Object.keys(HB9_HEREDITY_NOTES);

import type { SubtopicNote } from "@/app/notes/_types";
import { HB9_PF_ROOTS_NOTE } from "./roots";
import { HB9_PF_LEAVES_NOTE } from "./leaves";
import { HB9_PF_PIGMENTS_NOTE } from "./pigments";

export { HB9_PLANTFN_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/homi-bhabha-9-biology/plants-functions/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `hb9-pf-` here and `hb9pf-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/homi-bhabha/notes/plans/plants-functions.ts). Order matches `subtopicOrder`.
 */
export const HB9_PLANTFN_NOTES: Record<string, SubtopicNote> = {
  "hb9-pf-roots": HB9_PF_ROOTS_NOTE,
  "hb9-pf-leaves": HB9_PF_LEAVES_NOTE,
  "hb9-pf-pigments": HB9_PF_PIGMENTS_NOTE,
};

export const HB9_PLANTFN_SLUGS = Object.keys(HB9_PLANTFN_NOTES);

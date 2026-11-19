import type { SubtopicNote } from "@/app/notes/_types";
import { HB9_MC_KINDS_NOTE } from "./kinds";
import { HB9_MC_USEFUL_NOTE } from "./useful";
import { HB9_MC_NITROGEN_NOTE } from "./nitrogen";
import { HB9_MC_HARMFUL_NOTE } from "./harmful";

export { HB9_MICROBES_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/homi-bhabha-9-biology/microbes/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `hb9-mc-` here and `hb9mc-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/homi-bhabha/notes/plans/microbes.ts). Order matches `subtopicOrder`.
 */
export const HB9_MICROBES_NOTES: Record<string, SubtopicNote> = {
  "hb9-mc-kinds": HB9_MC_KINDS_NOTE,
  "hb9-mc-useful": HB9_MC_USEFUL_NOTE,
  "hb9-mc-nitrogen": HB9_MC_NITROGEN_NOTE,
  "hb9-mc-harmful": HB9_MC_HARMFUL_NOTE,
};

export const HB9_MICROBES_SLUGS = Object.keys(HB9_MICROBES_NOTES);

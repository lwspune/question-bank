import type { SubtopicNote } from "@/app/notes/_types";
import { HB9_SD_SCIENTISTS_NOTE } from "./scientists";
import { HB9_SD_AWARDS_NOTE } from "./awards";
import { HB9_SD_INSTITUTES_NOTE } from "./institutes";

export { HB9_SCIENTISTS_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/homi-bhabha-9-general-science/scientists-discoveries/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `hb9-sd-` here and `hb9sd-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/homi-bhabha/notes/plans/scientists-discoveries.ts). Order matches `subtopicOrder`.
 */
export const HB9_SCIENTISTS_NOTES: Record<string, SubtopicNote> = {
  "hb9-sd-scientists": HB9_SD_SCIENTISTS_NOTE,
  "hb9-sd-awards": HB9_SD_AWARDS_NOTE,
  "hb9-sd-institutes": HB9_SD_INSTITUTES_NOTE,
};

export const HB9_SCIENTISTS_SLUGS = Object.keys(HB9_SCIENTISTS_NOTES);

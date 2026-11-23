import type { SubtopicNote } from "@/app/notes/_types";
import { HB9_SU_CHEMICALS_NOTE } from "./chemicals";
import { HB9_SU_COSMETICS_NOTE } from "./cosmetics";
import { HB9_SU_MATERIALS_NOTE } from "./materials";
import { HB9_SU_RADIO_NOTE } from "./radio";

export { HB9_SUBSTANCES_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/homi-bhabha-9-chemistry/substances-common-use/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `hb9-su-` here and `hb9su-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/homi-bhabha/notes/plans/substances-common-use.ts). Order matches `subtopicOrder`.
 */
export const HB9_SUBSTANCES_NOTES: Record<string, SubtopicNote> = {
  "hb9-su-chemicals": HB9_SU_CHEMICALS_NOTE,
  "hb9-su-cosmetics": HB9_SU_COSMETICS_NOTE,
  "hb9-su-materials": HB9_SU_MATERIALS_NOTE,
  "hb9-su-radio": HB9_SU_RADIO_NOTE,
};

export const HB9_SUBSTANCES_SLUGS = Object.keys(HB9_SUBSTANCES_NOTES);

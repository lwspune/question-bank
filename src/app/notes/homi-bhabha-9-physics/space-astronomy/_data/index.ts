import type { SubtopicNote } from "@/app/notes/_types";
import { HB9_SA_STARS_NOTE } from "./stars";
import { HB9_SA_TELESCOPES_NOTE } from "./telescopes";
import { HB9_SA_SATELLITES_NOTE } from "./satellites";

export { HB9_SPACE_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/homi-bhabha-9-physics/space-astronomy/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `hb9-sa-` here and `hb9sa-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/homi-bhabha/notes/plans/space-astronomy.ts). Order matches `subtopicOrder`.
 */
export const HB9_SPACE_NOTES: Record<string, SubtopicNote> = {
  "hb9-sa-stars": HB9_SA_STARS_NOTE,
  "hb9-sa-telescopes": HB9_SA_TELESCOPES_NOTE,
  "hb9-sa-satellites": HB9_SA_SATELLITES_NOTE,
};

export const HB9_SPACE_SLUGS = Object.keys(HB9_SPACE_NOTES);

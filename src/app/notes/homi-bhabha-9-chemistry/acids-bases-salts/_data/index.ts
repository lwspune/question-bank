import type { SubtopicNote } from "@/app/notes/_types";
import { HB9_AB_AROUND_NOTE } from "./around";
import { HB9_AB_STRENGTH_NOTE } from "./strength";
import { HB9_AB_PH_NOTE } from "./ph";
import { HB9_AB_REACTIONS_NOTE } from "./reactions";
import { HB9_AB_SALTS_NOTE } from "./salts";

export { HB9_ACIDS_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/homi-bhabha-9-chemistry/acids-bases-salts/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `hb9-ab-` here and `hb9ab-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/homi-bhabha/notes/plans/acids-bases-salts.ts). Order matches `subtopicOrder`.
 */
export const HB9_ACIDS_NOTES: Record<string, SubtopicNote> = {
  "hb9-ab-around": HB9_AB_AROUND_NOTE,
  "hb9-ab-strength": HB9_AB_STRENGTH_NOTE,
  "hb9-ab-ph": HB9_AB_PH_NOTE,
  "hb9-ab-reactions": HB9_AB_REACTIONS_NOTE,
  "hb9-ab-salts": HB9_AB_SALTS_NOTE,
};

export const HB9_ACIDS_SLUGS = Object.keys(HB9_ACIDS_NOTES);

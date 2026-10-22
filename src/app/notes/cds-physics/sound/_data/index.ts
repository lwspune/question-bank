import type { SubtopicNote } from "@/app/notes/_types";
import { CDS_PH_SO_WAVES_NOTE } from "./waves";
import { CDS_PH_SO_HEARING_NOTE } from "./hearing";

export { CDS_PH_SOUND_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/cds-physics/sound/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `cdsph-so-` here and `cdsphso-` on concept slugs.
 *
 * 2 pages cut by reading every solution (scripts/cds-gs/reshape/sound.ts).
 * Order matches `subtopicOrder`.
 */
export const CDS_PH_SOUND_NOTES: Record<string, SubtopicNote> = {
  "cdsph-so-waves": CDS_PH_SO_WAVES_NOTE,
  "cdsph-so-hearing": CDS_PH_SO_HEARING_NOTE,
};

export const CDS_PH_SOUND_SLUGS = Object.keys(CDS_PH_SOUND_NOTES);

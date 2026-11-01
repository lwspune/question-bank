import type { SubtopicNote } from "@/app/notes/_types";
import { SSC_FSO_SOUND_NOTE } from "./sound";

export { SSC_SOUND_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-physics/sound/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc-fso-` here and `sscfso-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape/sound.ts). Order matches `subtopicOrder`.
 */
export const SSC_SOUND_NOTES: Record<string, SubtopicNote> = {
  "ssc-fso-sound": SSC_FSO_SOUND_NOTE,
};

export const SSC_SOUND_SLUGS = Object.keys(SSC_SOUND_NOTES);

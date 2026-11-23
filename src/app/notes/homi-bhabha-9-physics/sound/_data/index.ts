import type { SubtopicNote } from "@/app/notes/_types";
import { HB9_SO_NATURE_NOTE } from "./nature";
import { HB9_SO_WAVES_NOTE } from "./waves";
import { HB9_SO_SPEED_NOTE } from "./speed";
import { HB9_SO_ECHO_NOTE } from "./echo";

export { HB9_SOUND_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/homi-bhabha-9-physics/sound/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `hb9-so-` here and `hb9so-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/homi-bhabha/notes/plans/sound.ts). Order matches `subtopicOrder`.
 */
export const HB9_SOUND_NOTES: Record<string, SubtopicNote> = {
  "hb9-so-nature": HB9_SO_NATURE_NOTE,
  "hb9-so-waves": HB9_SO_WAVES_NOTE,
  "hb9-so-speed": HB9_SO_SPEED_NOTE,
  "hb9-so-echo": HB9_SO_ECHO_NOTE,
};

export const HB9_SOUND_SLUGS = Object.keys(HB9_SOUND_NOTES);

import type { SubtopicNote } from "@/app/notes/_types";
import { EQUATION_WAVE_NOTE } from "./equation";
import { SPEED_WAVE_NOTE } from "./speed";
import { STRINGS_WAVE_NOTE } from "./strings";
import { PIPES_WAVE_NOTE } from "./pipes";
import { BEATS_DOPPLER_WAVE_NOTE } from "./beats-doppler";

export { JEE_PH_WAVE_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/jee-mains-physics/waves/[subtopicSlug].
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is
 * GLOBALLY unique across NOTES_CHAPTERS — hence `jph-wave-` here and `jpwave-` on
 * concept slugs.
 */
export const JEE_PH_WAVE_NOTES: Record<string, SubtopicNote> = {
  "jph-wave-equation": EQUATION_WAVE_NOTE,
  "jph-wave-speed": SPEED_WAVE_NOTE,
  "jph-wave-strings": STRINGS_WAVE_NOTE,
  "jph-wave-pipes": PIPES_WAVE_NOTE,
  "jph-wave-beats-doppler": BEATS_DOPPLER_WAVE_NOTE,
};

export const JEE_PH_WAVE_SLUGS = Object.keys(JEE_PH_WAVE_NOTES);

import type { SubtopicNote } from "@/app/notes/_types";
import { PROPERTIES_OF_SOUND_WAVES_NOTE } from "./properties-of-sound-waves";
import { WAVE_PROPERTIES_NOTE } from "./wave-properties";
import { SONAR_AND_ULTRASONIC_NOTE } from "./sonar-and-ultrasonic";
import { BEATS_INSTRUMENTS_EAR_NOTE } from "./beats-instruments-ear";
import { ECHO_ACOUSTICS_REVERBERATION_NOTE } from "./echo-acoustics-reverberation";

export { SOUND_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/nda-physics/sound/[subtopicSlug].
 * Keys must match the URL slug; chapter.subtopicOrder owns rendering order.
 * Adding a new note = author the file + add the entry here.
 */
export const SOUND_NOTES: Record<string, SubtopicNote> = {
  "properties-of-sound-waves": PROPERTIES_OF_SOUND_WAVES_NOTE,
  "wave-properties": WAVE_PROPERTIES_NOTE,
  "sonar-and-ultrasonic": SONAR_AND_ULTRASONIC_NOTE,
  "beats-instruments-ear": BEATS_INSTRUMENTS_EAR_NOTE,
  "echo-acoustics-reverberation": ECHO_ACOUSTICS_REVERBERATION_NOTE,
};

export const SOUND_SLUGS = Object.keys(SOUND_NOTES);

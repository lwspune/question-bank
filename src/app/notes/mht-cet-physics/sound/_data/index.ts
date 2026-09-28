import type { SubtopicNote } from "@/app/notes/_types";
import { WAVES_NOTE } from "./cetp-sd-waves";
import { PIPES_NOTE } from "./cetp-sd-pipes";
import { DOPPLER_NOTE } from "./cetp-sd-doppler";

export { MHTCET_SOUND_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/mht-cet-physics/sound/[subtopicSlug].
 * `cetp-sd-` prefix: concept-tag keys are global.
 */
export const MHTCET_SOUND_NOTES: Record<string, SubtopicNote> = {
  "cetp-sd-waves": WAVES_NOTE,
  "cetp-sd-pipes": PIPES_NOTE,
  "cetp-sd-doppler": DOPPLER_NOTE,
};

export const MHTCET_SOUND_SLUGS = Object.keys(MHTCET_SOUND_NOTES);

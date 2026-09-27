import type { SubtopicNote } from "@/app/notes/_types";
import { PROGRESSIVE_WAVES_NOTE } from "./cetp-progressive-waves";
import { SUPERPOSITION_NOTE } from "./cetp-superposition";
import { STATIONARY_WAVES_NOTE } from "./cetp-stationary-waves";
import { PIPES_DOPPLER_NOTE } from "./cetp-pipes-doppler";
import { BEATS_NOTE } from "./cetp-beats";

export { MHTCET_SUPERPOSITION_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/mht-cet-physics/superposition-of-waves/[subtopicSlug].
 * `cetp-` prefix: concept-tag keys are global.
 */
export const MHTCET_SUPERPOSITION_NOTES: Record<string, SubtopicNote> = {
  "cetp-progressive-waves": PROGRESSIVE_WAVES_NOTE,
  "cetp-superposition": SUPERPOSITION_NOTE,
  "cetp-stationary-waves": STATIONARY_WAVES_NOTE,
  "cetp-pipes-doppler": PIPES_DOPPLER_NOTE,
  "cetp-beats": BEATS_NOTE,
};

export const MHTCET_SUPERPOSITION_SLUGS = Object.keys(MHTCET_SUPERPOSITION_NOTES);

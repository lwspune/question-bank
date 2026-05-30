import type { SubtopicNote } from "@/app/notes/_types";
import { FOUNDATIONS_NOTE } from "./foundations";
import { WAVE_EQUATION_AND_BANDS_NOTE } from "./wave-equation-and-bands";
import { SOUND_BEHAVIOURS_NOTE } from "./sound-behaviours";
import { APPLICATIONS_NOTE } from "./applications";

export { SOUND_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/nda-physics/sound/[subtopicSlug].
 * Keys must match the URL slug; chapter.subtopicOrder owns rendering order.
 * Adding a new note = author the file + add the entry here.
 */
export const SOUND_NOTES: Record<string, SubtopicNote> = {
  "foundations": FOUNDATIONS_NOTE,
  "wave-equation-and-bands": WAVE_EQUATION_AND_BANDS_NOTE,
  "sound-behaviours": SOUND_BEHAVIOURS_NOTE,
  "applications": APPLICATIONS_NOTE,
};

export const SOUND_SLUGS = Object.keys(SOUND_NOTES);

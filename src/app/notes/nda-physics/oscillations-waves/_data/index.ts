import type { SubtopicNote } from "@/app/notes/_types";
import { OSCILLATIONS_SHM_AND_WAVES_NOTE } from "./shm-and-waves";
import { OSCILLATIONS_SIMPLE_PENDULUM_NOTE } from "./simple-pendulum";

export { OSCILLATIONS_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for
 * /notes/nda-physics/oscillations-waves/[subtopicSlug]. Keys must match the URL
 * slug; chapter.subtopicOrder owns rendering order. Adding a new note = author
 * the file + add the entry here.
 */
export const OSCILLATIONS_NOTES: Record<string, SubtopicNote> = {
  "osc-shm-and-waves": OSCILLATIONS_SHM_AND_WAVES_NOTE,
  "osc-simple-pendulum": OSCILLATIONS_SIMPLE_PENDULUM_NOTE,
};

export const OSCILLATIONS_SLUGS = Object.keys(OSCILLATIONS_NOTES);

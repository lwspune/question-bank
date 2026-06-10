import type { SubtopicNote } from "@/app/notes/_types";
import { WORK_AND_WORK_DONE_NOTE } from "./work-and-work-done";
import { ENERGY_AND_CONSERVATION_NOTE } from "./energy-and-conservation";
import { WORK_ENERGY_THEOREM_AND_POWER_NOTE } from "./work-energy-theorem-and-power";
import { SIMPLE_MACHINES_NOTE } from "./simple-machines";

export { WORK_ENERGY_POWER_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for
 * /notes/nda-physics/work-energy-power/[subtopicSlug].
 * Slugs are "wep-" prefixed to stay globally unique across all NOTES_CHAPTERS
 * (the slug is the concept-tag key, not just a URL segment).
 * Render order is owned by chapter.subtopicOrder.
 */
export const WORK_ENERGY_POWER_NOTES: Record<string, SubtopicNote> = {
  "wep-work-and-work-done": WORK_AND_WORK_DONE_NOTE,
  "wep-energy-and-conservation": ENERGY_AND_CONSERVATION_NOTE,
  "wep-work-energy-theorem-and-power": WORK_ENERGY_THEOREM_AND_POWER_NOTE,
  "wep-simple-machines": SIMPLE_MACHINES_NOTE,
};

export const WORK_ENERGY_POWER_SLUGS = Object.keys(WORK_ENERGY_POWER_NOTES);

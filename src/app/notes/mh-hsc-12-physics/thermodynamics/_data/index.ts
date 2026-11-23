import type { SubtopicNote } from "@/app/notes/_types";
import { HSC_PH_TD_ENERGY_NOTE } from "./energy";
import { HSC_PH_TD_FIRSTLAW_NOTE } from "./firstlaw";
import { HSC_PH_TD_STATES_NOTE } from "./states";
import { HSC_PH_TD_PROCESSES_NOTE } from "./processes";
import { HSC_PH_TD_ENGINES_NOTE } from "./engines";
import { HSC_PH_TD_REFRIGERATORS_NOTE } from "./refrigerators";
import { HSC_PH_TD_SECONDLAW_NOTE } from "./secondlaw";
import { HSC_PH_TD_CARNOT_NOTE } from "./carnot";

export { HSC_PH_TD_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/mh-hsc-12-physics/thermodynamics/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `hscp-td-` here and `hscptd-` on concept slugs.
 *
 * 8 pages, one per textbook section (the DB subtopics kept as they are, in book order).
 * Order matches `subtopicOrder`.
 */
export const HSC_PH_TD_NOTES: Record<string, SubtopicNote> = {
  "hscp-td-energy": HSC_PH_TD_ENERGY_NOTE,
  "hscp-td-firstlaw": HSC_PH_TD_FIRSTLAW_NOTE,
  "hscp-td-states": HSC_PH_TD_STATES_NOTE,
  "hscp-td-processes": HSC_PH_TD_PROCESSES_NOTE,
  "hscp-td-engines": HSC_PH_TD_ENGINES_NOTE,
  "hscp-td-refrigerators": HSC_PH_TD_REFRIGERATORS_NOTE,
  "hscp-td-secondlaw": HSC_PH_TD_SECONDLAW_NOTE,
  "hscp-td-carnot": HSC_PH_TD_CARNOT_NOTE,
};

export const HSC_PH_TD_SLUGS = Object.keys(HSC_PH_TD_NOTES);

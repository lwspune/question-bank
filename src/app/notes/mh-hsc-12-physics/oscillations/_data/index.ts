import type { SubtopicNote } from "@/app/notes/_types";
import { HSC_PH_OS_LINEAR_NOTE } from "./linear";
import { HSC_PH_OS_KINEMATICS_NOTE } from "./kinematics";
import { HSC_PH_OS_PERIOD_NOTE } from "./period";
import { HSC_PH_OS_PHASE_NOTE } from "./phase";
import { HSC_PH_OS_COMPOSITION_NOTE } from "./composition";
import { HSC_PH_OS_ENERGY_NOTE } from "./energy";
import { HSC_PH_OS_PENDULUM_NOTE } from "./pendulum";
import { HSC_PH_OS_ANGULAR_NOTE } from "./angular";
import { HSC_PH_OS_VIBRATIONS_NOTE } from "./vibrations";

export { HSC_PH_OS_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/mh-hsc-12-physics/oscillations/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `hscp-os-` here and `hscpos-` on concept slugs.
 *
 * 9 pages, one per textbook section (the DB subtopics kept as they are, in book order).
 * Order matches `subtopicOrder`.
 */
export const HSC_PH_OS_NOTES: Record<string, SubtopicNote> = {
  "hscp-os-linear": HSC_PH_OS_LINEAR_NOTE,
  "hscp-os-kinematics": HSC_PH_OS_KINEMATICS_NOTE,
  "hscp-os-period": HSC_PH_OS_PERIOD_NOTE,
  "hscp-os-phase": HSC_PH_OS_PHASE_NOTE,
  "hscp-os-composition": HSC_PH_OS_COMPOSITION_NOTE,
  "hscp-os-energy": HSC_PH_OS_ENERGY_NOTE,
  "hscp-os-pendulum": HSC_PH_OS_PENDULUM_NOTE,
  "hscp-os-angular": HSC_PH_OS_ANGULAR_NOTE,
  "hscp-os-vibrations": HSC_PH_OS_VIBRATIONS_NOTE,
};

export const HSC_PH_OS_SLUGS = Object.keys(HSC_PH_OS_NOTES);

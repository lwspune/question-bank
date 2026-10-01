import type { SubtopicNote } from "@/app/notes/_types";
import { KINEMATICS_OSC_NOTE } from "./kinematics";
import { TIMING_OSC_NOTE } from "./timing";
import { SPRINGS_OSC_NOTE } from "./springs";
import { PENDULUM_OSC_NOTE } from "./pendulum";
import { ENERGY_OSC_NOTE } from "./energy";

export { JEE_PH_OSC_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/jee-mains-physics/oscillations/[subtopicSlug].
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is
 * GLOBALLY unique across NOTES_CHAPTERS — hence `jph-osc-` here and `jposc-` on
 * concept slugs.
 */
export const JEE_PH_OSC_NOTES: Record<string, SubtopicNote> = {
  "jph-osc-kinematics": KINEMATICS_OSC_NOTE,
  "jph-osc-timing": TIMING_OSC_NOTE,
  "jph-osc-springs": SPRINGS_OSC_NOTE,
  "jph-osc-pendulum": PENDULUM_OSC_NOTE,
  "jph-osc-energy": ENERGY_OSC_NOTE,
};

export const JEE_PH_OSC_SLUGS = Object.keys(JEE_PH_OSC_NOTES);

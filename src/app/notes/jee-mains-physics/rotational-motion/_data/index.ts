import type { SubtopicNote } from "@/app/notes/_types";
import { COM_ROT_NOTE } from "./com";
import { TORQUE_ROT_NOTE } from "./torque";
import { MOI_ROT_NOTE } from "./moi";
import { AXES_ROT_NOTE } from "./axes";
import { DYNAMICS_ROT_NOTE } from "./dynamics";
import { ANGMOM_ROT_NOTE } from "./angmom";
import { ROLLING_ROT_NOTE } from "./rolling";
import { INCLINE_ROT_NOTE } from "./incline";

export { JEE_PH_ROT_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/jee-mains-physics/rotational-motion/[subtopicSlug].
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is
 * GLOBALLY unique across NOTES_CHAPTERS — hence `jph-rot-` here and `jprot-` on
 * concept slugs.
 */
export const JEE_PH_ROT_NOTES: Record<string, SubtopicNote> = {
  "jph-rot-com": COM_ROT_NOTE,
  "jph-rot-torque": TORQUE_ROT_NOTE,
  "jph-rot-moi": MOI_ROT_NOTE,
  "jph-rot-axes": AXES_ROT_NOTE,
  "jph-rot-dynamics": DYNAMICS_ROT_NOTE,
  "jph-rot-angmom": ANGMOM_ROT_NOTE,
  "jph-rot-rolling": ROLLING_ROT_NOTE,
  "jph-rot-incline": INCLINE_ROT_NOTE,
};

export const JEE_PH_ROT_SLUGS = Object.keys(JEE_PH_ROT_NOTES);

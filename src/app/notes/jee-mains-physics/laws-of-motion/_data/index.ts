import type { SubtopicNote } from "@/app/notes/_types";
import { MOMENTUM_LOM_NOTE } from "./momentum";
import { EQUILIBRIUM_LOM_NOTE } from "./equilibrium";
import { PULLEYS_LOM_NOTE } from "./pulleys";
import { FRICTION_LOM_NOTE } from "./friction";
import { FRAMES_LOM_NOTE } from "./frames";

export { JEE_PH_LOM_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/jee-mains-physics/laws-of-motion/[subtopicSlug].
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is
 * GLOBALLY unique across NOTES_CHAPTERS — hence `jph-lom-` here and `jplom-` on
 * concept slugs.
 */
export const JEE_PH_LOM_NOTES: Record<string, SubtopicNote> = {
  "jph-lom-momentum": MOMENTUM_LOM_NOTE,
  "jph-lom-equilibrium": EQUILIBRIUM_LOM_NOTE,
  "jph-lom-pulleys": PULLEYS_LOM_NOTE,
  "jph-lom-friction": FRICTION_LOM_NOTE,
  "jph-lom-frames": FRAMES_LOM_NOTE,
};

export const JEE_PH_LOM_SLUGS = Object.keys(JEE_PH_LOM_NOTES);

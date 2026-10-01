import type { SubtopicNote } from "@/app/notes/_types";
import { VECTORS_PLANE_NOTE } from "./vectors";
import { RELATIVE_PLANE_NOTE } from "./relative";
import { PROJECTILE_PLANE_NOTE } from "./projectile";
import { TRAJECTORY_PLANE_NOTE } from "./trajectory";
import { UCM_PLANE_NOTE } from "./ucm";
import { DYNAMICS_PLANE_NOTE } from "./dynamics";

export { JEE_PH_PLANE_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/jee-mains-physics/motion-in-a-plane/[subtopicSlug].
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is
 * GLOBALLY unique across NOTES_CHAPTERS — hence `jph-plane-` here and `jpplane-` on
 * concept slugs.
 */
export const JEE_PH_PLANE_NOTES: Record<string, SubtopicNote> = {
  "jph-plane-vectors": VECTORS_PLANE_NOTE,
  "jph-plane-relative": RELATIVE_PLANE_NOTE,
  "jph-plane-projectile": PROJECTILE_PLANE_NOTE,
  "jph-plane-trajectory": TRAJECTORY_PLANE_NOTE,
  "jph-plane-ucm": UCM_PLANE_NOTE,
  "jph-plane-dynamics": DYNAMICS_PLANE_NOTE,
};

export const JEE_PH_PLANE_SLUGS = Object.keys(JEE_PH_PLANE_NOTES);

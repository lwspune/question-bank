import type { SubtopicNote } from "@/app/notes/_types";
import { FOUNDATIONS_NOTE } from "./foundations";
import { EQUATIONS_AND_GRAPHS_NOTE } from "./equations-and-graphs";
import { PROJECTILE_NOTE } from "./projectile";
import { CIRCULAR_NOTE } from "./circular";

export { KINEMATICS_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/nda-physics/kinematics/[subtopicSlug].
 * Keys must match the URL slug; chapter.subtopicOrder owns rendering order.
 * Adding a new note = author the file + add the entry here.
 */
export const KINEMATICS_NOTES: Record<string, SubtopicNote> = {
  "kin-foundations": FOUNDATIONS_NOTE,
  "kin-equations-and-graphs": EQUATIONS_AND_GRAPHS_NOTE,
  "kin-projectile": PROJECTILE_NOTE,
  "kin-circular": CIRCULAR_NOTE,
};

export const KINEMATICS_SLUGS = Object.keys(KINEMATICS_NOTES);

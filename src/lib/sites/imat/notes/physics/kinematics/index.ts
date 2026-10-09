import type { SubtopicNote } from "@/app/notes/_types";
import { IMAT_PHY_KIN_DESCRIBING_NOTE } from "./describing";
import { IMAT_PHY_KIN_ACCELERATED_NOTE } from "./accelerated";
import { IMAT_PHY_KIN_PROJECTILE_CIRCULAR_NOTE } from "./projectile-circular";

export { IMAT_PHY_KIN_CHAPTER } from "./chapter";

/** Slug -> page for IMAT Physics, Kinematics. Order matches `subtopicOrder`. */
export const IMAT_PHY_KIN_NOTES: Record<string, SubtopicNote> = {
  "imat-kin-describing": IMAT_PHY_KIN_DESCRIBING_NOTE,
  "imat-kin-accelerated": IMAT_PHY_KIN_ACCELERATED_NOTE,
  "imat-kin-projectile-circular": IMAT_PHY_KIN_PROJECTILE_CIRCULAR_NOTE,
};

export const IMAT_PHY_KIN_SLUGS = Object.keys(IMAT_PHY_KIN_NOTES);

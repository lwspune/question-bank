import type { SubtopicNote } from "@/app/notes/_types";
import { IMAT_PHY_DYN_NEWTON_NOTE } from "./newton";
import { IMAT_PHY_DYN_FORCES_NOTE } from "./forces";
import { IMAT_PHY_DYN_MOMENTUM_NOTE } from "./momentum";
import { IMAT_PHY_DYN_WORK_ENERGY_NOTE } from "./work-energy";
import { IMAT_PHY_DYN_CONSERVATION_POWER_NOTE } from "./conservation-power";
import { IMAT_PHY_DYN_MOMENTS_NOTE } from "./moments";

export { IMAT_PHY_DYN_CHAPTER } from "./chapter";

/** Slug -> page for IMAT Physics, Dynamics, Work and Energy. Order matches `subtopicOrder`. */
export const IMAT_PHY_DYN_NOTES: Record<string, SubtopicNote> = {
  "imat-dyn-newton": IMAT_PHY_DYN_NEWTON_NOTE,
  "imat-dyn-forces": IMAT_PHY_DYN_FORCES_NOTE,
  "imat-dyn-momentum": IMAT_PHY_DYN_MOMENTUM_NOTE,
  "imat-dyn-work-energy": IMAT_PHY_DYN_WORK_ENERGY_NOTE,
  "imat-dyn-conservation-power": IMAT_PHY_DYN_CONSERVATION_POWER_NOTE,
  "imat-dyn-moments": IMAT_PHY_DYN_MOMENTS_NOTE,
};

export const IMAT_PHY_DYN_SLUGS = Object.keys(IMAT_PHY_DYN_NOTES);

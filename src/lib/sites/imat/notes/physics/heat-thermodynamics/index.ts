import type { SubtopicNote } from "@/app/notes/_types";
import { IMAT_PHY_HTH_TEMPERATURE_NOTE } from "./temperature";
import { IMAT_PHY_HTH_CALORIMETRY_NOTE } from "./calorimetry";
import { IMAT_PHY_HTH_IDEAL_GAS_NOTE } from "./ideal-gas";
import { IMAT_PHY_HTH_FIRST_LAW_NOTE } from "./first-law";
import { IMAT_PHY_HTH_SECOND_LAW_NOTE } from "./second-law";

export { IMAT_PHY_HTH_CHAPTER } from "./chapter";

/** Slug -> page for IMAT Physics, Heat and Thermodynamics. Order matches `subtopicOrder`. */
export const IMAT_PHY_HTH_NOTES: Record<string, SubtopicNote> = {
  "imat-hth-temperature": IMAT_PHY_HTH_TEMPERATURE_NOTE,
  "imat-hth-calorimetry": IMAT_PHY_HTH_CALORIMETRY_NOTE,
  "imat-hth-ideal-gas": IMAT_PHY_HTH_IDEAL_GAS_NOTE,
  "imat-hth-first-law": IMAT_PHY_HTH_FIRST_LAW_NOTE,
  "imat-hth-second-law": IMAT_PHY_HTH_SECOND_LAW_NOTE,
};

export const IMAT_PHY_HTH_SLUGS = Object.keys(IMAT_PHY_HTH_NOTES);

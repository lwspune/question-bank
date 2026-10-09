import type { SubtopicNote } from "@/app/notes/_types";
import { IMAT_PHY_ELE_CHARGE_NOTE } from "./charge";
import { IMAT_PHY_ELE_POTENTIAL_NOTE } from "./potential";
import { IMAT_PHY_ELE_CURRENT_NOTE } from "./current";
import { IMAT_PHY_ELE_CIRCUITS_NOTE } from "./circuits";
import { IMAT_PHY_ELE_POWER_NOTE } from "./power";

export { IMAT_PHY_ELE_CHAPTER } from "./chapter";

/** Slug -> page for IMAT Physics, Electricity. Order matches `subtopicOrder`. */
export const IMAT_PHY_ELE_NOTES: Record<string, SubtopicNote> = {
  "imat-ele-charge": IMAT_PHY_ELE_CHARGE_NOTE,
  "imat-ele-potential": IMAT_PHY_ELE_POTENTIAL_NOTE,
  "imat-ele-current": IMAT_PHY_ELE_CURRENT_NOTE,
  "imat-ele-circuits": IMAT_PHY_ELE_CIRCUITS_NOTE,
  "imat-ele-power": IMAT_PHY_ELE_POWER_NOTE,
};

export const IMAT_PHY_ELE_SLUGS = Object.keys(IMAT_PHY_ELE_NOTES);

import type { SubtopicNote } from "@/app/notes/_types";
import { IMAT_PHY_MU_UNITS_NOTE } from "./units";
import { IMAT_PHY_MU_DIMENSIONS_NOTE } from "./dimensions-vectors";

export { IMAT_PHY_MU_CHAPTER } from "./chapter";

/** Slug -> page for IMAT Physics, Measurement and Units. Order matches `subtopicOrder`. */
export const IMAT_PHY_MU_NOTES: Record<string, SubtopicNote> = {
  "imat-mu-units": IMAT_PHY_MU_UNITS_NOTE,
  "imat-mu-dimensions-vectors": IMAT_PHY_MU_DIMENSIONS_NOTE,
};

export const IMAT_PHY_MU_SLUGS = Object.keys(IMAT_PHY_MU_NOTES);

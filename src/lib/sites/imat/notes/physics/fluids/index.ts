import type { SubtopicNote } from "@/app/notes/_types";
import { IMAT_PHY_FLU_PRESSURE_NOTE } from "./pressure";
import { IMAT_PHY_FLU_BUOYANCY_NOTE } from "./buoyancy";

export { IMAT_PHY_FLUIDS_CHAPTER } from "./chapter";

/** Slug -> page for IMAT Physics, Fluids. Order matches `subtopicOrder`. */
export const IMAT_PHY_FLUIDS_NOTES: Record<string, SubtopicNote> = {
  "imat-flu-pressure": IMAT_PHY_FLU_PRESSURE_NOTE,
  "imat-flu-buoyancy": IMAT_PHY_FLU_BUOYANCY_NOTE,
};

export const IMAT_PHY_FLUIDS_SLUGS = Object.keys(IMAT_PHY_FLUIDS_NOTES);

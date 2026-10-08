import type { SubtopicNote } from "@/app/notes/_types";
import { IMAT_MAT_EQI_EXPRESSIONS_NOTE } from "./expressions";
import { IMAT_MAT_EQI_LINEAR_NOTE } from "./linear";
import { IMAT_MAT_EQI_QUADRATICS_NOTE } from "./quadratics";
import { IMAT_MAT_EQI_INEQUALITIES_NOTE } from "./inequalities";
import { IMAT_MAT_EQI_SPECIAL_EQUATIONS_NOTE } from "./special-equations";

export { IMAT_MAT_EQI_CHAPTER } from "./chapter";

/** Slug -> page for IMAT Mathematics, Equations and Inequalities. Order matches `subtopicOrder`. */
export const IMAT_MAT_EQI_NOTES: Record<string, SubtopicNote> = {
  "imat-eqi-expressions": IMAT_MAT_EQI_EXPRESSIONS_NOTE,
  "imat-eqi-linear": IMAT_MAT_EQI_LINEAR_NOTE,
  "imat-eqi-quadratics": IMAT_MAT_EQI_QUADRATICS_NOTE,
  "imat-eqi-inequalities": IMAT_MAT_EQI_INEQUALITIES_NOTE,
  "imat-eqi-special-equations": IMAT_MAT_EQI_SPECIAL_EQUATIONS_NOTE,
};

export const IMAT_MAT_EQI_SLUGS = Object.keys(IMAT_MAT_EQI_NOTES);

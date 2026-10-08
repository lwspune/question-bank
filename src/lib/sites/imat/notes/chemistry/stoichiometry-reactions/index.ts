import type { SubtopicNote } from "@/app/notes/_types";
import { IMAT_CHE_STO_MOLE_NOTE } from "./mole";
import { IMAT_CHE_STO_FORMULAS_NOTE } from "./formulas";
import { IMAT_CHE_STO_EQUATIONS_NOTE } from "./equations";
import { IMAT_CHE_STO_TYPES_NOTE } from "./types";
import { IMAT_CHE_STO_REACTING_NOTE } from "./reacting";

export { IMAT_CHE_STO_CHAPTER } from "./chapter";

/** Slug -> page for IMAT Chemistry, Stoichiometry and Reactions. Order matches `subtopicOrder`. */
export const IMAT_CHE_STO_NOTES: Record<string, SubtopicNote> = {
  "imat-sto-mole": IMAT_CHE_STO_MOLE_NOTE,
  "imat-sto-formulas": IMAT_CHE_STO_FORMULAS_NOTE,
  "imat-sto-equations": IMAT_CHE_STO_EQUATIONS_NOTE,
  "imat-sto-types": IMAT_CHE_STO_TYPES_NOTE,
  "imat-sto-reacting": IMAT_CHE_STO_REACTING_NOTE,
};

export const IMAT_CHE_STO_SLUGS = Object.keys(IMAT_CHE_STO_NOTES);

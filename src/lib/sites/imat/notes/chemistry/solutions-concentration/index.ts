import type { SubtopicNote } from "@/app/notes/_types";
import { IMAT_CHE_SOL_MIXTURES_NOTE } from "./mixtures";
import { IMAT_CHE_SOL_SOLUBILITY_NOTE } from "./solubility";
import { IMAT_CHE_SOL_CONCENTRATION_NOTE } from "./concentration";
import { IMAT_CHE_SOL_DILUTION_NOTE } from "./dilution";
import { IMAT_CHE_SOL_COLLIGATIVE_NOTE } from "./colligative";

export { IMAT_CHE_SOL_CHAPTER } from "./chapter";

/** Slug -> page for IMAT Chemistry, Solutions and Concentration. Order matches `subtopicOrder`. */
export const IMAT_CHE_SOL_NOTES: Record<string, SubtopicNote> = {
  "imat-sol-mixtures": IMAT_CHE_SOL_MIXTURES_NOTE,
  "imat-sol-solubility": IMAT_CHE_SOL_SOLUBILITY_NOTE,
  "imat-sol-concentration": IMAT_CHE_SOL_CONCENTRATION_NOTE,
  "imat-sol-dilution": IMAT_CHE_SOL_DILUTION_NOTE,
  "imat-sol-colligative": IMAT_CHE_SOL_COLLIGATIVE_NOTE,
};

export const IMAT_CHE_SOL_SLUGS = Object.keys(IMAT_CHE_SOL_NOTES);

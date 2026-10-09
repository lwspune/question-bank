import type { SubtopicNote } from "@/app/notes/_types";
import { IMAT_CHE_EQK_ENERGETICS_NOTE } from "./energetics";
import { IMAT_CHE_EQK_SPONTANEITY_NOTE } from "./spontaneity";
import { IMAT_CHE_EQK_RATES_NOTE } from "./rates";
import { IMAT_CHE_EQK_EQUILIBRIUM_NOTE } from "./equilibrium";
import { IMAT_CHE_EQK_LE_CHATELIER_NOTE } from "./le-chatelier";

export { IMAT_CHE_EQK_CHAPTER } from "./chapter";

/** Slug -> page for IMAT Chemistry, Equilibrium, Kinetics and Energetics. Order matches `subtopicOrder`. */
export const IMAT_CHE_EQK_NOTES: Record<string, SubtopicNote> = {
  "imat-eqk-energetics": IMAT_CHE_EQK_ENERGETICS_NOTE,
  "imat-eqk-spontaneity": IMAT_CHE_EQK_SPONTANEITY_NOTE,
  "imat-eqk-rates": IMAT_CHE_EQK_RATES_NOTE,
  "imat-eqk-equilibrium": IMAT_CHE_EQK_EQUILIBRIUM_NOTE,
  "imat-eqk-le-chatelier": IMAT_CHE_EQK_LE_CHATELIER_NOTE,
};

export const IMAT_CHE_EQK_SLUGS = Object.keys(IMAT_CHE_EQK_NOTES);

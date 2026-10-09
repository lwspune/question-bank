import type { SubtopicNote } from "@/app/notes/_types";
import { IMAT_CHE_GAS_STATES_NOTE } from "./states";
import { IMAT_CHE_GAS_CHANGES_NOTE } from "./changes";
import { IMAT_CHE_GAS_LAWS_NOTE } from "./laws";
import { IMAT_CHE_GAS_IDEAL_NOTE } from "./ideal";
import { IMAT_CHE_GAS_SEPARATION_NOTE } from "./separation";

export { IMAT_CHE_GAS_CHAPTER } from "./chapter";

/** Slug -> page for IMAT Chemistry, States of Matter and Gas Laws. Order matches `subtopicOrder`. */
export const IMAT_CHE_GAS_NOTES: Record<string, SubtopicNote> = {
  "imat-gas-states": IMAT_CHE_GAS_STATES_NOTE,
  "imat-gas-changes": IMAT_CHE_GAS_CHANGES_NOTE,
  "imat-gas-laws": IMAT_CHE_GAS_LAWS_NOTE,
  "imat-gas-ideal": IMAT_CHE_GAS_IDEAL_NOTE,
  "imat-gas-mixtures": IMAT_CHE_GAS_SEPARATION_NOTE,
};

export const IMAT_CHE_GAS_SLUGS = Object.keys(IMAT_CHE_GAS_NOTES);

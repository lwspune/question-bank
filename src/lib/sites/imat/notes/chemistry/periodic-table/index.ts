import type { SubtopicNote } from "@/app/notes/_types";
import { IMAT_CHE_PTB_LAYOUT_NOTE } from "./layout";
import { IMAT_CHE_PTB_SIZE_NOTE } from "./size";
import { IMAT_CHE_PTB_ENERGY_NOTE } from "./energy";
import { IMAT_CHE_PTB_GROUPS_NOTE } from "./groups";
import { IMAT_CHE_PTB_TRANSITION_NOTE } from "./transition";

export { IMAT_CHE_PTB_CHAPTER } from "./chapter";

/** Slug -> page for IMAT Chemistry, Periodic Table. Order matches `subtopicOrder`. */
export const IMAT_CHE_PTB_NOTES: Record<string, SubtopicNote> = {
  "imat-ptb-layout": IMAT_CHE_PTB_LAYOUT_NOTE,
  "imat-ptb-size": IMAT_CHE_PTB_SIZE_NOTE,
  "imat-ptb-energy": IMAT_CHE_PTB_ENERGY_NOTE,
  "imat-ptb-groups": IMAT_CHE_PTB_GROUPS_NOTE,
  "imat-ptb-transition": IMAT_CHE_PTB_TRANSITION_NOTE,
};

export const IMAT_CHE_PTB_SLUGS = Object.keys(IMAT_CHE_PTB_NOTES);

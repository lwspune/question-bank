import type { SubtopicNote } from "@/app/notes/_types";
import { IMAT_CHE_RDX_OX_NUMBERS_NOTE } from "./ox-numbers";
import { IMAT_CHE_RDX_RECOGNISING_NOTE } from "./recognising";
import { IMAT_CHE_RDX_BALANCING_NOTE } from "./balancing";
import { IMAT_CHE_RDX_REACTIVITY_NOTE } from "./reactivity";
import { IMAT_CHE_RDX_CELLS_NOTE } from "./cells";

export { IMAT_CHE_RDX_CHAPTER } from "./chapter";

/** Slug -> page for IMAT Chemistry, Redox Reactions. Order matches `subtopicOrder`. */
export const IMAT_CHE_RDX_NOTES: Record<string, SubtopicNote> = {
  "imat-rdx-ox-numbers-page": IMAT_CHE_RDX_OX_NUMBERS_NOTE,
  "imat-rdx-recognising-page": IMAT_CHE_RDX_RECOGNISING_NOTE,
  "imat-rdx-balancing-page": IMAT_CHE_RDX_BALANCING_NOTE,
  "imat-rdx-reactivity-page": IMAT_CHE_RDX_REACTIVITY_NOTE,
  "imat-rdx-cells-page": IMAT_CHE_RDX_CELLS_NOTE,
};

export const IMAT_CHE_RDX_SLUGS = Object.keys(IMAT_CHE_RDX_NOTES);

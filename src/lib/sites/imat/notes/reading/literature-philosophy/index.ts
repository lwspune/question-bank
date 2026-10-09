import type { SubtopicNote } from "@/app/notes/_types";
import { IMAT_REA_LIT_GREEK_ITALIAN_NOTE } from "./greek-italian";
import { IMAT_REA_LIT_ENGLISH_NOTE } from "./english";
import { IMAT_REA_LIT_WORLD_NOTE } from "./world";
import { IMAT_REA_LIT_PHILOSOPHY_NOTE } from "./philosophy";
import { IMAT_REA_LIT_ARTS_NOTE } from "./arts";

export { IMAT_REA_LIT_CHAPTER } from "./chapter";

/** Slug -> page for IMAT Reading and General Knowledge, Literature and Philosophy. Order matches `subtopicOrder`. */
export const IMAT_REA_LIT_NOTES: Record<string, SubtopicNote> = {
  "imat-lit-greek-italian": IMAT_REA_LIT_GREEK_ITALIAN_NOTE,
  "imat-lit-english": IMAT_REA_LIT_ENGLISH_NOTE,
  "imat-lit-world": IMAT_REA_LIT_WORLD_NOTE,
  "imat-lit-philosophy": IMAT_REA_LIT_PHILOSOPHY_NOTE,
  "imat-lit-arts": IMAT_REA_LIT_ARTS_NOTE,
};

export const IMAT_REA_LIT_SLUGS = Object.keys(IMAT_REA_LIT_NOTES);

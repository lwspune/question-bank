import type { SubtopicNote } from "@/app/notes/_types";
import { IMAT_BIO_CDR_CELL_CYCLE_NOTE } from "./cell-cycle";
import { IMAT_BIO_CDR_MEIOSIS_NOTE } from "./meiosis";
import { IMAT_BIO_CDR_GAMETES_NOTE } from "./gametes";
import { IMAT_BIO_CDR_REPRODUCTION_NOTE } from "./reproduction";

export { IMAT_BIO_CDR_CHAPTER } from "./chapter";

/** Slug -> page for IMAT Biology, Cell Division and Reproduction. Order matches `subtopicOrder`. */
export const IMAT_BIO_CDR_NOTES: Record<string, SubtopicNote> = {
  "imat-cdr-cell-cycle": IMAT_BIO_CDR_CELL_CYCLE_NOTE,
  "imat-cdr-meiosis": IMAT_BIO_CDR_MEIOSIS_NOTE,
  "imat-cdr-gametes": IMAT_BIO_CDR_GAMETES_NOTE,
  "imat-cdr-reproduction": IMAT_BIO_CDR_REPRODUCTION_NOTE,
};

export const IMAT_BIO_CDR_SLUGS = Object.keys(IMAT_BIO_CDR_NOTES);

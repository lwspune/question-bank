import type { SubtopicNote } from "@/app/notes/_types";
import { IMAT_REA_RDC_SUPPORTED_NOTE } from "./supported";
import { IMAT_REA_RDC_NEGATIVE_NOTE } from "./negative-cause";
import { IMAT_REA_RDC_TECHNICAL_NOTE } from "./technical";
import { IMAT_REA_RDC_AUTHOR_NOTE } from "./author";

export { IMAT_REA_RDC_CHAPTER } from "./chapter";

/** Slug -> page for IMAT Reading Skills, Reading Comprehension. Order matches `subtopicOrder`. */
export const IMAT_REA_RDC_NOTES: Record<string, SubtopicNote> = {
  "imat-rdc-supported": IMAT_REA_RDC_SUPPORTED_NOTE,
  "imat-rdc-negative-cause": IMAT_REA_RDC_NEGATIVE_NOTE,
  "imat-rdc-technical": IMAT_REA_RDC_TECHNICAL_NOTE,
  "imat-rdc-author": IMAT_REA_RDC_AUTHOR_NOTE,
};

export const IMAT_REA_RDC_SLUGS = Object.keys(IMAT_REA_RDC_NOTES);

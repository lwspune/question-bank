import type { SubtopicNote } from "@/app/notes/_types";
import { IMAT_MAT_NPL_NUMBERS_NOTE } from "./numbers";
import { IMAT_MAT_NPL_POWERS_NOTE } from "./powers";
import { IMAT_MAT_NPL_LOGS_NOTE } from "./logs";
import { IMAT_MAT_NPL_ABS_PERCENT_NOTE } from "./abs-percent";

export { IMAT_MAT_NPL_CHAPTER } from "./chapter";

/** Slug -> page for IMAT Mathematics, Numbers, Powers and Logarithms. Order matches `subtopicOrder`. */
export const IMAT_MAT_NPL_NOTES: Record<string, SubtopicNote> = {
  "imat-npl-numbers": IMAT_MAT_NPL_NUMBERS_NOTE,
  "imat-npl-powers": IMAT_MAT_NPL_POWERS_NOTE,
  "imat-npl-logs": IMAT_MAT_NPL_LOGS_NOTE,
  "imat-npl-abs-percent": IMAT_MAT_NPL_ABS_PERCENT_NOTE,
};

export const IMAT_MAT_NPL_SLUGS = Object.keys(IMAT_MAT_NPL_NOTES);

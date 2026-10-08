import type { SubtopicNote } from "@/app/notes/_types";
import { IMAT_MAT_PST_COUNTING_NOTE } from "./counting";
import { IMAT_MAT_PST_PROBABILITY_NOTE } from "./probability";
import { IMAT_MAT_PST_STATISTICS_NOTE } from "./statistics";

export { IMAT_MAT_PST_CHAPTER } from "./chapter";

/** Slug -> page for IMAT Mathematics, Probability and Statistics. Order matches `subtopicOrder`. */
export const IMAT_MAT_PST_NOTES: Record<string, SubtopicNote> = {
  "imat-pst-counting": IMAT_MAT_PST_COUNTING_NOTE,
  "imat-pst-probability": IMAT_MAT_PST_PROBABILITY_NOTE,
  "imat-pst-statistics": IMAT_MAT_PST_STATISTICS_NOTE,
};

export const IMAT_MAT_PST_SLUGS = Object.keys(IMAT_MAT_PST_NOTES);

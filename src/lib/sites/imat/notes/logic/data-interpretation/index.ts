import type { SubtopicNote } from "@/app/notes/_types";
import { IMAT_LOG_DAT_READING_NOTE } from "./reading";
import { IMAT_LOG_DAT_STATS_NOTE } from "./stats";
import { IMAT_LOG_DAT_DECISIONS_NOTE } from "./decisions";

export { IMAT_LOG_DAT_CHAPTER } from "./chapter";

/** Slug -> page for IMAT Logical Reasoning, Data Interpretation. Order matches `subtopicOrder`. */
export const IMAT_LOG_DAT_NOTES: Record<string, SubtopicNote> = {
  "imat-dat-reading": IMAT_LOG_DAT_READING_NOTE,
  "imat-dat-stats": IMAT_LOG_DAT_STATS_NOTE,
  "imat-dat-decisions": IMAT_LOG_DAT_DECISIONS_NOTE,
};

export const IMAT_LOG_DAT_SLUGS = Object.keys(IMAT_LOG_DAT_NOTES);

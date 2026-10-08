import type { SubtopicNote } from "@/app/notes/_types";
import { IMAT_LOG_NUR_WORDS_NOTE } from "./words";
import { IMAT_LOG_NUR_PERCENT_NOTE } from "./percentages";
import { IMAT_LOG_NUR_RATIO_NOTE } from "./ratio";
import { IMAT_LOG_NUR_UNITS_NOTE } from "./units";
import { IMAT_LOG_NUR_COUNTING_NOTE } from "./counting";
import { IMAT_LOG_NUR_GROWTH_NOTE } from "./growth";

export { IMAT_LOG_NUR_CHAPTER } from "./chapter";

/** Slug -> page for IMAT Logical Reasoning, Numerical Reasoning. Order matches `subtopicOrder`. */
export const IMAT_LOG_NUR_NOTES: Record<string, SubtopicNote> = {
  "imat-nur-words": IMAT_LOG_NUR_WORDS_NOTE,
  "imat-nur-percent": IMAT_LOG_NUR_PERCENT_NOTE,
  "imat-nur-ratio": IMAT_LOG_NUR_RATIO_NOTE,
  "imat-nur-units": IMAT_LOG_NUR_UNITS_NOTE,
  "imat-nur-counting": IMAT_LOG_NUR_COUNTING_NOTE,
  "imat-nur-growth": IMAT_LOG_NUR_GROWTH_NOTE,
};

export const IMAT_LOG_NUR_SLUGS = Object.keys(IMAT_LOG_NUR_NOTES);

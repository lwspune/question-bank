import type { SubtopicNote } from "@/app/notes/_types";
import { IMAT_MAT_SLG_SETS_NOTE } from "./sets";
import { IMAT_MAT_SLG_LOGIC_NOTE } from "./logic";

export { IMAT_MAT_SLG_CHAPTER } from "./chapter";

/** Slug -> page for IMAT Mathematics, Sets and Logic. Order matches `subtopicOrder`. */
export const IMAT_MAT_SLG_NOTES: Record<string, SubtopicNote> = {
  "imat-slg-sets": IMAT_MAT_SLG_SETS_NOTE,
  "imat-slg-logic": IMAT_MAT_SLG_LOGIC_NOTE,
};

export const IMAT_MAT_SLG_SLUGS = Object.keys(IMAT_MAT_SLG_NOTES);

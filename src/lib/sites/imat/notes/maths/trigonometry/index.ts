import type { SubtopicNote } from "@/app/notes/_types";
import { IMAT_MAT_TRG_RATIOS_NOTE } from "./ratios";
import { IMAT_MAT_TRG_GRAPHS_EQUATIONS_NOTE } from "./graphs-equations";

export { IMAT_MAT_TRG_CHAPTER } from "./chapter";

/** Slug -> page for IMAT Mathematics, Trigonometry. Order matches `subtopicOrder`. */
export const IMAT_MAT_TRG_NOTES: Record<string, SubtopicNote> = {
  "imat-trg-ratios": IMAT_MAT_TRG_RATIOS_NOTE,
  "imat-trg-graphs-equations": IMAT_MAT_TRG_GRAPHS_EQUATIONS_NOTE,
};

export const IMAT_MAT_TRG_SLUGS = Object.keys(IMAT_MAT_TRG_NOTES);

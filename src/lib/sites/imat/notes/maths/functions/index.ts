import type { SubtopicNote } from "@/app/notes/_types";
import { IMAT_MAT_FUN_BASICS_NOTE } from "./basics";
import { IMAT_MAT_FUN_GRAPHS_NOTE } from "./graphs";
import { IMAT_MAT_FUN_INVERSE_TRANSFORM_NOTE } from "./inverse-transform";

export { IMAT_MAT_FUN_CHAPTER } from "./chapter";

/** Slug -> page for IMAT Mathematics, Functions. Order matches `subtopicOrder`. */
export const IMAT_MAT_FUN_NOTES: Record<string, SubtopicNote> = {
  "imat-fun-basics": IMAT_MAT_FUN_BASICS_NOTE,
  "imat-fun-graphs": IMAT_MAT_FUN_GRAPHS_NOTE,
  "imat-fun-inverse-transform": IMAT_MAT_FUN_INVERSE_TRANSFORM_NOTE,
};

export const IMAT_MAT_FUN_SLUGS = Object.keys(IMAT_MAT_FUN_NOTES);

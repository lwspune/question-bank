import type { SubtopicNote } from "@/app/notes/_types";
import { IMAT_LOG_SPA_NUMBERS_NOTE } from "./numbers";
import { IMAT_LOG_SPA_LETTERS_NOTE } from "./letters";
import { IMAT_LOG_SPA_CLOCKS_NOTE } from "./clocks";
import { IMAT_LOG_SPA_REFLECTIONS_NOTE } from "./reflections";
import { IMAT_LOG_SPA_SOLIDS_NOTE } from "./solids";
import { IMAT_LOG_SPA_GRIDS_NOTE } from "./grids";

export { IMAT_LOG_SPA_CHAPTER } from "./chapter";

/** Slug -> page for IMAT Logical Reasoning, Spatial and Sequence Reasoning. Order matches `subtopicOrder`. */
export const IMAT_LOG_SPA_NOTES: Record<string, SubtopicNote> = {
  "imat-spa-numbers": IMAT_LOG_SPA_NUMBERS_NOTE,
  "imat-spa-letters": IMAT_LOG_SPA_LETTERS_NOTE,
  "imat-spa-clocks": IMAT_LOG_SPA_CLOCKS_NOTE,
  "imat-spa-reflections": IMAT_LOG_SPA_REFLECTIONS_NOTE,
  "imat-spa-solids": IMAT_LOG_SPA_SOLIDS_NOTE,
  "imat-spa-grids": IMAT_LOG_SPA_GRIDS_NOTE,
};

export const IMAT_LOG_SPA_SLUGS = Object.keys(IMAT_LOG_SPA_NOTES);

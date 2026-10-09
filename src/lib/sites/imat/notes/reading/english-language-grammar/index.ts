import type { SubtopicNote } from "@/app/notes/_types";
import { IMAT_REA_ENG_VERBS_NOTE } from "./verbs";
import { IMAT_REA_ENG_USAGE_NOTE } from "./usage";

export { IMAT_REA_ENG_CHAPTER } from "./chapter";

/** Slug -> page for IMAT Reading Skills, English Language and Grammar. Order matches `subtopicOrder`. */
export const IMAT_REA_ENG_NOTES: Record<string, SubtopicNote> = {
  "imat-eng-verbs": IMAT_REA_ENG_VERBS_NOTE,
  "imat-eng-usage": IMAT_REA_ENG_USAGE_NOTE,
};

export const IMAT_REA_ENG_SLUGS = Object.keys(IMAT_REA_ENG_NOTES);

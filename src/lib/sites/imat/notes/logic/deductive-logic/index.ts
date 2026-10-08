import type { SubtopicNote } from "@/app/notes/_types";
import { IMAT_LOG_DED_STATEMENTS_NOTE } from "./statements";
import { IMAT_LOG_DED_CONDITIONALS_NOTE } from "./conditionals";
import { IMAT_LOG_DED_SYLLOGISMS_NOTE } from "./syllogisms";
import { IMAT_LOG_DED_PUZZLES_NOTE } from "./puzzles";

export { IMAT_LOG_DED_CHAPTER } from "./chapter";

/** Slug -> page for IMAT Logical Reasoning, Deductive Logic. Order matches `subtopicOrder`. */
export const IMAT_LOG_DED_NOTES: Record<string, SubtopicNote> = {
  "imat-ded-statements": IMAT_LOG_DED_STATEMENTS_NOTE,
  "imat-ded-conditionals": IMAT_LOG_DED_CONDITIONALS_NOTE,
  "imat-ded-syllogisms": IMAT_LOG_DED_SYLLOGISMS_NOTE,
  "imat-ded-puzzles": IMAT_LOG_DED_PUZZLES_NOTE,
};

export const IMAT_LOG_DED_SLUGS = Object.keys(IMAT_LOG_DED_NOTES);

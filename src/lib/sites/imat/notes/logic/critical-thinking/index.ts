import type { SubtopicNote } from "@/app/notes/_types";
import { IMAT_LOG_CRT_STRUCTURE_NOTE } from "./structure";
import { IMAT_LOG_CRT_INFERENCE_NOTE } from "./inference";
import { IMAT_LOG_CRT_ASSUMPTIONS_NOTE } from "./assumptions";
import { IMAT_LOG_CRT_EVALUATE_NOTE } from "./evaluate";
import { IMAT_LOG_CRT_FLAWS_NOTE } from "./flaws";
import { IMAT_LOG_CRT_PATTERNS_NOTE } from "./patterns";

export { IMAT_LOG_CRT_CHAPTER } from "./chapter";

/** Slug -> page for IMAT Logical Reasoning, Critical Thinking. Order matches `subtopicOrder`. */
export const IMAT_LOG_CRT_NOTES: Record<string, SubtopicNote> = {
  "imat-crt-structure": IMAT_LOG_CRT_STRUCTURE_NOTE,
  "imat-crt-inference": IMAT_LOG_CRT_INFERENCE_NOTE,
  "imat-crt-assumptions": IMAT_LOG_CRT_ASSUMPTIONS_NOTE,
  "imat-crt-evaluate": IMAT_LOG_CRT_EVALUATE_NOTE,
  "imat-crt-flaws": IMAT_LOG_CRT_FLAWS_NOTE,
  "imat-crt-patterns": IMAT_LOG_CRT_PATTERNS_NOTE,
};

export const IMAT_LOG_CRT_SLUGS = Object.keys(IMAT_LOG_CRT_NOTES);

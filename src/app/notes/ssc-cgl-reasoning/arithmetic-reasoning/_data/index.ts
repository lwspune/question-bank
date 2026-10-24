import type { SubtopicNote } from "@/app/notes/_types";
import { SSC_RAR_CALCULATION_NOTE } from "./calculation";
import { SSC_RAR_EQUATIONS_NOTE } from "./equations";
import { SSC_RAR_RATIO_NOTE } from "./ratio";
import { SSC_RAR_PERCENT_NOTE } from "./percent";
import { SSC_RAR_SPEED_NOTE } from "./speed";
import { SSC_RAR_COUNTING_NOTE } from "./counting";

export { SSC_ARITHMETIC_REASONING_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/ssc-cgl-reasoning/arithmetic-reasoning/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `ssc-rar-` here and `sscrar-` on concept slugs.
 *
 * Pages cut by reading every question (scripts/ssc-cgl/reshape/arithmetic-reasoning.ts). Order matches `subtopicOrder`.
 */
export const SSC_ARITHMETIC_REASONING_NOTES: Record<string, SubtopicNote> = {
  "ssc-rar-calculation": SSC_RAR_CALCULATION_NOTE,
  "ssc-rar-equations": SSC_RAR_EQUATIONS_NOTE,
  "ssc-rar-ratio": SSC_RAR_RATIO_NOTE,
  "ssc-rar-percent": SSC_RAR_PERCENT_NOTE,
  "ssc-rar-speed": SSC_RAR_SPEED_NOTE,
  "ssc-rar-counting": SSC_RAR_COUNTING_NOTE,
};

export const SSC_ARITHMETIC_REASONING_SLUGS = Object.keys(SSC_ARITHMETIC_REASONING_NOTES);

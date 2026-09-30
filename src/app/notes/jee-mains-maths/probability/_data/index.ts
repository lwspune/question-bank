import type { SubtopicNote } from "@/app/notes/_types";
import { COUNTING_PROB_NOTE } from "./counting";
import { DICE_PROB_NOTE } from "./dice";
import { CONDITIONS_PROB_NOTE } from "./conditions";
import { RULES_PROB_NOTE } from "./rules";
import { BAYES_PROB_NOTE } from "./bayes";
import { BINOMIAL_PROB_NOTE } from "./binomial";
import { RV_PROB_NOTE } from "./rv";

export { JEE_PROBABILITY_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/jee-mains-maths/probability/[subtopicSlug].
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is
 * GLOBALLY unique across NOTES_CHAPTERS — hence `jee-prob-` here and `jprob-` on
 * concept slugs.
 */
export const JEE_PROBABILITY_NOTES: Record<string, SubtopicNote> = {
  "jee-prob-counting": COUNTING_PROB_NOTE,
  "jee-prob-dice": DICE_PROB_NOTE,
  "jee-prob-conditions": CONDITIONS_PROB_NOTE,
  "jee-prob-rules": RULES_PROB_NOTE,
  "jee-prob-bayes": BAYES_PROB_NOTE,
  "jee-prob-binomial": BINOMIAL_PROB_NOTE,
  "jee-prob-rv": RV_PROB_NOTE,
};

export const JEE_PROBABILITY_SLUGS = Object.keys(JEE_PROBABILITY_NOTES);

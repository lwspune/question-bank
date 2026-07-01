import type { SubtopicNote } from "@/app/notes/_types";
import { ORDER_DEGREE_FORMATION_NOTE } from "./order-degree-formation";
import { VARIABLE_SEPARABLE_NOTE } from "./variable-separable";
import { HOMOGENEOUS_REDUCIBLE_NOTE } from "./homogeneous-reducible";
import { LINEAR_IF_NOTE } from "./linear-integrating-factor";
import { GROWTH_DECAY_MODELS_NOTE } from "./growth-decay-models";
import { NEWTONS_COOLING_NOTE } from "./newtons-law-cooling";

export { DIFFERENTIAL_EQUATIONS_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for
 * /notes/mht-cet-maths/differential-equations/[subtopicSlug].
 * Keys must match the URL slug; chapter.subtopicOrder owns rendering order.
 */
export const DIFFERENTIAL_EQUATIONS_NOTES: Record<string, SubtopicNote> = {
  "order-degree-formation": ORDER_DEGREE_FORMATION_NOTE,
  "variable-separable": VARIABLE_SEPARABLE_NOTE,
  "homogeneous-reducible": HOMOGENEOUS_REDUCIBLE_NOTE,
  "linear-integrating-factor": LINEAR_IF_NOTE,
  "growth-decay-models": GROWTH_DECAY_MODELS_NOTE,
  "newtons-law-cooling": NEWTONS_COOLING_NOTE,
};

export const DIFFERENTIAL_EQUATIONS_SLUGS = Object.keys(
  DIFFERENTIAL_EQUATIONS_NOTES
);

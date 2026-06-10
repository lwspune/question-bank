import type { SubtopicNote } from "@/app/notes/_types";
import { CATENATION_ISOMERISM_NOTE } from "./catenation-isomerism";
import { ALLOTROPES_NOTE } from "./allotropes";
import { HYDROCARBONS_NOTE } from "./hydrocarbons";
import { FUNCTIONAL_GROUPS_NOTE } from "./functional-groups";
import { COMMON_COMPOUNDS_NOTE } from "./common-compounds";
import { SOAPS_NOTE } from "./soaps";

export { CARBON_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/nda-chemistry/carbon-and-its-compounds/[subtopicSlug].
 * Keys are GLOBALLY-unique (`carb-` prefixed) because they double as the
 * question_concept_tags subtopic_slug; chapter.subtopicOrder owns render order.
 */
export const CARBON_NOTES: Record<string, SubtopicNote> = {
  "carb-catenation": CATENATION_ISOMERISM_NOTE,
  "carb-allotropes": ALLOTROPES_NOTE,
  "carb-hydrocarbons": HYDROCARBONS_NOTE,
  "carb-functional-groups": FUNCTIONAL_GROUPS_NOTE,
  "carb-common-compounds": COMMON_COMPOUNDS_NOTE,
  "carb-soaps": SOAPS_NOTE,
};

export const CARBON_SLUGS = Object.keys(CARBON_NOTES);

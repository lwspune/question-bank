import type { SubtopicNote } from "@/app/notes/_types";
import { NOMENCLATURE_NOTE } from "./cetbp-nomenclature-and-functional-groups";
import { ISOMERISM_NOTE } from "./cetbp-isomerism";
import { ELECTRONIC_EFFECTS_NOTE } from "./cetbp-electronic-effects";

export { MHTCET_BASIC_ORGANIC_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/mht-cet-chemistry/basic-principles-of-organic-chemistry/[subtopicSlug].
 * `cetbp-` prefix: concept-tag keys are global.
 */
export const MHTCET_BASIC_ORGANIC_NOTES: Record<string, SubtopicNote> = {
  "cetbp-nomenclature-and-functional-groups": NOMENCLATURE_NOTE,
  "cetbp-isomerism": ISOMERISM_NOTE,
  "cetbp-electronic-effects": ELECTRONIC_EFFECTS_NOTE,
};

export const MHTCET_BASIC_ORGANIC_SLUGS = Object.keys(MHTCET_BASIC_ORGANIC_NOTES);

import type { SubtopicNote } from "@/app/notes/_types";
import { TISSUES_NOTE } from "./tissues";
import { DIGESTION_NOTE } from "./digestion";
import { NUTRITION_NOTE } from "./nutrition";
import { CIRCULATION_NOTE } from "./circulation";
import { RESPIRATION_NOTE } from "./respiration";
import { EXCRETION_REPRODUCTION_NOTE } from "./excretion-reproduction";
import { NERVOUS_NOTE } from "./nervous";
import { ENDOCRINE_NOTE } from "./endocrine";
import { IMMUNE_NOTE } from "./immune";

export { HUMAN_PHYSIOLOGY_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/nda-biology/human-physiology/[subtopicSlug].
 * Keys are GLOBALLY-unique (`hp-` prefixed) because they double as the
 * question_concept_tags subtopic_slug; chapter.subtopicOrder owns render order.
 */
export const HUMAN_PHYSIOLOGY_NOTES: Record<string, SubtopicNote> = {
  "hp-tissues": TISSUES_NOTE,
  "hp-digestion": DIGESTION_NOTE,
  "hp-nutrition": NUTRITION_NOTE,
  "hp-circulation": CIRCULATION_NOTE,
  "hp-respiration": RESPIRATION_NOTE,
  "hp-excretion-reproduction": EXCRETION_REPRODUCTION_NOTE,
  "hp-nervous": NERVOUS_NOTE,
  "hp-endocrine": ENDOCRINE_NOTE,
  "hp-immune": IMMUNE_NOTE,
};

export const HUMAN_PHYSIOLOGY_SLUGS = Object.keys(HUMAN_PHYSIOLOGY_NOTES);

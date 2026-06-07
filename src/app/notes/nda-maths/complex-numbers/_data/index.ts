import type { SubtopicNote } from "@/app/notes/_types";
import { MODULUS_ARGUMENT_NOTE } from "./modulus-argument";
import { POWERS_ROOTS_NOTE } from "./powers-roots";
import { CUBE_ROOTS_UNITY_NOTE } from "./cube-roots-unity";

export { COMPLEX_NUMBERS_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/nda-maths/complex-numbers/[subtopicSlug].
 * Keys are globally-unique subtopic slugs (`cn-` prefixed) — also the
 * subtopic_slug in question_concept_tags. Order = chapter teaching order.
 */
export const COMPLEX_NUMBERS_NOTES: Record<string, SubtopicNote> = {
  "cn-modulus-argument": MODULUS_ARGUMENT_NOTE,
  "cn-powers-roots": POWERS_ROOTS_NOTE,
  "cn-cube-roots-unity": CUBE_ROOTS_UNITY_NOTE,
};

export const COMPLEX_NUMBERS_SLUGS = Object.keys(COMPLEX_NUMBERS_NOTES);

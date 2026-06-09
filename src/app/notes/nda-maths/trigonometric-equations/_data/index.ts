import type { SubtopicNote } from "@/app/notes/_types";
import { GENERAL_SOLUTIONS_NOTE } from "./general-solutions";
import { SPECIFIC_FORMS_NOTE } from "./specific-forms";
import { SIMULTANEOUS_SYSTEMS_NOTE } from "./simultaneous-systems";

export { TRIGONOMETRIC_EQUATIONS_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/nda-maths/trigonometric-equations/[subtopicSlug].
 * `te-` prefix keeps the subtopic slugs (and concept-tag keys) globally unique.
 */
export const TRIGONOMETRIC_EQUATIONS_NOTES: Record<string, SubtopicNote> = {
  "te-general-solutions": GENERAL_SOLUTIONS_NOTE,
  "te-specific-forms": SPECIFIC_FORMS_NOTE,
  "te-simultaneous-systems": SIMULTANEOUS_SYSTEMS_NOTE,
};

export const TRIGONOMETRIC_EQUATIONS_SLUGS = Object.keys(TRIGONOMETRIC_EQUATIONS_NOTES);

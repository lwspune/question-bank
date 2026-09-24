import type { SubtopicNote } from "@/app/notes/_types";
import { CONDUCTIVITY_NOTE } from "./cetec-conductivity";
import { MOLAR_CONDUCTIVITY_NOTE } from "./cetec-molar-conductivity";
import { ELECTROLYSIS_NOTE } from "./cetec-electrolysis";
import { GALVANIC_CELLS_NOTE } from "./cetec-galvanic-cells";
import { BATTERIES_NOTE } from "./cetec-batteries";

export { MHTCET_ELECTROCHEMISTRY_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/mht-cet-chemistry/electrochemistry/[subtopicSlug].
 * `cetec-` prefix: concept-tag keys are global.
 */
export const MHTCET_ELECTROCHEMISTRY_NOTES: Record<string, SubtopicNote> = {
  "cetec-conductivity": CONDUCTIVITY_NOTE,
  "cetec-molar-conductivity": MOLAR_CONDUCTIVITY_NOTE,
  "cetec-electrolysis": ELECTROLYSIS_NOTE,
  "cetec-galvanic-cells": GALVANIC_CELLS_NOTE,
  "cetec-batteries": BATTERIES_NOTE,
};

export const MHTCET_ELECTROCHEMISTRY_SLUGS = Object.keys(MHTCET_ELECTROCHEMISTRY_NOTES);

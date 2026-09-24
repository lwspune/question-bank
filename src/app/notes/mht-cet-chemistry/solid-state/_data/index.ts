import type { SubtopicNote } from "@/app/notes/_types";
import { TYPES_AND_CRYSTAL_SYSTEMS_NOTE } from "./cetss-types-and-crystal-systems";
import { UNIT_CELLS_NOTE } from "./cetss-unit-cells";
import { PACKING_AND_VOIDS_NOTE } from "./cetss-packing-and-voids";
import { DENSITY_NOTE } from "./cetss-density";
import { DEFECTS_AND_PROPERTIES_NOTE } from "./cetss-defects-and-properties";

export { MHTCET_SOLID_STATE_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/mht-cet-chemistry/solid-state/[subtopicSlug].
 * `cetss-` prefix: concept-tag keys are global.
 */
export const MHTCET_SOLID_STATE_NOTES: Record<string, SubtopicNote> = {
  "cetss-types-and-crystal-systems": TYPES_AND_CRYSTAL_SYSTEMS_NOTE,
  "cetss-unit-cells": UNIT_CELLS_NOTE,
  "cetss-packing-and-voids": PACKING_AND_VOIDS_NOTE,
  "cetss-density": DENSITY_NOTE,
  "cetss-defects-and-properties": DEFECTS_AND_PROPERTIES_NOTE,
};

export const MHTCET_SOLID_STATE_SLUGS = Object.keys(MHTCET_SOLID_STATE_NOTES);

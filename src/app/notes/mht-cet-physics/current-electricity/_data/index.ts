import type { SubtopicNote } from "@/app/notes/_types";
import { CELLS_NOTE } from "./cetp-ce-cells";
import { KIRCHHOFF_NOTE } from "./cetp-ce-kirchhoff";
import { BRIDGES_NOTE } from "./cetp-ce-bridges";
import { POTENTIOMETER_NOTE } from "./cetp-ce-potentiometer";
import { GALVANOMETER_NOTE } from "./cetp-ce-galvanometer";

export { MHTCET_CURRENT_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/mht-cet-physics/current-electricity/[subtopicSlug].
 * `cetp-ce-` prefix: concept-tag keys are global.
 */
export const MHTCET_CURRENT_NOTES: Record<string, SubtopicNote> = {
  "cetp-ce-cells": CELLS_NOTE,
  "cetp-ce-kirchhoff": KIRCHHOFF_NOTE,
  "cetp-ce-bridges": BRIDGES_NOTE,
  "cetp-ce-potentiometer": POTENTIOMETER_NOTE,
  "cetp-ce-galvanometer": GALVANOMETER_NOTE,
};

export const MHTCET_CURRENT_SLUGS = Object.keys(MHTCET_CURRENT_NOTES);

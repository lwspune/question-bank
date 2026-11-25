import type { SubtopicNote } from "@/app/notes/_types";
import { CB_PH_CE_OHM_NOTE } from "./ohm";
import { CB_PH_CE_DRIFT_NOTE } from "./drift";
import { CB_PH_CE_TEMPERATURE_NOTE } from "./temperature";
import { CB_PH_CE_POWER_NOTE } from "./power";
import { CB_PH_CE_COMBINATION_NOTE } from "./combination";
import { CB_PH_CE_CELLS_NOTE } from "./cells";
import { CB_PH_CE_KIRCHHOFF_NOTE } from "./kirchhoff";

export { CB_PH_CE_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/cbse-12-physics/current-electricity/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `cbp-ce-` here and `cbpce-` on concept slugs.
 *
 * 7 pages, one per NCERT section (the DB subtopics kept as they are, in book order).
 * Order matches `subtopicOrder`.
 */
export const CB_PH_CE_NOTES: Record<string, SubtopicNote> = {
  "cbp-ce-ohm": CB_PH_CE_OHM_NOTE,
  "cbp-ce-drift": CB_PH_CE_DRIFT_NOTE,
  "cbp-ce-temperature": CB_PH_CE_TEMPERATURE_NOTE,
  "cbp-ce-power": CB_PH_CE_POWER_NOTE,
  "cbp-ce-combination": CB_PH_CE_COMBINATION_NOTE,
  "cbp-ce-cells": CB_PH_CE_CELLS_NOTE,
  "cbp-ce-kirchhoff": CB_PH_CE_KIRCHHOFF_NOTE,
};

export const CB_PH_CE_SLUGS = Object.keys(CB_PH_CE_NOTES);

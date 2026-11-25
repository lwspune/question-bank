import type { SubtopicNote } from "@/app/notes/_types";
import { CB_CH_EC_CELLS_NOTE } from "./cells";
import { CB_CH_EC_GALVANIC_NOTE } from "./galvanic";
import { CB_CH_EC_NERNST_NOTE } from "./nernst";
import { CB_CH_EC_CONDUCTANCE_NOTE } from "./conductance";
import { CB_CH_EC_ELECTROLYSIS_NOTE } from "./electrolysis";
import { CB_CH_EC_BATTERIES_NOTE } from "./batteries";
import { CB_CH_EC_FUEL_NOTE } from "./fuel";
import { CB_CH_EC_CORROSION_NOTE } from "./corrosion";

export { CB_CH_EC_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/cbse-12-chemistry/electrochemistry/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `cbc-ec-` here and `cbcec-` on concept slugs.
 *
 * 8 pages, one per NCERT section (the DB subtopics kept as they are, in book order).
 * Order matches `subtopicOrder`.
 */
export const CB_CH_EC_NOTES: Record<string, SubtopicNote> = {
  "cbc-ec-cells": CB_CH_EC_CELLS_NOTE,
  "cbc-ec-galvanic": CB_CH_EC_GALVANIC_NOTE,
  "cbc-ec-nernst": CB_CH_EC_NERNST_NOTE,
  "cbc-ec-conductance": CB_CH_EC_CONDUCTANCE_NOTE,
  "cbc-ec-electrolysis": CB_CH_EC_ELECTROLYSIS_NOTE,
  "cbc-ec-batteries": CB_CH_EC_BATTERIES_NOTE,
  "cbc-ec-fuel": CB_CH_EC_FUEL_NOTE,
  "cbc-ec-corrosion": CB_CH_EC_CORROSION_NOTE,
};

export const CB_CH_EC_SLUGS = Object.keys(CB_CH_EC_NOTES);

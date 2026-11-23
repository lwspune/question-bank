import type { SubtopicNote } from "@/app/notes/_types";
import { HSC_CH_EC_CONDUCTANCE_NOTE } from "./conductance";
import { HSC_CH_EC_ELECTROLYSIS_NOTE } from "./electrolysis";
import { HSC_CH_EC_GALVANIC_NOTE } from "./galvanic";
import { HSC_CH_EC_POTENTIAL_NOTE } from "./potential";
import { HSC_CH_EC_THERMODYNAMICS_NOTE } from "./thermodynamics";
import { HSC_CH_EC_REFERENCE_NOTE } from "./reference";
import { HSC_CH_EC_CELLS_NOTE } from "./cells";
import { HSC_CH_EC_SERIES_NOTE } from "./series";

export { HSC_CH_EC_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/mh-hsc-12-chemistry/electrochemistry/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `hscc-ec-` here and `hsccec-` on concept slugs.
 *
 * 8 pages, one per textbook section (the DB subtopics kept as they are, in book order).
 * Order matches `subtopicOrder`.
 */
export const HSC_CH_EC_NOTES: Record<string, SubtopicNote> = {
  "hscc-ec-conductance": HSC_CH_EC_CONDUCTANCE_NOTE,
  "hscc-ec-electrolysis": HSC_CH_EC_ELECTROLYSIS_NOTE,
  "hscc-ec-galvanic": HSC_CH_EC_GALVANIC_NOTE,
  "hscc-ec-potential": HSC_CH_EC_POTENTIAL_NOTE,
  "hscc-ec-thermodynamics": HSC_CH_EC_THERMODYNAMICS_NOTE,
  "hscc-ec-reference": HSC_CH_EC_REFERENCE_NOTE,
  "hscc-ec-cells": HSC_CH_EC_CELLS_NOTE,
  "hscc-ec-series": HSC_CH_EC_SERIES_NOTE,
};

export const HSC_CH_EC_SLUGS = Object.keys(HSC_CH_EC_NOTES);

import type { SubtopicNote } from "@/app/notes/_types";
import { CELLS_ELEC_NOTE } from "./cells";
import { NERNST_ELEC_NOTE } from "./nernst";
import { ENERGETICS_ELEC_NOTE } from "./energetics";
import { CONDUCTANCE_ELEC_NOTE } from "./conductance";
import { KOHLRAUSCH_ELEC_NOTE } from "./kohlrausch";
import { ELECTROLYSIS_ELEC_NOTE } from "./electrolysis";
import { BATTERIES_ELEC_NOTE } from "./batteries";

export { JEE_CH_ELEC_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/jee-mains-chemistry/electrochemistry/[subtopicSlug].
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is
 * GLOBALLY unique across NOTES_CHAPTERS — hence `jch-elec-` here and `jcelec-` on
 * concept slugs.
 */
export const JEE_CH_ELEC_NOTES: Record<string, SubtopicNote> = {
  "jch-elec-cells": CELLS_ELEC_NOTE,
  "jch-elec-nernst": NERNST_ELEC_NOTE,
  "jch-elec-energetics": ENERGETICS_ELEC_NOTE,
  "jch-elec-conductance": CONDUCTANCE_ELEC_NOTE,
  "jch-elec-kohlrausch": KOHLRAUSCH_ELEC_NOTE,
  "jch-elec-electrolysis": ELECTROLYSIS_ELEC_NOTE,
  "jch-elec-batteries": BATTERIES_ELEC_NOTE,
};

export const JEE_CH_ELEC_SLUGS = Object.keys(JEE_CH_ELEC_NOTES);

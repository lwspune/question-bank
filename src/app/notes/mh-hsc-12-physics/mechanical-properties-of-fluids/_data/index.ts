import type { SubtopicNote } from "@/app/notes/_types";
import { HSC_PH_MF_PRESSURE_NOTE } from "./pressure";
import { HSC_PH_MF_TENSION_NOTE } from "./tension";
import { HSC_PH_MF_BUBBLES_NOTE } from "./bubbles";
import { HSC_PH_MF_CAPILLARITY_NOTE } from "./capillarity";
import { HSC_PH_MF_VISCOSITY_NOTE } from "./viscosity";
import { HSC_PH_MF_STOKES_NOTE } from "./stokes";
import { HSC_PH_MF_BERNOULLI_NOTE } from "./bernoulli";

export { HSC_PH_MF_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/mh-hsc-12-physics/mechanical-properties-of-fluids/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `hscp-mf-` here and `hscpmf-` on concept slugs.
 *
 * 7 pages, one per textbook section (the DB subtopics kept as they are, in book order).
 * Order matches `subtopicOrder`.
 */
export const HSC_PH_MF_NOTES: Record<string, SubtopicNote> = {
  "hscp-mf-pressure": HSC_PH_MF_PRESSURE_NOTE,
  "hscp-mf-tension": HSC_PH_MF_TENSION_NOTE,
  "hscp-mf-bubbles": HSC_PH_MF_BUBBLES_NOTE,
  "hscp-mf-capillarity": HSC_PH_MF_CAPILLARITY_NOTE,
  "hscp-mf-viscosity": HSC_PH_MF_VISCOSITY_NOTE,
  "hscp-mf-stokes": HSC_PH_MF_STOKES_NOTE,
  "hscp-mf-bernoulli": HSC_PH_MF_BERNOULLI_NOTE,
};

export const HSC_PH_MF_SLUGS = Object.keys(HSC_PH_MF_NOTES);

import type { SubtopicNote } from "@/app/notes/_types";
import { HSC_MA_PD_RANDOM_NOTE } from "./random";
import { HSC_MA_PD_PMF_NOTE } from "./pmf";
import { HSC_MA_PD_EXPECTATION_NOTE } from "./expectation";
import { HSC_MA_PD_PDF_NOTE } from "./pdf";
import { HSC_MA_PD_CDF_NOTE } from "./cdf";

export { HSC_MA_PD_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/mh-hsc-12-maths/probability-distributions/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `hscm-pd-` here and `hscmpd-` on concept slugs.
 *
 * 5 pages, one per textbook section (the DB subtopics kept as they are, in book order).
 * Order matches `subtopicOrder`.
 */
export const HSC_MA_PD_NOTES: Record<string, SubtopicNote> = {
  "hscm-pd-random": HSC_MA_PD_RANDOM_NOTE,
  "hscm-pd-pmf": HSC_MA_PD_PMF_NOTE,
  "hscm-pd-expectation": HSC_MA_PD_EXPECTATION_NOTE,
  "hscm-pd-pdf": HSC_MA_PD_PDF_NOTE,
  "hscm-pd-cdf": HSC_MA_PD_CDF_NOTE,
};

export const HSC_MA_PD_SLUGS = Object.keys(HSC_MA_PD_NOTES);

import type { SubtopicNote } from "@/app/notes/_types";
import { HSC_MA_AD_TANGENTS_NOTE } from "./tangents";
import { HSC_MA_AD_RATE_NOTE } from "./rate";
import { HSC_MA_AD_MOTION_NOTE } from "./motion";
import { HSC_MA_AD_APPROXIMATIONS_NOTE } from "./approximations";
import { HSC_MA_AD_ROLLE_NOTE } from "./rolle";
import { HSC_MA_AD_LAGRANGE_NOTE } from "./lagrange";
import { HSC_MA_AD_MONOTONIC_NOTE } from "./monotonic";
import { HSC_MA_AD_EXTREMA_NOTE } from "./extrema";

export { HSC_MA_AD_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/mh-hsc-12-maths/application-of-derivatives/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `hscm-ad-` here and `hscmad-` on concept slugs.
 *
 * 8 pages, one per textbook section (the DB subtopics kept as they are, in book order).
 * Order matches `subtopicOrder`.
 */
export const HSC_MA_AD_NOTES: Record<string, SubtopicNote> = {
  "hscm-ad-tangents": HSC_MA_AD_TANGENTS_NOTE,
  "hscm-ad-rate": HSC_MA_AD_RATE_NOTE,
  "hscm-ad-motion": HSC_MA_AD_MOTION_NOTE,
  "hscm-ad-approximations": HSC_MA_AD_APPROXIMATIONS_NOTE,
  "hscm-ad-rolle": HSC_MA_AD_ROLLE_NOTE,
  "hscm-ad-lagrange": HSC_MA_AD_LAGRANGE_NOTE,
  "hscm-ad-monotonic": HSC_MA_AD_MONOTONIC_NOTE,
  "hscm-ad-extrema": HSC_MA_AD_EXTREMA_NOTE,
};

export const HSC_MA_AD_SLUGS = Object.keys(HSC_MA_AD_NOTES);

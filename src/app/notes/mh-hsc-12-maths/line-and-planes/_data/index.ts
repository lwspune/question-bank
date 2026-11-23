import type { SubtopicNote } from "@/app/notes/_types";
import { HSC_MA_LP_LINE_NOTE } from "./line";
import { HSC_MA_LP_POINTLINE_NOTE } from "./pointline";
import { HSC_MA_LP_SKEW_NOTE } from "./skew";
import { HSC_MA_LP_PLANE_NOTE } from "./plane";
import { HSC_MA_LP_ANGLE_NOTE } from "./angle";
import { HSC_MA_LP_COPLANAR_NOTE } from "./coplanar";
import { HSC_MA_LP_POINTPLANE_NOTE } from "./pointplane";

export { HSC_MA_LP_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/mh-hsc-12-maths/line-and-planes/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `hscm-lp-` here and `hscmlp-` on concept slugs.
 *
 * 7 pages, one per textbook section (the DB subtopics kept as they are, in book order).
 * Order matches `subtopicOrder`.
 */
export const HSC_MA_LP_NOTES: Record<string, SubtopicNote> = {
  "hscm-lp-line": HSC_MA_LP_LINE_NOTE,
  "hscm-lp-pointline": HSC_MA_LP_POINTLINE_NOTE,
  "hscm-lp-skew": HSC_MA_LP_SKEW_NOTE,
  "hscm-lp-plane": HSC_MA_LP_PLANE_NOTE,
  "hscm-lp-angle": HSC_MA_LP_ANGLE_NOTE,
  "hscm-lp-coplanar": HSC_MA_LP_COPLANAR_NOTE,
  "hscm-lp-pointplane": HSC_MA_LP_POINTPLANE_NOTE,
};

export const HSC_MA_LP_SLUGS = Object.keys(HSC_MA_LP_NOTES);

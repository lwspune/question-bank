import type { SubtopicNote } from "@/app/notes/_types";
import { HSC_CH_GN_SUSTAINABLE_NOTE } from "./sustainable";
import { HSC_CH_GN_PRINCIPLES_NOTE } from "./principles";
import { HSC_CH_GN_ROLE_NOTE } from "./role";
import { HSC_CH_GN_NANOSCALE_NOTE } from "./nanoscale";
import { HSC_CH_GN_SYNTHESIS_NOTE } from "./synthesis";
import { HSC_CH_GN_APPLICATIONS_NOTE } from "./applications";

export { HSC_CH_GN_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/mh-hsc-12-chemistry/green-chemistry-and-nanochemistry/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `hscc-gn-` here and `hsccgn-` on concept slugs.
 *
 * 6 pages, one per textbook section (the DB subtopics kept as they are, in book order).
 * Order matches `subtopicOrder`.
 */
export const HSC_CH_GN_NOTES: Record<string, SubtopicNote> = {
  "hscc-gn-sustainable": HSC_CH_GN_SUSTAINABLE_NOTE,
  "hscc-gn-principles": HSC_CH_GN_PRINCIPLES_NOTE,
  "hscc-gn-role": HSC_CH_GN_ROLE_NOTE,
  "hscc-gn-nanoscale": HSC_CH_GN_NANOSCALE_NOTE,
  "hscc-gn-synthesis": HSC_CH_GN_SYNTHESIS_NOTE,
  "hscc-gn-applications": HSC_CH_GN_APPLICATIONS_NOTE,
};

export const HSC_CH_GN_SLUGS = Object.keys(HSC_CH_GN_NOTES);

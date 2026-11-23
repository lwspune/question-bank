import type { SubtopicNote } from "@/app/notes/_types";
import { HSC_PH_DN_PHOTOELECTRIC_NOTE } from "./photoelectric";
import { HSC_PH_DN_EINSTEIN_NOTE } from "./einstein";
import { HSC_PH_DN_RADIATION_NOTE } from "./radiation";
import { HSC_PH_DN_PHOTOCELL_NOTE } from "./photocell";
import { HSC_PH_DN_DEBROGLIE_NOTE } from "./debroglie";
import { HSC_PH_DN_DAVISSON_NOTE } from "./davisson";

export { HSC_PH_DN_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/mh-hsc-12-physics/dual-nature-of-radiation-and-matter/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `hscp-dn-` here and `hscpdn-` on concept slugs.
 *
 * 6 pages, one per textbook section (the DB subtopics kept as they are, in book order).
 * Order matches `subtopicOrder`.
 */
export const HSC_PH_DN_NOTES: Record<string, SubtopicNote> = {
  "hscp-dn-photoelectric": HSC_PH_DN_PHOTOELECTRIC_NOTE,
  "hscp-dn-einstein": HSC_PH_DN_EINSTEIN_NOTE,
  "hscp-dn-radiation": HSC_PH_DN_RADIATION_NOTE,
  "hscp-dn-photocell": HSC_PH_DN_PHOTOCELL_NOTE,
  "hscp-dn-debroglie": HSC_PH_DN_DEBROGLIE_NOTE,
  "hscp-dn-davisson": HSC_PH_DN_DAVISSON_NOTE,
};

export const HSC_PH_DN_SLUGS = Object.keys(HSC_PH_DN_NOTES);

import type { SubtopicNote } from "@/app/notes/_types";
import { CB_PH_DN_EMISSION_NOTE } from "./emission";
import { CB_PH_DN_PHOTOELECTRIC_NOTE } from "./photoelectric";
import { CB_PH_DN_EINSTEIN_NOTE } from "./einstein";
import { CB_PH_DN_MATTER_NOTE } from "./matter";

export { CB_PH_DN_CHAPTER } from "./chapter";

/**
 * Slug → SubtopicNote map for /notes/cbse-12-physics/dual-nature-of-radiation-and-matter/[subtopicSlug].
 *
 * Keys are the URL slug AND the subtopic_slug in question_concept_tags, which is GLOBALLY unique
 * across NOTES_CHAPTERS — hence `cbp-dn-` here and `cbpdn-` on concept slugs.
 *
 * 4 pages, one per NCERT section (the DB subtopics kept as they are, in book order).
 * Order matches `subtopicOrder`.
 */
export const CB_PH_DN_NOTES: Record<string, SubtopicNote> = {
  "cbp-dn-emission": CB_PH_DN_EMISSION_NOTE,
  "cbp-dn-photoelectric": CB_PH_DN_PHOTOELECTRIC_NOTE,
  "cbp-dn-einstein": CB_PH_DN_EINSTEIN_NOTE,
  "cbp-dn-matter": CB_PH_DN_MATTER_NOTE,
};

export const CB_PH_DN_SLUGS = Object.keys(CB_PH_DN_NOTES);
